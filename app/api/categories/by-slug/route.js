/**
 * @swagger
 * /api/categories/{slug}:
 *   get:
 *     description: Returns a specific category by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the category
 *     responses:
 *       200:
 *         description: A single category
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    
    // In a real implementation, fetch the category from a database
    // For now, we'll use mock data
    const mockCategories = [
      { id: '1', name: 'Web Development', slug: 'web-development', count: 15, description: 'Articles about web development technologies and trends' },
      { id: '2', name: 'Mobile Development', slug: 'mobile-development', count: 8, description: 'Resources for mobile app development' },
      { id: '3', name: 'DevOps', slug: 'devops', count: 6, description: 'Topics on DevOps practices and tools' },
      { id: '4', name: 'Cloud Computing', slug: 'cloud-computing', count: 10, description: 'Cloud platforms and services' },
      { id: '5', name: 'Machine Learning', slug: 'machine-learning', count: 12, description: 'Articles on machine learning and AI' },
      { id: '6', name: 'Cybersecurity', slug: 'cybersecurity', count: 9, description: 'Security best practices and news' }
    ]
    
    const category = mockCategories.find(category => category.slug === slug)
    
    if (!category) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category fetched successfully',
        data: category
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to fetch category',
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

/**
 * @swagger
 * /api/categories/{slug}:
 *   put:
 *     description: Updates a specific category (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the category
 *               description:
 *                 type: string
 *                 description: A brief description of the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
  try {
    const { slug } = params
    
    // Simulating authentication check
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Authentication required'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    const token = authHeader.split(' ')[1]
    
    // Check if the user is an admin
    if (token !== 'mock-admin-token') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Admin privileges required'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Parse the request body
    const data = await request.json()
    
    // Mock list of existing categories
    const mockCategories = [
      { id: '1', name: 'Web Development', slug: 'web-development', count: 15, description: 'Articles about web development technologies and trends' },
      { id: '2', name: 'Mobile Development', slug: 'mobile-development', count: 8, description: 'Resources for mobile app development' },
      { id: '3', name: 'DevOps', slug: 'devops', count: 6, description: 'Topics on DevOps practices and tools' },
      { id: '4', name: 'Cloud Computing', slug: 'cloud-computing', count: 10, description: 'Cloud platforms and services' },
      { id: '5', name: 'Machine Learning', slug: 'machine-learning', count: 12, description: 'Articles on machine learning and AI' },
      { id: '6', name: 'Cybersecurity', slug: 'cybersecurity', count: 9, description: 'Security best practices and news' }
    ]
    
    // Check if the category exists
    const existingCategory = mockCategories.find(category => category.slug === slug)
    if (!existingCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // If name is provided, check if it's already taken by another category
    if (data.name) {
      const isNameTaken = mockCategories.some(category => 
        category.slug !== slug && 
        category.name.toLowerCase() === data.name.toLowerCase()
      )
      
      if (isNameTaken) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'A category with this name already exists'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
    }
    
    // Create a new slug from the name if the name changed
    let newSlug = slug
    if (data.name && data.name.toLowerCase() !== existingCategory.name.toLowerCase()) {
      newSlug = data.name.toLowerCase().replace(/\s+/g, '-')
    }
    
    // Prepare the updated category
    const updatedCategory = {
      ...existingCategory,
      name: data.name || existingCategory.name,
      slug: newSlug,
      description: data.description !== undefined ? data.description : existingCategory.description,
      updatedAt: new Date().toISOString()
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category updated successfully',
        data: updatedCategory
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to update category',
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}

/**
 * @swagger
 * /api/categories/{slug}:
 *   delete:
 *     description: Deletes a specific category (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the category to delete
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
  try {
    const { slug } = params
    
    // Simulating authentication check
    const authHeader = request.headers.get('Authorization')
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Authentication required'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    const token = authHeader.split(' ')[1]
    
    // Check if the user is an admin
    if (token !== 'mock-admin-token') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Admin privileges required'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock list of existing categories
    const mockCategories = [
      { id: '1', name: 'Web Development', slug: 'web-development', count: 15, description: 'Articles about web development technologies and trends' },
      { id: '2', name: 'Mobile Development', slug: 'mobile-development', count: 8, description: 'Resources for mobile app development' },
      { id: '3', name: 'DevOps', slug: 'devops', count: 6, description: 'Topics on DevOps practices and tools' },
      { id: '4', name: 'Cloud Computing', slug: 'cloud-computing', count: 10, description: 'Cloud platforms and services' },
      { id: '5', name: 'Machine Learning', slug: 'machine-learning', count: 12, description: 'Articles on machine learning and AI' },
      { id: '6', name: 'Cybersecurity', slug: 'cybersecurity', count: 9, description: 'Security best practices and news' }
    ]
    
    // Check if the category exists
    const existingCategory = mockCategories.find(category => category.slug === slug)
    if (!existingCategory) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation, check if there are posts with this category and handle them appropriately
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category deleted successfully',
        data: {
          id: existingCategory.id,
          name: existingCategory.name,
          slug,
          deletedAt: new Date().toISOString()
        }
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to delete category',
        error: error.message
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
} 