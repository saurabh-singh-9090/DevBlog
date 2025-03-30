/**
 * @swagger
 * /api/posts/comments/{id}/like:
 *   post:
 *     description: Like or unlike a comment
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
 *             properties:
 *               userId:
 *                 type: string
 *                 description: ID of the user (if authenticated)
 *               sessionId:
 *                 type: string
 *                 description: Anonymous session ID (if not authenticated)
 *     responses:
 *       200:
 *         description: Like added or removed successfully
 *       404:
 *         description: Comment not found
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

export async function POST(request, { params }) {
  try {
    const commentId = params.id
    const data = await request.json()
    
    // Validate that either userId or sessionId is provided
    if (!data.userId && !data.sessionId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Either userId or sessionId is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock comments data (in a real app, fetch from database)
    const mockComments = {
      'comment_1': {
        id: 'comment_1',
        postId: 'post_1',
        content: 'This was really helpful! I was struggling with setting up Next.js correctly.',
        author: {
          name: 'Sarah Johnson',
          website: 'https://sarahjohnson.dev',
          email: 'sarah@example.com'
        },
        createdAt: '2023-07-16T10:30:00Z',
        updatedAt: null,
        likes: 12,
        isApproved: true,
        parentId: null
      },
      'comment_2': {
        id: 'comment_2',
        postId: 'post_1',
        content: 'Glad you found it helpful! Let me know if you have any questions.',
        author: {
          name: 'Jane Doe',
          website: 'https://janedoe.com',
          email: 'jane@example.com'
        },
        createdAt: '2023-07-16T11:15:00Z',
        updatedAt: null,
        likes: 5,
        isApproved: true,
        parentId: 'comment_1'
      },
      'comment_3': {
        id: 'comment_3',
        postId: 'post_1',
        content: 'I had the same issues when starting out. The documentation has improved a lot though!',
        author: {
          name: 'Mike Wilson',
          email: 'mike@example.com'
        },
        createdAt: '2023-07-16T13:45:00Z',
        updatedAt: null,
        likes: 3,
        isApproved: true,
        parentId: 'comment_1'
      }
    }
    
    // Check if comment exists
    if (!mockComments[commentId]) {
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
    
    // Mock likes data (in a real app, fetch from database)
    const mockLikes = [
      { id: 'like_1', commentId: 'comment_1', userId: 'user_1', createdAt: '2023-07-17T10:00:00Z' },
      { id: 'like_2', commentId: 'comment_1', userId: 'user_2', createdAt: '2023-07-17T11:30:00Z' },
      { id: 'like_3', commentId: 'comment_2', userId: 'user_1', createdAt: '2023-07-17T12:15:00Z' },
      { id: 'like_4', commentId: 'comment_1', sessionId: 'session_abc', createdAt: '2023-07-17T14:20:00Z' },
      { id: 'like_5', commentId: 'comment_3', userId: 'user_2', createdAt: '2023-07-17T15:45:00Z' }
    ]
    
    // Identifier for the current user/session
    const userIdentifier = data.userId 
      ? { userId: data.userId } 
      : { sessionId: data.sessionId }
    
    // Check if user/session has already liked the comment
    const existingLike = mockLikes.find(like => 
      like.commentId === commentId && 
      ((data.userId && like.userId === data.userId) || 
      (data.sessionId && like.sessionId === data.sessionId))
    )
    
    let response
    
    if (existingLike) {
      // User has already liked the comment, so unlike it
      // In a real app, this would delete the like from the database and decrement the likes count
      
      response = {
        success: true,
        message: 'Like removed from comment',
        data: {
          action: 'unliked',
          commentId,
          ...userIdentifier,
          likes: mockComments[commentId].likes - 1 // Decrement in a real app
        }
      }
    } else {
      // User hasn't liked the comment yet, so add a like
      // In a real app, this would create a new like in the database and increment the likes count
      
      const newLike = {
        id: 'like_' + Math.random().toString(36).substring(2, 10),
        commentId,
        ...userIdentifier,
        createdAt: new Date().toISOString()
      }
      
      response = {
        success: true,
        message: 'Comment liked successfully',
        data: {
          action: 'liked',
          commentId,
          ...userIdentifier,
          like: newLike,
          likes: mockComments[commentId].likes + 1 // Increment in a real app
        }
      }
    }
    
    return new Response(
      JSON.stringify(response),
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
        message: 'Failed to process like',
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