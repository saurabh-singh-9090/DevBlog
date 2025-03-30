/**
 * @swagger
 * /api/posts/reactions:
 *   post:
 *     description: Add a reaction (like, bookmark, etc.) to a post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - type
 *             properties:
 *               postId:
 *                 type: string
 *                 description: ID of the post to react to
 *               type:
 *                 type: string
 *                 enum: [like, bookmark]
 *                 description: Type of reaction
 *               userId:
 *                 type: string
 *                 description: ID of the user (if authenticated)
 *               sessionId:
 *                 type: string
 *                 description: Anonymous session ID (if not authenticated)
 *     responses:
 *       200:
 *         description: Reaction added or removed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   get:
 *     description: Get reactions for a post or user
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: Filter by post ID
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         description: Filter by user ID (authenticated users only)
 *       - in: query
 *         name: sessionId
 *         schema:
 *           type: string
 *         description: Filter by session ID (anonymous users)
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [like, bookmark, all]
 *           default: all
 *         description: Filter by reaction type
 *     responses:
 *       200:
 *         description: Reactions retrieved successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    if (!data.postId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Post ID is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    if (!data.type || !['like', 'bookmark'].includes(data.type)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Valid reaction type is required (like or bookmark)'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Need either userId or sessionId
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
    
    // In a real implementation:
    // 1. Check if the post exists
    // 2. Check if the user already reacted to the post
    // 3. Toggle the reaction (add if not present, remove if present)
    
    // Mock post data - in a real app this would check database
    const mockPosts = {
      'post_1': { id: 'post_1', title: 'Getting Started with Next.js' },
      'post_2': { id: 'post_2', title: 'Understanding React Hooks' },
      'post_3': { id: 'post_3', title: 'Building a Blog with Next.js' }
    }
    
    // Check if post exists
    if (!mockPosts[data.postId]) {
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
    
    // Mock existing reactions
    const mockReactions = [
      { id: 'reaction_1', postId: 'post_1', userId: 'user_1', type: 'like', createdAt: '2023-07-10T10:00:00Z' },
      { id: 'reaction_2', postId: 'post_1', userId: 'user_2', type: 'like', createdAt: '2023-07-11T11:30:00Z' },
      { id: 'reaction_3', postId: 'post_2', userId: 'user_1', type: 'bookmark', createdAt: '2023-07-12T09:45:00Z' },
      { id: 'reaction_4', postId: 'post_1', sessionId: 'session_abc', type: 'like', createdAt: '2023-07-13T14:20:00Z' }
    ]
    
    // Check if reaction already exists
    const userIdentifier = data.userId ? { userId: data.userId } : { sessionId: data.sessionId }
    const existingReaction = mockReactions.find(r => 
      r.postId === data.postId && 
      r.type === data.type && 
      ((data.userId && r.userId === data.userId) || (data.sessionId && r.sessionId === data.sessionId))
    )
    
    let response
    
    // Toggle the reaction (remove if exists, add if doesn't)
    if (existingReaction) {
      // In a real implementation, this would remove from database
      
      response = {
        success: true,
        message: `${data.type} removed from post`,
        data: {
          action: 'removed',
          type: data.type,
          postId: data.postId,
          ...userIdentifier,
        }
      }
    } else {
      // In a real implementation, this would add to database
      const newReaction = {
        id: 'reaction_' + Math.random().toString(36).substring(2, 10),
        postId: data.postId,
        type: data.type,
        createdAt: new Date().toISOString(),
        ...userIdentifier
      }
      
      response = {
        success: true,
        message: `${data.type} added to post`,
        data: {
          action: 'added',
          reaction: newReaction
        }
      }
    }
    
    // Return the response
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
        message: 'Failed to process reaction',
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

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const userId = searchParams.get('userId')
    const sessionId = searchParams.get('sessionId')
    const type = searchParams.get('type') || 'all'
    
    // Validate parameters
    if (!postId && !userId && !sessionId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'At least one filter parameter is required (postId, userId, or sessionId)'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    if (type !== 'all' && !['like', 'bookmark'].includes(type)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Valid reaction type is required (like, bookmark, or all)'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock reactions data
    const mockReactions = [
      { id: 'reaction_1', postId: 'post_1', userId: 'user_1', type: 'like', createdAt: '2023-07-10T10:00:00Z' },
      { id: 'reaction_2', postId: 'post_1', userId: 'user_2', type: 'like', createdAt: '2023-07-11T11:30:00Z' },
      { id: 'reaction_3', postId: 'post_2', userId: 'user_1', type: 'bookmark', createdAt: '2023-07-12T09:45:00Z' },
      { id: 'reaction_4', postId: 'post_1', sessionId: 'session_abc', type: 'like', createdAt: '2023-07-13T14:20:00Z' },
      { id: 'reaction_5', postId: 'post_3', userId: 'user_2', type: 'bookmark', createdAt: '2023-07-14T16:10:00Z' },
      { id: 'reaction_6', postId: 'post_2', userId: 'user_2', type: 'like', createdAt: '2023-07-15T08:20:00Z' },
      { id: 'reaction_7', postId: 'post_3', userId: 'user_1', type: 'like', createdAt: '2023-07-16T13:40:00Z' },
      { id: 'reaction_8', postId: 'post_2', sessionId: 'session_xyz', type: 'like', createdAt: '2023-07-17T17:30:00Z' }
    ]
    
    // Filter reactions based on query parameters
    let filteredReactions = mockReactions
    
    if (postId) {
      filteredReactions = filteredReactions.filter(reaction => reaction.postId === postId)
    }
    
    if (userId) {
      filteredReactions = filteredReactions.filter(reaction => reaction.userId === userId)
    }
    
    if (sessionId) {
      filteredReactions = filteredReactions.filter(reaction => reaction.sessionId === sessionId)
    }
    
    if (type !== 'all') {
      filteredReactions = filteredReactions.filter(reaction => reaction.type === type)
    }
    
    // If filtering by postId, also return counts by type
    let counts = null
    if (postId) {
      counts = {
        like: mockReactions.filter(r => r.postId === postId && r.type === 'like').length,
        bookmark: mockReactions.filter(r => r.postId === postId && r.type === 'bookmark').length,
        total: mockReactions.filter(r => r.postId === postId).length
      }
    }
    
    // If filtering by userId or sessionId, group by postId
    let groupedByPost = null
    if ((userId || sessionId) && !postId) {
      groupedByPost = {}
      
      filteredReactions.forEach(reaction => {
        if (!groupedByPost[reaction.postId]) {
          groupedByPost[reaction.postId] = []
        }
        groupedByPost[reaction.postId].push(reaction)
      })
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Reactions retrieved successfully',
        data: {
          reactions: filteredReactions,
          ...(counts && { counts }),
          ...(groupedByPost && { groupedByPost })
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
        message: 'Failed to retrieve reactions',
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