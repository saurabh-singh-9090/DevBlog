/**
 * @swagger
 * /api/comments:
 *   get:
 *     description: Returns comments, optionally filtered by blog post
 *     parameters:
 *       - in: query
 *         name: postSlug
 *         schema:
 *           type: string
 *         description: Slug of the blog post to get comments for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of comments to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of comments to skip for pagination
 *     responses:
 *       200:
 *         description: A list of comments
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const postSlug = searchParams.get('postSlug')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // In a real implementation, fetch comments from a database
    // For now, we'll return mock data
    const mockComments = [
      { 
        id: '1', 
        postSlug: 'introduction-to-nextjs', 
        author: 'John Doe', 
        email: 'john@example.com',
        content: 'Great article! I learned a lot about Next.js.', 
        createdAt: '2023-10-15T14:30:00Z',
        isApproved: true
      },
      { 
        id: '2', 
        postSlug: 'introduction-to-nextjs', 
        author: 'Jane Smith', 
        email: 'jane@example.com',
        content: 'Thanks for the clear explanation. Would love to see more examples.', 
        createdAt: '2023-10-16T09:15:00Z',
        isApproved: true
      },
      { 
        id: '3', 
        postSlug: 'css-grid-explained', 
        author: 'Mike Johnson', 
        email: 'mike@example.com',
        content: 'CSS Grid is amazing! This helped me understand it better.', 
        createdAt: '2023-10-14T11:45:00Z',
        isApproved: true
      }
    ]
    
    // Filter by post slug if provided
    let filteredComments = mockComments
    if (postSlug) {
      filteredComments = mockComments.filter(comment => comment.postSlug === postSlug)
    }
    
    // Apply pagination
    const paginatedComments = filteredComments.slice(offset, offset + limit)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comments fetched successfully',
        data: paginatedComments,
        pagination: {
          total: filteredComments.length,
          limit,
          offset,
          hasMore: offset + limit < filteredComments.length
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
        message: 'Failed to fetch comments',
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
 * /api/comments:
 *   post:
 *     description: Creates a new comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postSlug
 *               - author
 *               - email
 *               - content
 *             properties:
 *               postSlug:
 *                 type: string
 *                 description: Slug of the blog post to comment on
 *               author:
 *                 type: string
 *                 description: Name of the commenter
 *               email:
 *                 type: string
 *                 description: Email of the commenter
 *               content:
 *                 type: string
 *                 description: Content of the comment
 *     responses:
 *       201:
 *         description: Comment created successfully (may be pending approval)
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['postSlug', 'author', 'email', 'content']
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `${field} is required`
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
    // 1. Verify the blog post exists
    // 2. Apply spam filtering
    // 3. Decide if comment needs moderation
    // 4. Save the comment to the database
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment submitted successfully and pending approval',
        data: {
          id: Math.random().toString(36).substring(2, 9),
          postSlug: data.postSlug,
          author: data.author,
          email: data.email,
          content: data.content,
          createdAt: new Date().toISOString(),
          isApproved: false
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
        message: 'Failed to create comment',
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