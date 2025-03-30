/**
 * @swagger
 * /api/posts/comments:
 *   get:
 *     description: Get comments for a blog post
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the post to get comments for
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of comments to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of comments to skip
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, popular]
 *           default: newest
 *         description: Sort order for comments
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   post:
 *     description: Add a new comment to a blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - content
 *               - author
 *             properties:
 *               postId:
 *                 type: string
 *                 description: ID of the post to comment on
 *               content:
 *                 type: string
 *                 description: Comment content
 *               author:
 *                 type: object
 *                 required:
 *                   - name
 *                   - email
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Author's name
 *                   email:
 *                     type: string
 *                     description: Author's email (will not be public)
 *                   website:
 *                     type: string
 *                     description: Author's website (optional)
 *               parentId:
 *                 type: string
 *                 description: ID of the parent comment (for replies)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const sort = searchParams.get('sort') || 'newest'
    
    // Validate required parameters
    if (!postId) {
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
    
    // Validate sort parameter
    const validSorts = ['newest', 'oldest', 'popular']
    if (!validSorts.includes(sort)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid sort parameter. Valid options are: ${validSorts.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock post data - in a real app this would check database
    const mockPosts = {
      'post_1': { id: 'post_1', title: 'Getting Started with Next.js' },
      'post_2': { id: 'post_2', title: 'Understanding React Hooks' },
      'post_3': { id: 'post_3', title: 'Building a Blog with Next.js' }
    }
    
    // Check if post exists
    if (!mockPosts[postId]) {
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
    
    // Mock comments data
    const mockComments = [
      {
        id: 'comment_1',
        postId: 'post_1',
        content: 'This was really helpful! I was struggling with setting up Next.js correctly.',
        author: {
          name: 'Sarah Johnson',
          website: 'https://sarahjohnson.dev'
        },
        createdAt: '2023-07-16T10:30:00Z',
        updatedAt: null,
        likes: 12,
        isApproved: true,
        parentId: null,
        replies: [
          {
            id: 'comment_2',
            postId: 'post_1',
            content: 'Glad you found it helpful! Let me know if you have any questions.',
            author: {
              name: 'Jane Doe',
              website: 'https://janedoe.com'
            },
            createdAt: '2023-07-16T11:15:00Z',
            updatedAt: null,
            likes: 5,
            isApproved: true,
            parentId: 'comment_1'
          },
          {
            id: 'comment_3',
            postId: 'post_1',
            content: 'I had the same issues when starting out. The documentation has improved a lot though!',
            author: {
              name: 'Mike Wilson'
            },
            createdAt: '2023-07-16T13:45:00Z',
            updatedAt: null,
            likes: 3,
            isApproved: true,
            parentId: 'comment_1'
          }
        ]
      },
      {
        id: 'comment_4',
        postId: 'post_1',
        content: 'Have you considered comparing Next.js with Remix in a future article?',
        author: {
          name: 'Alex Chen',
          website: 'https://alexchen.io'
        },
        createdAt: '2023-07-17T09:20:00Z',
        updatedAt: null,
        likes: 8,
        isApproved: true,
        parentId: null,
        replies: []
      },
      {
        id: 'comment_5',
        postId: 'post_1',
        content: 'I\'m getting an error when trying to set up API routes. Has anyone else experienced this?',
        author: {
          name: 'Taylor Swift'
        },
        createdAt: '2023-07-18T16:10:00Z',
        updatedAt: null,
        likes: 2,
        isApproved: true,
        parentId: null,
        replies: [
          {
            id: 'comment_6',
            postId: 'post_1',
            content: 'Can you share what error you\'re getting? I might be able to help.',
            author: {
              name: 'John Smith'
            },
            createdAt: '2023-07-18T17:30:00Z',
            updatedAt: null,
            likes: 1,
            isApproved: true,
            parentId: 'comment_5'
          }
        ]
      },
      {
        id: 'comment_7',
        postId: 'post_2',
        content: 'UseEffect is so powerful but can be tricky to master!',
        author: {
          name: 'React Fan'
        },
        createdAt: '2023-07-15T11:20:00Z',
        updatedAt: null,
        likes: 15,
        isApproved: true,
        parentId: null,
        replies: []
      },
      {
        id: 'comment_8',
        postId: 'post_2',
        content: 'Great explanation of the dependency array. That\'s the part most people get wrong.',
        author: {
          name: 'Dev Guru',
          website: 'https://devguru.blog'
        },
        createdAt: '2023-07-15T14:05:00Z',
        updatedAt: null,
        likes: 22,
        isApproved: true,
        parentId: null,
        replies: []
      },
      {
        id: 'comment_9',
        postId: 'post_3',
        content: 'I built my blog following this approach and it works great!',
        author: {
          name: 'New Blogger'
        },
        createdAt: '2023-07-19T10:15:00Z',
        updatedAt: null,
        likes: 7,
        isApproved: true,
        parentId: null,
        replies: []
      }
    ]
    
    // Filter comments by postId
    let filteredComments = mockComments.filter(comment => comment.postId === postId && comment.parentId === null)
    
    // Flatten the structure (optional based on frontend needs)
    const flattenedComments = []
    
    filteredComments.forEach(comment => {
      // Add the parent comment
      flattenedComments.push({
        ...comment,
        replies: comment.replies.length // Just include the count in the flattened view
      })
      
      // Add the replies
      comment.replies.forEach(reply => {
        flattenedComments.push({
          ...reply,
          replies: 0
        })
      })
    })
    
    // Sort comments based on the sort parameter
    let sortedComments
    
    if (sort === 'newest') {
      sortedComments = flattenedComments.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    } else if (sort === 'oldest') {
      sortedComments = flattenedComments.sort((a, b) => 
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      )
    } else if (sort === 'popular') {
      sortedComments = flattenedComments.sort((a, b) => b.likes - a.likes)
    }
    
    // Apply pagination
    const total = sortedComments.length
    const paginatedComments = sortedComments.slice(offset, offset + limit)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comments retrieved successfully',
        data: {
          comments: paginatedComments,
          pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
          },
          post: {
            id: postId,
            title: mockPosts[postId].title
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
        message: 'Failed to retrieve comments',
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
    
    if (!data.author || !data.author.name || !data.author.email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Author name and email are required'
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
    if (!emailRegex.test(data.author.email)) {
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
    
    // If it's a reply, check if parent comment exists
    if (data.parentId) {
      // In a real app, verify the parent comment exists in the database
      const parentExists = ['comment_1', 'comment_4', 'comment_5', 'comment_7', 'comment_8', 'comment_9'].includes(data.parentId)
      
      if (!parentExists) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Parent comment not found'
          }),
          {
            status: 404,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
    }
    
    // Generate a unique ID (in a real app, this would be handled by the database)
    const commentId = 'comment_' + Math.random().toString(36).substring(2, 10)
    
    // Create the new comment
    const newComment = {
      id: commentId,
      postId: data.postId,
      content: data.content.trim(),
      author: {
        name: data.author.name,
        website: data.author.website || null
      },
      createdAt: new Date().toISOString(),
      updatedAt: null,
      likes: 0,
      isApproved: true, // In a real app, might be false until moderated
      parentId: data.parentId || null,
      replies: []
    }
    
    // In a real app, save the comment to the database
    
    // Return the new comment
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment added successfully',
        data: {
          comment: newComment,
          post: {
            id: data.postId,
            title: mockPosts[data.postId].title
          }
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
        message: 'Failed to add comment',
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