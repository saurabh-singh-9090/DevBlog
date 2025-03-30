/**
 * @swagger
 * /api/posts/{slug}/comments:
 *   get:
 *     description: Returns all comments for a specific blog post
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post
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
 *         description: A list of comments for the post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    const { searchParams } = new URL(request.url)
    
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const sort = searchParams.get('sort') || 'newest'
    
    // In a real implementation:
    // 1. Check if the post exists
    // 2. Fetch comments for this post from the database
    
    // Mock posts to check if the post exists
    const mockPosts = [
      { id: '1', slug: 'getting-started-with-javascript' },
      { id: '2', slug: 'introduction-to-react' },
      { id: '3', slug: 'building-mobile-app-react-native' },
      { id: '4', slug: 'getting-started-with-nextjs' },
      { id: '5', slug: 'introduction-to-docker' }
    ]
    
    // Check if the post exists
    const post = mockPosts.find(post => post.slug === slug)
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
    
    // Mock comments data
    const mockComments = [
      {
        id: '1',
        postId: '1',
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg',
          isAuthenticated: true,
          userId: '2'
        },
        content: 'Great article! Very informative.',
        createdAt: '2023-06-15T15:30:00Z',
        likeCount: 5,
        replyTo: null
      },
      {
        id: '2',
        postId: '1',
        author: {
          name: 'Mike Johnson',
          avatar: '/images/authors/mike-johnson.jpg',
          isAuthenticated: true,
          userId: '3'
        },
        content: 'Thanks for sharing this. I learned a lot!',
        createdAt: '2023-06-16T09:15:00Z',
        likeCount: 3,
        replyTo: null
      },
      {
        id: '3',
        postId: '2',
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg',
          isAuthenticated: true,
          userId: '1'
        },
        content: 'This is exactly what I needed to get started with React!',
        createdAt: '2023-06-22T15:45:00Z',
        likeCount: 7,
        replyTo: null
      },
      {
        id: '4',
        postId: '4',
        author: {
          name: 'Sarah Johnson',
          avatar: '/images/authors/sarah-johnson.jpg',
          isAuthenticated: true,
          userId: '4'
        },
        content: 'Next.js has been a game-changer for my projects. Thanks for this guide!',
        createdAt: '2023-07-15T16:20:00Z',
        likeCount: 10,
        replyTo: null
      },
      {
        id: '5',
        postId: '1',
        author: {
          name: 'Alex Williams',
          avatar: '/images/authors/alex-williams.jpg',
          isAuthenticated: false,
          email: 'alex@example.com'
        },
        content: 'I found this really helpful for understanding JavaScript basics.',
        createdAt: '2023-06-18T11:25:00Z',
        likeCount: 2,
        replyTo: '1'
      },
      {
        id: '6',
        postId: '5',
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg',
          isAuthenticated: true,
          userId: '1'
        },
        content: 'Docker has simplified my workflow significantly. Great introduction!',
        createdAt: '2023-08-01T15:50:00Z',
        likeCount: 8,
        replyTo: null
      }
    ]
    
    // Filter comments by post
    const postComments = mockComments.filter(comment => comment.postId === post.id)
    
    // Sort comments
    const sortedComments = [...postComments].sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.createdAt) - new Date(a.createdAt)
      }
      if (sort === 'oldest') {
        return new Date(a.createdAt) - new Date(b.createdAt)
      }
      if (sort === 'popular') {
        return b.likeCount - a.likeCount
      }
      return 0
    })
    
    // Apply pagination
    const paginatedComments = sortedComments.slice(offset, offset + limit)
    
    // Return the response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comments fetched successfully',
        data: {
          comments: paginatedComments,
          pagination: {
            total: postComments.length,
            limit,
            offset,
            hasMore: offset + limit < postComments.length
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
 * /api/posts/{slug}/comments:
 *   post:
 *     description: Creates a new comment on a blog post
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - author
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *               author:
 *                 type: object
 *                 description: Information about the commenter
 *                 required:
 *                   - name
 *                 properties:
 *                   name:
 *                     type: string
 *                     description: Name of the commenter
 *                   email:
 *                     type: string
 *                     description: Email of the commenter (for non-authenticated users)
 *               replyTo:
 *                 type: string
 *                 description: ID of the comment this is replying to (optional)
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function POST(request, { params }) {
  try {
    const { slug } = params
    
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
    
    if (!data.author || !data.author.name || !data.author.name.trim()) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Author name is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Check if the user is authenticated (has an Authorization header)
    const authHeader = request.headers.get('Authorization')
    const isAuthenticated = authHeader && authHeader.startsWith('Bearer ')
    
    // If not authenticated, email is required
    if (!isAuthenticated && (!data.author.email || !data.author.email.trim())) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email is required for non-authenticated users'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock posts to check if the post exists
    const mockPosts = [
      { id: '1', slug: 'getting-started-with-javascript' },
      { id: '2', slug: 'introduction-to-react' },
      { id: '3', slug: 'building-mobile-app-react-native' },
      { id: '4', slug: 'getting-started-with-nextjs' },
      { id: '5', slug: 'introduction-to-docker' }
    ]
    
    // Check if the post exists
    const post = mockPosts.find(post => post.slug === slug)
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
    
    // If this is a reply, check if the parent comment exists
    if (data.replyTo) {
      // Mock comments to check if the parent comment exists
      const mockComments = [
        { id: '1', postId: '1' },
        { id: '2', postId: '1' },
        { id: '3', postId: '2' },
        { id: '4', postId: '4' },
        { id: '5', postId: '1' },
        { id: '6', postId: '5' }
      ]
      
      const parentComment = mockComments.find(comment => comment.id === data.replyTo && comment.postId === post.id)
      
      if (!parentComment) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Parent comment not found or does not belong to this post'
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
    
    // Get user information if authenticated
    let userId = null
    let avatar = null
    
    if (isAuthenticated) {
      const token = authHeader.split(' ')[1]
      
      // Mock user data based on token
      const mockUsers = {
        'mock-admin-token': { id: 'admin', name: 'Admin', avatar: '/images/authors/admin.jpg' },
        'mock-author1-token': { id: '1', name: 'John Doe', avatar: '/images/authors/john-doe.jpg' },
        'mock-author2-token': { id: '2', name: 'Jane Smith', avatar: '/images/authors/jane-smith.jpg' }
      }
      
      const user = mockUsers[token]
      if (user) {
        userId = user.id
        avatar = user.avatar
        
        // Override the author name with the authenticated user's name
        data.author.name = user.name
      }
    }
    
    // Generate a new comment
    const newComment = {
      id: Math.random().toString(36).substring(2, 11), // Generate a random ID
      postId: post.id,
      author: {
        name: data.author.name,
        avatar: avatar || '/images/authors/default-avatar.jpg',
        isAuthenticated: !!isAuthenticated,
        ...(userId ? { userId } : {}),
        ...(data.author.email ? { email: data.author.email } : {})
      },
      content: data.content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      replyTo: data.replyTo || null
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Comment created successfully',
        data: newComment
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