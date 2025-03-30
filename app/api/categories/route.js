/**
 * @swagger
 * /api/categories:
 *   get:
 *     description: Get a list of blog categories
 *     parameters:
 *       - in: query
 *         name: includePostCount
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include post count for each category
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Maximum number of categories to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of categories to skip
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 *       500:
 *         description: Server error
 *   post:
 *     description: Create a new category (admin only)
 *     security:
 *       - bearerAuth: []
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
 *                 description: Category name
 *               description:
 *                 type: string
 *                 description: Category description
 *               parentId:
 *                 type: string
 *                 description: ID of the parent category (for nested categories)
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Category already exists
 *       500:
 *         description: Server error
 */

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const includePostCount = searchParams.get('includePostCount') === 'true'
    const limit = parseInt(searchParams.get('limit') || '20', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    
    // Mock categories data
    const mockCategories = [
      {
        id: 'cat_1',
        name: 'Tutorials',
        slug: 'tutorials',
        description: 'Step-by-step guides to help you learn new technologies',
        parentId: null,
        createdAt: '2023-06-01T10:00:00Z',
        updatedAt: null
      },
      {
        id: 'cat_2',
        name: 'Guides',
        slug: 'guides',
        description: 'Comprehensive resources for mastering specific topics',
        parentId: null,
        createdAt: '2023-06-02T11:30:00Z',
        updatedAt: null
      },
      {
        id: 'cat_3',
        name: 'Best Practices',
        slug: 'best-practices',
        description: 'Recommended approaches and industry standards',
        parentId: null,
        createdAt: '2023-06-03T09:15:00Z',
        updatedAt: null
      },
      {
        id: 'cat_4',
        name: 'React',
        slug: 'react',
        description: 'All things related to React development',
        parentId: 'cat_1',
        createdAt: '2023-06-04T14:20:00Z',
        updatedAt: null
      },
      {
        id: 'cat_5',
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Working with the Next.js framework',
        parentId: 'cat_1',
        createdAt: '2023-06-05T15:45:00Z',
        updatedAt: null
      },
      {
        id: 'cat_6',
        name: 'CSS',
        slug: 'css',
        description: 'Tips and tricks for CSS styling',
        parentId: 'cat_3',
        createdAt: '2023-06-06T10:30:00Z',
        updatedAt: null
      }
    ]
    
    // Mock post data (for counting posts in categories)
    const mockPosts = [
      { id: 'post_1', categoryId: 'cat_5' }, // Next.js
      { id: 'post_2', categoryId: 'cat_4' }, // React
      { id: 'post_3', categoryId: 'cat_5' }, // Next.js
      { id: 'post_4', categoryId: 'cat_6' }, // CSS
      { id: 'post_5', categoryId: 'cat_3' }, // Best Practices
      { id: 'post_6', categoryId: 'cat_4' }, // React
      { id: 'post_7', categoryId: 'cat_4' }, // React
      { id: 'post_8', categoryId: 'cat_4' }  // React
    ]
    
    // Apply pagination
    const paginatedCategories = mockCategories.slice(offset, offset + limit)
    
    // Add post counts if requested
    let responseCategories = paginatedCategories
    
    if (includePostCount) {
      responseCategories = paginatedCategories.map(category => {
        const directPostCount = mockPosts.filter(post => post.categoryId === category.id).length
        
        // Calculate posts in child categories too
        const childCategoryIds = mockCategories
          .filter(cat => cat.parentId === category.id)
          .map(cat => cat.id)
        
        const childPostCount = mockPosts.filter(post => childCategoryIds.includes(post.categoryId)).length
        
        return {
          ...category,
          postCount: {
            direct: directPostCount,
            total: directPostCount + childPostCount
          }
        }
      })
    }
    
    // Structure categories in a hierarchical format
    const hierarchicalCategories = organizeHierarchy(responseCategories)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Categories retrieved successfully',
        data: {
          categories: responseCategories,
          hierarchical: hierarchicalCategories,
          pagination: {
            total: mockCategories.length,
            limit,
            offset,
            hasMore: offset + limit < mockCategories.length
          }
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
        message: 'Failed to retrieve categories',
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

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Check authentication (in a real app, verify bearer token)
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
    
    // In a real app, verify the token and check admin privileges
    const isAdmin = true // Mock value for this example
    
    if (!isAdmin) {
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
    
    // Validate required fields
    if (!data.name || data.name.trim() === '') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category name is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Generate slug from name
    const slug = data.name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    
    // Mock existing categories (in a real app, fetch from database)
    const mockCategories = [
      {
        id: 'cat_1',
        name: 'Tutorials',
        slug: 'tutorials',
        description: 'Step-by-step guides to help you learn new technologies',
        parentId: null
      },
      {
        id: 'cat_2',
        name: 'Guides',
        slug: 'guides',
        description: 'Comprehensive resources for mastering specific topics',
        parentId: null
      },
      {
        id: 'cat_3',
        name: 'Best Practices',
        slug: 'best-practices',
        description: 'Recommended approaches and industry standards',
        parentId: null
      }
    ]
    
    // Check if category with same name or slug already exists
    const categoryExists = mockCategories.some(
      cat => cat.name.toLowerCase() === data.name.toLowerCase() || cat.slug === slug
    )
    
    if (categoryExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'A category with this name already exists'
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Check if parent category exists (if provided)
    if (data.parentId) {
      const parentExists = mockCategories.some(cat => cat.id === data.parentId)
      
      if (!parentExists) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Parent category not found'
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
    
    // Create the new category
    const newCategory = {
      id: 'cat_' + Math.random().toString(36).substring(2, 6),
      name: data.name.trim(),
      slug,
      description: data.description ? data.description.trim() : null,
      parentId: data.parentId || null,
      createdAt: new Date().toISOString(),
      updatedAt: null
    }
    
    // In a real app, save the category to the database
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category created successfully',
        data: {
          category: newCategory
        }
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to create category',
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
 * Helper function to organize categories in a hierarchical structure
 */
function organizeHierarchy(categories) {
  const categoryMap = {}
  
  // First pass: create a map of categories by ID
  categories.forEach(category => {
    categoryMap[category.id] = {
      ...category,
      children: []
    }
  })
  
  // Second pass: build the hierarchy
  const rootCategories = []
  
  categories.forEach(category => {
    if (category.parentId && categoryMap[category.parentId]) {
      // This is a child category, add to parent's children
      categoryMap[category.parentId].children.push(categoryMap[category.id])
    } else {
      // This is a root category
      rootCategories.push(categoryMap[category.id])
    }
  })
  
  return rootCategories
} 