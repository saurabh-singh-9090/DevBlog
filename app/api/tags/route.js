/**
 * @swagger
 * /api/tags:
 *   get:
 *     description: Get a list of blog tags
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 30
 *         description: Maximum number of tags to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of tags to skip
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [name, count, recent]
 *           default: name
 *         description: Sort order for tags
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter tags by name
 *     responses:
 *       200:
 *         description: Tags retrieved successfully
 *       500:
 *         description: Server error
 *   post:
 *     description: Create a new tag (admin only)
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
 *                 description: Tag name
 *               description:
 *                 type: string
 *                 description: Tag description
 *     responses:
 *       201:
 *         description: Tag created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       409:
 *         description: Tag already exists
 *       500:
 *         description: Server error
 */

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '30', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const sort = searchParams.get('sort') || 'name'
    const search = searchParams.get('search') || ''
    
    // Mock tags data
    let mockTags = [
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
      },
      {
        id: 'tag_5',
        name: 'Performance',
        slug: 'performance',
        description: 'Tips and techniques for improving web performance',
        postCount: 5,
        createdAt: '2023-06-05T15:45:00Z',
        updatedAt: null
      },
      {
        id: 'tag_6',
        name: 'TypeScript',
        slug: 'typescript',
        description: 'Articles about TypeScript language features',
        postCount: 7,
        createdAt: '2023-06-06T10:30:00Z',
        updatedAt: null
      },
      {
        id: 'tag_7',
        name: 'SEO',
        slug: 'seo',
        description: 'Search Engine Optimization techniques',
        postCount: 4,
        createdAt: '2023-06-07T12:15:00Z',
        updatedAt: null
      },
      {
        id: 'tag_8',
        name: 'Accessibility',
        slug: 'accessibility',
        description: 'Best practices for web accessibility',
        postCount: 3,
        createdAt: '2023-06-08T09:45:00Z',
        updatedAt: null
      },
      {
        id: 'tag_9',
        name: 'Design Patterns',
        slug: 'design-patterns',
        description: 'Software design patterns for better code structure',
        postCount: 5,
        createdAt: '2023-06-09T16:20:00Z',
        updatedAt: null
      },
      {
        id: 'tag_10',
        name: 'GraphQL',
        slug: 'graphql',
        description: 'Working with GraphQL APIs',
        postCount: 4,
        createdAt: '2023-06-10T11:10:00Z',
        updatedAt: null
      }
    ]
    
    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase()
      mockTags = mockTags.filter(tag => 
        tag.name.toLowerCase().includes(searchLower) || 
        (tag.description && tag.description.toLowerCase().includes(searchLower))
      )
    }
    
    // Sort the tags
    switch (sort) {
      case 'count':
        mockTags.sort((a, b) => b.postCount - a.postCount)
        break
      case 'recent':
        mockTags.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        break
      case 'name':
      default:
        mockTags.sort((a, b) => a.name.localeCompare(b.name))
        break
    }
    
    // Apply pagination
    const paginatedTags = mockTags.slice(offset, offset + limit)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tags retrieved successfully',
        data: {
          tags: paginatedTags,
          pagination: {
            total: mockTags.length,
            limit,
            offset,
            hasMore: offset + limit < mockTags.length
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
        message: 'Failed to retrieve tags',
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
    
    // Generate slug from name
    const slug = data.name.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    
    // Mock existing tags (in a real app, fetch from database)
    const mockTags = [
      { id: 'tag_1', name: 'JavaScript', slug: 'javascript' },
      { id: 'tag_2', name: 'React', slug: 'react' },
      { id: 'tag_3', name: 'Next.js', slug: 'nextjs' },
      { id: 'tag_4', name: 'CSS', slug: 'css' }
    ]
    
    // Check if tag with same name or slug already exists
    const tagExists = mockTags.some(
      tag => tag.name.toLowerCase() === data.name.toLowerCase() || tag.slug === slug
    )
    
    if (tagExists) {
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
    
    // Create the new tag
    const newTag = {
      id: 'tag_' + Math.random().toString(36).substring(2, 6),
      name: data.name.trim(),
      slug,
      description: data.description ? data.description.trim() : null,
      postCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: null
    }
    
    // In a real app, save the tag to the database
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Tag created successfully',
        data: {
          tag: newTag
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
        message: 'Failed to create tag',
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