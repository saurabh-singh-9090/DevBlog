/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     description: Returns a specific comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: A single comment
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    // In a real implementation, fetch the comment from a database
    
    // Mock comments data
    const mockComments = [
      {
        id: '1',
        postId: '1',
        post: {
          slug: 'getting-started-with-javascript',
          title: 'Getting Started with JavaScript'
        },
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg',
          isAuthenticated: true,
          userId: '2'
        },
        content: 'Great article! Very informative.',
        createdAt: '2023-06-15T15:30:00Z',
        updatedAt: null,
        likeCount: 5,
        replyTo: null
      },
      {
        id: '2',
        postId: '1',
        post: {
          slug: 'getting-started-with-javascript',
          title: 'Getting Started with JavaScript'
        },
        author: {
          name: 'Mike Johnson',
          avatar: '/images/authors/mike-johnson.jpg',
          isAuthenticated: true,
          userId: '3'
        },
        content: 'Thanks for sharing this. I learned a lot!',
        createdAt: '2023-06-16T09:15:00Z',
        updatedAt: null,
        likeCount: 3,
        replyTo: null
      },
      {
        id: '3',
        postId: '2',
        post: {
          slug: 'introduction-to-react',
          title: 'Introduction to React'
        },
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg',
          isAuthenticated: true,
          userId: '1'
        },
        content: 'This is exactly what I needed to get started with React!',
        createdAt: '2023-06-22T15:45:00Z',
        updatedAt: null,
        likeCount: 7,
        replyTo: null
      }
    ]
    
    const comment = mockComments.find(comment => comment.id === id)
    
    if (!comment) {
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
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment fetched successfully',
        data: comment
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
        message: 'Failed to fetch comment',
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
 * /api/comments/{id}:
 *   put:
 *     description: Updates a specific comment (only author or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: The updated content of the comment
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not authorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
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
      currentUser = { id: 'admin', role: 'admin' }
    } else if (token === 'mock-author1-token') {
      currentUser = { id: '1', role: 'user' }
    } else if (token === 'mock-author2-token') {
      currentUser = { id: '2', role: 'user' }
    } else if (token === 'mock-author3-token') {
      currentUser = { id: '3', role: 'user' }
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
    if (!data.content || !data.content.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Comment content is required'
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
        author: {
          userId: '2'
        },
        content: 'Great article! Very informative.',
        createdAt: '2023-06-15T15:30:00Z',
        updatedAt: null
      },
      {
        id: '2',
        author: {
          userId: '3'
        },
        content: 'Thanks for sharing this. I learned a lot!',
        createdAt: '2023-06-16T09:15:00Z',
        updatedAt: null
      },
      {
        id: '3',
        author: {
          userId: '1'
        },
        content: 'This is exactly what I needed to get started with React!',
        createdAt: '2023-06-22T15:45:00Z',
        updatedAt: null
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
    
    const comment = mockComments[commentIndex]
    
    // Check if the user is authorized to update this comment
    // Admin can update any comment, users can only update their own comments
    if (currentUser.role !== 'admin' && currentUser.id !== comment.author.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You are not authorized to update this comment'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Update the comment
    const updatedComment = {
      ...comment,
      content: data.content,
      updatedAt: new Date().toISOString()
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment updated successfully',
        data: updatedComment
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
        message: 'Failed to update comment',
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
 * /api/comments/{id}:
 *   delete:
 *     description: Deletes a specific comment (only author, post author, or admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized - user not authenticated or not authorized
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
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
      currentUser = { id: 'admin', role: 'admin' }
    } else if (token === 'mock-author1-token') {
      currentUser = { id: '1', role: 'user' }
    } else if (token === 'mock-author2-token') {
      currentUser = { id: '2', role: 'user' }
    } else if (token === 'mock-author3-token') {
      currentUser = { id: '3', role: 'user' }
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
    
    // Mock comments with post author data
    const mockComments = [
      {
        id: '1',
        postId: '1',
        author: {
          userId: '2'
        },
        post: {
          authorId: '1' // Post is by author1
        }
      },
      {
        id: '2',
        postId: '1',
        author: {
          userId: '3'
        },
        post: {
          authorId: '1' // Post is by author1
        }
      },
      {
        id: '3',
        postId: '2',
        author: {
          userId: '1'
        },
        post: {
          authorId: '2' // Post is by author2
        }
      }
    ]
    
    // Check if the comment exists
    const comment = mockComments.find(comment => comment.id === id)
    if (!comment) {
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
    
    // Check if the user is authorized to delete this comment:
    // 1. Admin can delete any comment
    // 2. Users can delete their own comments
    // 3. Post author can delete comments on their post
    const isAdmin = currentUser.role === 'admin'
    const isCommentAuthor = currentUser.id === comment.author.userId
    const isPostAuthor = currentUser.id === comment.post.authorId
    
    if (!isAdmin && !isCommentAuthor && !isPostAuthor) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You are not authorized to delete this comment'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation, delete the comment from the database
    // For our mock, we'll just acknowledge the deletion
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment deleted successfully',
        data: {
          id,
          deletedAt: new Date().toISOString()
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
        message: 'Failed to delete comment',
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