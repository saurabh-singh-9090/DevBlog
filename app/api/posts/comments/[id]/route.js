/**
 * @swagger
 * /api/posts/comments/{id}:
 *   get:
 *     description: Get a specific comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the comment
 *     responses:
 *       200:
 *         description: Comment retrieved successfully
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   put:
 *     description: Update a comment (only allowed for comment author or admin)
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
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *                 description: Updated comment content
 *               authorEmail:
 *                 type: string
 *                 description: Author's email for verification
 *     responses:
 *       200:
 *         description: Comment updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - not the comment author
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a comment (only allowed for comment author or admin)
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
 *               - authorEmail
 *             properties:
 *               authorEmail:
 *                 type: string
 *                 description: Author's email for verification
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       401:
 *         description: Unauthorized - not the comment author
 *       404:
 *         description: Comment not found
 *       500:
 *         description: Server error
 */

export async function GET(request, { params }) {
  try {
    const commentId = params.id
    
    // Mock comments data (in a real app, fetch from database)
    const mockComments = {
      'comment_1': {
        id: 'comment_1',
        postId: 'post_1',
        content: 'This was really helpful! I was struggling with setting up Next.js correctly.',
        author: {
          name: 'Sarah Johnson',
          website: 'https://sarahjohnson.dev',
          email: 'sarah@example.com' // In real implementation, email would only be accessible to admins
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
    
    // Get the comment
    const comment = mockComments[commentId]
    
    // Remove sensitive data (email) before returning
    const sanitizedComment = {
      ...comment,
      author: {
        name: comment.author.name,
        website: comment.author.website
      }
    }
    
    // Mock post data
    const mockPosts = {
      'post_1': { id: 'post_1', title: 'Getting Started with Next.js' },
      'post_2': { id: 'post_2', title: 'Understanding React Hooks' },
      'post_3': { id: 'post_3', title: 'Building a Blog with Next.js' }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment retrieved successfully',
        data: {
          comment: sanitizedComment,
          post: mockPosts[comment.postId]
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
        message: 'Failed to retrieve comment',
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
    const commentId = params.id
    const data = await request.json()
    
    // Validate required fields
    if (!data.content || data.content.trim() === '') {
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
    
    // Get the comment
    const comment = mockComments[commentId]
    
    // Check if the request is from the comment author (via email verification)
    // In a real app, this would use proper authentication
    if (data.authorEmail !== comment.author.email) {
      // Check if it's an admin (in a real app, use proper admin authentication)
      const isAdmin = false // Mock value; real implementation would verify admin status
      
      if (!isAdmin) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Unauthorized - you can only edit your own comments'
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
    }
    
    // Update the comment
    const updatedComment = {
      ...comment,
      content: data.content.trim(),
      updatedAt: new Date().toISOString()
    }
    
    // In a real app, save the updated comment to the database
    // mockComments[commentId] = updatedComment
    
    // Remove sensitive data (email) before returning
    const sanitizedComment = {
      ...updatedComment,
      author: {
        name: updatedComment.author.name,
        website: updatedComment.author.website
      }
    }
    
    // Mock post data
    const mockPosts = {
      'post_1': { id: 'post_1', title: 'Getting Started with Next.js' },
      'post_2': { id: 'post_2', title: 'Understanding React Hooks' },
      'post_3': { id: 'post_3', title: 'Building a Blog with Next.js' }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment updated successfully',
        data: {
          comment: sanitizedComment,
          post: mockPosts[comment.postId]
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

export async function DELETE(request, { params }) {
  try {
    const commentId = params.id
    const data = await request.json()
    
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
    
    // Get the comment
    const comment = mockComments[commentId]
    
    // Check if the request is from the comment author (via email verification)
    // In a real app, this would use proper authentication
    if (!data.authorEmail || data.authorEmail !== comment.author.email) {
      // Check if it's an admin (in a real app, use proper admin authentication)
      const isAdmin = false // Mock value; real implementation would verify admin status
      
      if (!isAdmin) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Unauthorized - you can only delete your own comments'
          }),
          {
            status: 401,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
    }
    
    // In a real app, delete the comment from the database
    // delete mockComments[commentId]
    
    // Check for child comments (replies)
    // In a real app, you might want to mark the comment as deleted but keep its content structure
    // to preserve reply threads, or recursively delete all replies
    const hasReplies = Object.values(mockComments).some(c => c.parentId === commentId)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment deleted successfully',
        data: {
          commentId,
          postId: comment.postId,
          hasReplies
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