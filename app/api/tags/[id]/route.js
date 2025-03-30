/**
 * @swagger
 * /api/tags/{id}:
 *   get:
 *     description: Get a specific tag by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID
 *       - in: query
 *         name: includePosts
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Whether to include posts with this tag
 *     responses:
 *       200:
 *         description: Tag retrieved successfully
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 *   put:
 *     description: Update a tag (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New tag name
 *               description:
 *                 type: string
 *                 description: New tag description
 *     responses:
 *       200:
 *         description: Tag updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tag not found
 *       409:
 *         description: Tag with this name already exists
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a tag (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Tag ID
 *     responses:
 *       200:
 *         description: Tag deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Tag not found
 *       500:
 *         description: Server error
 */

export async function GET(request, { params }) {
  try {
    const tagId = params.id
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const includePosts = searchParams.get('includePosts') === 'true'
    
    // Mock tags data
    const mockTags = [
      {
        id: 'tag_1',
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Articles related to JavaScript programming language',
        postCount: 12,
        createdAt: '2023-06-01T10:00:00Z',
        updatedAt: null
      },
      {
        id: 'tag_2',
        name: 'React',
        slug: 'react',
        description: 'Content about React.js library',
        postCount: 8,
        createdAt: '2023-06-02T11:30:00Z',
        updatedAt: null
      },
      {
        id: 'tag_3',
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Tutorials and guides for Next.js framework',
        postCount: 6,
        createdAt: '2023-06-03T09:15:00Z',
        updatedAt: null
      },
      {
        id: 'tag_4',
        name: 'CSS',
        slug: 'css',
        description: 'Topics covering Cascading Style Sheets',
        postCount: 10,
        createdAt: '2023-06-04T14:20:00Z',
        updatedAt: null
      }
    ]
    
    // Find the requested tag
    const tag = mockTags.find(tag => tag.id === tagId)
    
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
    
    // Create a response object with the tag data
    const responseData = { ...tag }
    
    // Include posts data if requested
    if (includePosts) {
      // Mock post data for this tag
      const mockPosts = [
        { 
          id: 'post_1', 
          title: 'Modern JavaScript Features',
          slug: 'modern-javascript-features',
          excerpt: 'Explore the latest JavaScript features and how to use them in your projects',
          publishedAt: '2023-07-15T09:30:00Z',
          tagIds: ['tag_1', 'tag_6'] // JavaScript, TypeScript
        },
        { 
          id: 'post_2', 
          title: 'React Hooks in Depth',
          slug: 'react-hooks-in-depth',
          excerpt: 'A comprehensive guide to React hooks and how to use them effectively',
          publishedAt: '2023-07-10T14:20:00Z',
          tagIds: ['tag_2', 'tag_1'] // React, JavaScript
        },
        { 
          id: 'post_3', 
          title: 'Server Components in Next.js',
          slug: 'server-components-in-nextjs',
          excerpt: 'Learn how to use the new server components feature in Next.js',
          publishedAt: '2023-07-22T11:45:00Z',
          tagIds: ['tag_3', 'tag_2'] // Next.js, React
        },
        { 
          id: 'post_4', 
          title: 'Advanced CSS Grid Layouts',
          slug: 'advanced-css-grid-layouts',
          excerpt: 'How to create complex layouts using CSS Grid',
          publishedAt: '2023-07-05T10:15:00Z',
          tagIds: ['tag_4'] // CSS
        },
        { 
          id: 'post_5', 
          title: 'JavaScript Performance Optimization',
          slug: 'javascript-performance-optimization',
          excerpt: 'Techniques to improve the performance of your JavaScript code',
          publishedAt: '2023-07-18T13:25:00Z',
          tagIds: ['tag_1', 'tag_5'] // JavaScript, Performance
        },
      ]
      
      // Filter posts for the requested tag
      responseData.posts = mockPosts
        .filter(post => post.tagIds.includes(tagId))
        .map(post => ({
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt
        }))
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag retrieved successfully',
        data: {
          tag: responseData
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
        message: 'Failed to retrieve tag',
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
    const tagId = params.id
    
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
    
    // Mock tags data
    const mockTags = [
      {
        id: 'tag_1',
        name: 'JavaScript',
        slug: 'javascript',
        description: 'Articles related to JavaScript programming language',
        postCount: 12,
        createdAt: '2023-06-01T10:00:00Z',
        updatedAt: null
      },
      {
        id: 'tag_2',
        name: 'React',
        slug: 'react',
        description: 'Content about React.js library',
        postCount: 8,
        createdAt: '2023-06-02T11:30:00Z',
        updatedAt: null
      },
      {
        id: 'tag_3',
        name: 'Next.js',
        slug: 'nextjs',
        description: 'Tutorials and guides for Next.js framework',
        postCount: 6,
        createdAt: '2023-06-03T09:15:00Z',
        updatedAt: null
      },
      {
        id: 'tag_4',
        name: 'CSS',
        slug: 'css',
        description: 'Topics covering Cascading Style Sheets',
        postCount: 10,
        createdAt: '2023-06-04T14:20:00Z',
        updatedAt: null
      }
    ]
    
    // Find the tag to update
    const tagIndex = mockTags.findIndex(tag => tag.id === tagId)
    
    if (tagIndex === -1) {
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
    
    const tag = mockTags[tagIndex]
    
    // Check for naming conflicts if name is being updated
    if (data.name && data.name !== tag.name) {
      const nameExists = mockTags.some(
        t => t.id !== tagId && t.name.toLowerCase() === data.name.toLowerCase()
      )
      
      if (nameExists) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'A tag with this name already exists'
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
    
    // Update the tag
    const updatedTag = {
      ...tag,
      name: data.name !== undefined ? data.name.trim() : tag.name,
      description: data.description !== undefined ? data.description.trim() : tag.description,
      updatedAt: new Date().toISOString()
    }
    
    // Update the slug if name has changed
    if (data.name && data.name !== tag.name) {
      updatedTag.slug = data.name.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    }
    
    // In a real app, update the tag in the database
    // For this example, we just return the updated tag
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag updated successfully',
        data: {
          tag: updatedTag
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

export async function DELETE(request, { params }) {
  try {
    const tagId = params.id
    
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
    
    // Mock tags data
    const mockTags = [
      {
        id: 'tag_1',
        name: 'JavaScript',
        slug: 'javascript'
      },
      {
        id: 'tag_2',
        name: 'React',
        slug: 'react'
      },
      {
        id: 'tag_3',
        name: 'Next.js',
        slug: 'nextjs'
      },
      {
        id: 'tag_4',
        name: 'CSS',
        slug: 'css'
      }
    ]
    
    // Find the tag to delete
    const tagIndex = mockTags.findIndex(tag => tag.id === tagId)
    
    if (tagIndex === -1) {
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
    
    // Mock posts data to check for tag usage
    const mockPosts = [
      { id: 'post_1', tagIds: ['tag_1', 'tag_6'] },
      { id: 'post_2', tagIds: ['tag_2', 'tag_1'] },
      { id: 'post_3', tagIds: ['tag_3', 'tag_2'] },
      { id: 'post_4', tagIds: ['tag_4'] },
      { id: 'post_5', tagIds: ['tag_1', 'tag_5'] }
    ]
    
    // Check if the tag is used in any posts
    const isTagUsed = mockPosts.some(post => post.tagIds.includes(tagId))
    
    // In a real app, we would:
    // 1. Either prevent deletion if the tag is used (more restrictive)
    // 2. Or remove the tag from all posts where it's used (less restrictive)
    
    // In this example, we'll allow deletion regardless, but in a real app,
    // you might want to handle this differently based on your requirements
    
    // In a real app, delete the tag from the database
    // For this example, we just return success
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag deleted successfully',
        data: {
          isTagUsed,
          affectedPosts: isTagUsed ? mockPosts.filter(post => post.tagIds.includes(tagId)).length : 0
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