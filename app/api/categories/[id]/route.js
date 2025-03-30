/**
 * @swagger
 * /api/categories/{id}:
 *   get:
 *     description: Get a specific category by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *       - in: query
 *         name: includePostCount
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include post count for the category
 *       - in: query
 *         name: includePosts
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include posts belonging to the category
 *       - in: query
 *         name: includeChildren
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include child categories
 *     responses:
 *       200:
 *         description: Category retrieved successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 *   put:
 *     description: Update a category (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New category name
 *               description:
 *                 type: string
 *                 description: New category description
 *               parentId:
 *                 type: string
 *                 description: ID of the parent category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       409:
 *         description: Category with this name already exists
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a category (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Cannot delete category with child categories or posts
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

export async function GET(request, { params }) {
  try {
    const categoryId = params.id
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const includePostCount = searchParams.get('includePostCount') === 'true'
    const includePosts = searchParams.get('includePosts') === 'true'
    const includeChildren = searchParams.get('includeChildren') === 'true'
    
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
    
    // Find the requested category
    const category = mockCategories.find(cat => cat.id === categoryId)
    
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
    
    // Create a copy of the category to modify with additional information
    let responseCategory = { ...category }
    
    // Mock post data
    const mockPosts = [
      { 
        id: 'post_1', 
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn the basics of Next.js and how to set up your first project',
        publishedAt: '2023-07-15T09:30:00Z',
        categoryId: 'cat_5' 
      },
      { 
        id: 'post_2', 
        title: 'React Hooks Explained',
        slug: 'react-hooks-explained',
        excerpt: 'A comprehensive guide to React hooks and how to use them effectively',
        publishedAt: '2023-07-10T14:20:00Z',
        categoryId: 'cat_4' 
      },
      { 
        id: 'post_3', 
        title: 'Building Server Components in Next.js',
        slug: 'building-server-components-in-nextjs',
        excerpt: 'Learn how to use the new server components feature in Next.js',
        publishedAt: '2023-07-22T11:45:00Z',
        categoryId: 'cat_5' 
      },
      { 
        id: 'post_4', 
        title: 'CSS Grid Layouts',
        slug: 'css-grid-layouts',
        excerpt: 'How to create modern layouts using CSS Grid',
        publishedAt: '2023-07-05T10:15:00Z',
        categoryId: 'cat_6' 
      }
    ]
    
    // Add post count if requested
    if (includePostCount) {
      const directPostCount = mockPosts.filter(post => post.categoryId === categoryId).length
      
      // Calculate posts in child categories too
      const childCategoryIds = mockCategories
        .filter(cat => cat.parentId === categoryId)
        .map(cat => cat.id)
      
      const childPostCount = mockPosts.filter(post => childCategoryIds.includes(post.categoryId)).length
      
      responseCategory.postCount = {
        direct: directPostCount,
        total: directPostCount + childPostCount
      }
    }
    
    // Add posts if requested
    if (includePosts) {
      responseCategory.posts = mockPosts
        .filter(post => post.categoryId === categoryId)
        .map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt
        }))
    }
    
    // Add child categories if requested
    if (includeChildren) {
      responseCategory.children = mockCategories
        .filter(cat => cat.parentId === categoryId)
        .map(childCat => {
          const result = { ...childCat }
          
          // Optionally add post count for children too
          if (includePostCount) {
            result.postCount = {
              direct: mockPosts.filter(post => post.categoryId === childCat.id).length
            }
          }
          
          return result
        })
    }
    
    // Find parent category if applicable
    if (category.parentId) {
      const parentCategory = mockCategories.find(cat => cat.id === category.parentId)
      if (parentCategory) {
        responseCategory.parent = {
          id: parentCategory.id,
          name: parentCategory.name,
          slug: parentCategory.slug
        }
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category retrieved successfully',
        data: {
          category: responseCategory
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
        message: 'Failed to retrieve category',
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

export async function PUT(request, { params }) {
  try {
    const categoryId = params.id
    
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
    
    // Parse the request body
    const data = await request.json()
    
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
    
    // Find the category to update
    const categoryIndex = mockCategories.findIndex(cat => cat.id === categoryId)
    
    if (categoryIndex === -1) {
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
    
    const category = mockCategories[categoryIndex]
    
    // Check for naming conflicts if name is being updated
    if (data.name && data.name !== category.name) {
      const nameExists = mockCategories.some(
        cat => cat.id !== categoryId && cat.name.toLowerCase() === data.name.toLowerCase()
      )
      
      if (nameExists) {
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
    }
    
    // Check for circular references if parentId is being updated
    if (data.parentId && data.parentId !== category.parentId) {
      // Cannot set itself as parent
      if (data.parentId === categoryId) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'A category cannot be its own parent'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
      
      // Cannot set a child as parent (would create circular reference)
      const childCategories = getDescendantCategoryIds(mockCategories, categoryId)
      if (childCategories.includes(data.parentId)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Cannot set a child category as parent (circular reference)'
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
      
      // Ensure the parent category exists
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
    
    // Update the category
    const updatedCategory = {
      ...category,
      name: data.name !== undefined ? data.name.trim() : category.name,
      description: data.description !== undefined ? data.description.trim() : category.description,
      parentId: data.parentId !== undefined ? data.parentId : category.parentId,
      updatedAt: new Date().toISOString()
    }
    
    // Update the slug if name has changed
    if (data.name && data.name !== category.name) {
      updatedCategory.slug = data.name.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    }
    
    // In a real app, update the category in the database
    // For this example, we just return the updated category
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category updated successfully',
        data: {
          category: updatedCategory
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

export async function DELETE(request, { params }) {
  try {
    const categoryId = params.id
    
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
    
    // Mock categories data
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
      },
      {
        id: 'cat_4',
        name: 'React',
        slug: 'react',
        description: 'All things related to React development',
        parentId: 'cat_1'
      },
      {
        id: 'cat_5',
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Working with the Next.js framework',
        parentId: 'cat_1'
      },
      {
        id: 'cat_6',
        name: 'CSS',
        slug: 'css',
        description: 'Tips and tricks for CSS styling',
        parentId: 'cat_3'
      }
    ]
    
    // Find the category to delete
    const categoryIndex = mockCategories.findIndex(cat => cat.id === categoryId)
    
    if (categoryIndex === -1) {
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
    
    // Check if the category has child categories
    const hasChildren = mockCategories.some(cat => cat.parentId === categoryId)
    
    if (hasChildren) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Cannot delete category with child categories. Please move or delete child categories first.'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock post data
    const mockPosts = [
      { id: 'post_1', categoryId: 'cat_5' }, // Next.js
      { id: 'post_2', categoryId: 'cat_4' }, // React
      { id: 'post_3', categoryId: 'cat_5' }, // Next.js
      { id: 'post_4', categoryId: 'cat_6' }, // CSS
      { id: 'post_5', categoryId: 'cat_3' }, // Best Practices
      { id: 'post_6', categoryId: 'cat_4' }  // React
    ]
    
    // Check if the category has posts
    const hasPosts = mockPosts.some(post => post.categoryId === categoryId)
    
    if (hasPosts) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Cannot delete category with associated posts. Please reassign or delete posts first.'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real app, delete the category from the database
    // For this example, we just return success
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Category deleted successfully'
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

/**
 * Helper function to get all descendant category IDs (children, grandchildren, etc.)
 */
function getDescendantCategoryIds(categories, parentId) {
  const directChildren = categories
    .filter(cat => cat.parentId === parentId)
    .map(cat => cat.id)
  
  const grandchildren = directChildren.flatMap(childId => 
    getDescendantCategoryIds(categories, childId)
  )
  
  return [...directChildren, ...grandchildren]
} 