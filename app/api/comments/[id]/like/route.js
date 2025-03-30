/**
 * @swagger
 * /api/comments/{id}/like:
 *   post:
 *     description: Likes or unlikes a comment
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [like, unlike]
 *                 description: Whether to like or unlike the comment
 *     responses:
 *       200:
 *         description: Operation successful
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
export async function POST(request, { params }) {
  try {
    const { id } = params
    
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
    
    // Mock user data based on token
    let currentUser
    if (token === 'mock-admin-token') {
      currentUser = { id: 'admin', name: 'Admin' }
    } else if (token === 'mock-author1-token') {
      currentUser = { id: '1', name: 'John Doe' }
    } else if (token === 'mock-author2-token') {
      currentUser = { id: '2', name: 'Jane Smith' }
    } else if (token === 'mock-author3-token') {
      currentUser = { id: '3', name: 'Mike Johnson' }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid token'
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
    if (!data.action || !['like', 'unlike'].includes(data.action)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Valid action (like or unlike) is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock comments data
    const mockComments = [
      {
        id: '1',
        content: 'Great article! Very informative.',
        likeCount: 5,
        likedBy: ['2', '3', '4', '5', '6']
      },
      {
        id: '2',
        content: 'Thanks for sharing this. I learned a lot!',
        likeCount: 3,
        likedBy: ['1', '4', '5']
      },
      {
        id: '3',
        content: 'This is exactly what I needed to get started with React!',
        likeCount: 7,
        likedBy: ['1', '2', '3', '5', '6', '7', '8']
      }
    ]
    
    // Check if the comment exists
    const commentIndex = mockComments.findIndex(comment => comment.id === id)
    if (commentIndex === -1) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Comment not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    const comment = { ...mockComments[commentIndex] }
    const userHasLiked = comment.likedBy.includes(currentUser.id)
    
    // Handle like/unlike action
    if (data.action === 'like' && !userHasLiked) {
      // Add user to likedBy and increment count
      comment.likedBy.push(currentUser.id)
      comment.likeCount += 1
    } else if (data.action === 'unlike' && userHasLiked) {
      // Remove user from likedBy and decrement count
      comment.likedBy = comment.likedBy.filter(id => id !== currentUser.id)
      comment.likeCount -= 1
    }
    
    // In a real implementation, update the comment in the database
    
    return new Response(
      JSON.stringify({
        success: true,
        message: data.action === 'like' ? 'Comment liked successfully' : 'Comment unliked successfully',
        data: {
          id: comment.id,
          likeCount: comment.likeCount,
          liked: comment.likedBy.includes(currentUser.id)
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
        message: 'Failed to process like/unlike action',
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