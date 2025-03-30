/**
 * @swagger
 * /api/posts/{id}/like:
 *   post:
 *     description: Like or unlike a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: User ID (for authenticated users)
 *               sessionId:
 *                 type: string
 *                 description: Session ID (for anonymous users)
 *             oneOf:
 *               - required: [userId]
 *               - required: [sessionId]
 *     responses:
 *       200:
 *         description: Like status updated successfully
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   get:
 *     description: Check if user has liked a post
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: User ID (for authenticated users)
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         description: Session ID (for anonymous users)
 *     responses:
 *       200:
 *         description: Like status retrieved successfully
 *       400:
 *         description: Missing required parameters
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

export async function POST(request, { params }) {
  try {
    const postId = params.id
    
    // Parse the request body
    const data = await request.json()
    const { userId, sessionId } = data
    
    // Validate required parameters
    if (!userId && !sessionId) {
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
    
    // Mock posts data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        likeCount: 42
      },
      {
        id: 'post_2',
        title: 'React Hooks in Depth',
        likeCount: 35
      }
    ]
    
    // Find the post
    const postIndex = mockPosts.findIndex(post => post.id === postId)
    
    if (postIndex === -1) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Post not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Generate a unique identifier for the like (either userId or sessionId)
    const likeIdentifier = userId || `session_${sessionId}`
    
    // Mock likes data
    const mockLikes = [
      { postId: 'post_1', identifier: 'user_123', createdAt: '2023-07-20T14:30:00Z' },
      { postId: 'post_1', identifier: 'user_456', createdAt: '2023-07-21T10:15:00Z' },
      { postId: 'post_1', identifier: 'session_abc123', createdAt: '2023-07-22T09:45:00Z' },
      { postId: 'post_2', identifier: 'user_789', createdAt: '2023-07-19T16:20:00Z' },
      { postId: 'post_2', identifier: 'user_123', createdAt: '2023-07-23T11:30:00Z' }
    ]
    
    // Check if the user/session has already liked the post
    const existingLikeIndex = mockLikes.findIndex(
      like => like.postId === postId && like.identifier === likeIdentifier
    )
    
    let isLiked = false
    let updatedLikeCount = mockPosts[postIndex].likeCount
    
    if (existingLikeIndex === -1) {
      // User hasn't liked the post yet, so add a like
      isLiked = true
      updatedLikeCount += 1
      
      // In a real app, add the like to the database
      const now = new Date().toISOString()
      mockLikes.push({
        postId,
        identifier: likeIdentifier,
        createdAt: now
      })
    } else {
      // User has already liked the post, so remove the like
      isLiked = false
      updatedLikeCount -= 1
      
      // In a real app, remove the like from the database
      mockLikes.splice(existingLikeIndex, 1)
    }
    
    // Update the post like count
    const post = mockPosts[postIndex]
    const updatedPost = { ...post, likeCount: updatedLikeCount }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: isLiked ? 'Post liked successfully' : 'Post unliked successfully',
        data: {
          post: {
            id: updatedPost.id,
            likeCount: updatedPost.likeCount
          },
          isLiked
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
        message: 'Failed to update like status',
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

export async function GET(request, { params }) {
  try {
    const postId = params.id
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')
    
    // Validate required parameters
    if (!userId && !sessionId) {
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
    
    // Mock posts data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        likeCount: 42
      },
      {
        id: 'post_2',
        title: 'React Hooks in Depth',
        likeCount: 35
      }
    ]
    
    // Find the post
    const post = mockPosts.find(post => post.id === postId)
    
    if (!post) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Post not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Generate a unique identifier for the like (either userId or sessionId)
    const likeIdentifier = userId || `session_${sessionId}`
    
    // Mock likes data
    const mockLikes = [
      { postId: 'post_1', identifier: 'user_123', createdAt: '2023-07-20T14:30:00Z' },
      { postId: 'post_1', identifier: 'user_456', createdAt: '2023-07-21T10:15:00Z' },
      { postId: 'post_1', identifier: 'session_abc123', createdAt: '2023-07-22T09:45:00Z' },
      { postId: 'post_2', identifier: 'user_789', createdAt: '2023-07-19T16:20:00Z' },
      { postId: 'post_2', identifier: 'user_123', createdAt: '2023-07-23T11:30:00Z' }
    ]
    
    // Check if the user/session has already liked the post
    const isLiked = mockLikes.some(
      like => like.postId === postId && like.identifier === likeIdentifier
    )
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Like status retrieved successfully',
        data: {
          post: {
            id: post.id,
            likeCount: post.likeCount
          },
          isLiked
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
        message: 'Failed to retrieve like status',
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