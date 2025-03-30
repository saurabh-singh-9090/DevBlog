/**
 * @swagger
 * /api/authors:
 *   get:
 *     description: Returns all authors
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of authors to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of authors to skip for pagination
 *     responses:
 *       200:
 *         description: A list of authors
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // In a real implementation, fetch authors from a database
    // For now, we'll return mock data
    const mockAuthors = [
      { 
        id: '1', 
        name: 'John Doe', 
        email: 'john@example.com',
        bio: 'Tech enthusiast and software developer with 10+ years of experience.',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        twitter: '@johndoe',
        github: 'johndoe'
      },
      { 
        id: '2', 
        name: 'Jane Smith', 
        email: 'jane@example.com',
        bio: 'UX designer and front-end developer specializing in accessible web design.',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        twitter: '@janesmith',
        github: 'janesmith'
      },
      { 
        id: '3', 
        name: 'Mike Johnson', 
        email: 'mike@example.com',
        bio: 'Data scientist and AI researcher focused on machine learning applications.',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        twitter: '@mikejohnson',
        github: 'mikejohnson'
      }
    ]
    
    // Apply pagination
    const paginatedAuthors = mockAuthors.slice(offset, offset + limit)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Authors fetched successfully',
        data: paginatedAuthors,
        pagination: {
          total: mockAuthors.length,
          limit,
          offset,
          hasMore: offset + limit < mockAuthors.length
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
        message: 'Failed to fetch authors',
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
 * /api/authors:
 *   post:
 *     description: Creates a new author
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the author
 *               email:
 *                 type: string
 *                 description: Email of the author
 *               bio:
 *                 type: string
 *                 description: Author biography
 *               avatarUrl:
 *                 type: string
 *                 description: URL to the author's avatar image
 *               twitter:
 *                 type: string
 *                 description: Author's Twitter handle
 *               github:
 *                 type: string
 *                 description: Author's GitHub username
 *     responses:
 *       201:
 *         description: Author created successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    if (!data.name || !data.email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Name and email are required fields'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email format'
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
    // 1. Validate user authentication (admin role)
    // 2. Check if email is already in use
    // 3. Create the author in the database
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Author created successfully',
        data: {
          id: Math.random().toString(36).substring(2, 9),
          name: data.name,
          email: data.email,
          bio: data.bio || '',
          avatarUrl: data.avatarUrl || 'https://i.pravatar.cc/150?img=4',
          twitter: data.twitter || '',
          github: data.github || '',
          createdAt: new Date().toISOString()
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
        message: 'Failed to create author',
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