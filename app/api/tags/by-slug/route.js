/**
 * @swagger
 * /api/tags/{slug}:
 *   get:
 *     description: Returns a specific tag by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the tag
 *     responses:
 *       200:
 *         description: A single tag
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    
    // In a real implementation, fetch the tag from a database
    // For now, we'll use mock data
    const mockTags = [
      { id: '1', name: 'JavaScript', slug: 'javascript', count: 15 },
      { id: '2', name: 'React', slug: 'react', count: 12 },
      { id: '3', name: 'Next.js', slug: 'nextjs', count: 8 },
      { id: '4', name: 'CSS', slug: 'css', count: 7 },
      { id: '5', name: 'HTML', slug: 'html', count: 5 },
      { id: '6', name: 'TypeScript', slug: 'typescript', count: 5 }
    ]
    
    const tag = mockTags.find(tag => tag.slug === slug)
    
    if (!tag) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tag not found'
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
        message: 'Tag fetched successfully',
        data: tag
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
        message: 'Failed to fetch tag',
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
 * /api/tags/{slug}:
 *   put:
 *     description: Updates a specific tag (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the tag to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The new name of the tag
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Tag not found
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
    
    // Validate required fields
    if (!data.name) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tag name is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation:
    // 1. Check if the tag exists
    // 2. Check if the new name is already taken by another tag
    // 3. Update the tag in the database
    
    // Mock list of existing tags
    const mockTags = [
      { id: '1', name: 'JavaScript', slug: 'javascript', count: 15 },
      { id: '2', name: 'React', slug: 'react', count: 12 },
      { id: '3', name: 'Next.js', slug: 'nextjs', count: 8 },
      { id: '4', name: 'CSS', slug: 'css', count: 7 },
      { id: '5', name: 'HTML', slug: 'html', count: 5 },
      { id: '6', name: 'TypeScript', slug: 'typescript', count: 5 }
    ]
    
    // Check if the tag exists
    const existingTag = mockTags.find(tag => tag.slug === slug)
    if (!existingTag) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tag not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Check if the new name is already taken by another tag
    const isNameTaken = mockTags.some(tag => 
      tag.slug !== slug && 
      tag.name.toLowerCase() === data.name.toLowerCase()
    )
    
    if (isNameTaken) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'A tag with this name already exists'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Create a new slug from the name
    const newSlug = data.name.toLowerCase().replace(/\s+/g, '-')
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag updated successfully',
        data: {
          id: existingTag.id,
          name: data.name,
          originalSlug: slug,
          slug: newSlug,
          count: existingTag.count,
          updatedAt: new Date().toISOString()
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
        message: 'Failed to update tag',
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
 * /api/tags/{slug}:
 *   delete:
 *     description: Deletes a specific tag (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the tag to delete
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Tag not found
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
    
    // In a real implementation:
    // 1. Check if the tag exists
    // 2. Check if the tag is associated with any posts and handle accordingly
    // 3. Delete the tag from the database
    
    // Mock list of existing tags
    const mockTags = [
      { id: '1', name: 'JavaScript', slug: 'javascript', count: 15 },
      { id: '2', name: 'React', slug: 'react', count: 12 },
      { id: '3', name: 'Next.js', slug: 'nextjs', count: 8 },
      { id: '4', name: 'CSS', slug: 'css', count: 7 },
      { id: '5', name: 'HTML', slug: 'html', count: 5 },
      { id: '6', name: 'TypeScript', slug: 'typescript', count: 5 }
    ]
    
    // Check if the tag exists
    const existingTag = mockTags.find(tag => tag.slug === slug)
    if (!existingTag) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tag not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag deleted successfully',
        data: {
          id: existingTag.id,
          name: existingTag.name,
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
        message: 'Failed to delete tag',
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