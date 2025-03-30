/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     description: Get a specific blog post by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post retrieved successfully
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   put:
 *     description: Update a blog post (author or admin only)
 *     security:
 *       - bearerAuth: []
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
 *               title:
 *                 type: string
 *                 description: Post title
 *               content:
 *                 type: string
 *                 description: Post content in HTML or Markdown
 *               excerpt:
 *                 type: string
 *                 description: Short excerpt or summary of the post
 *               featuredImage:
 *                 type: string
 *                 description: URL of the featured image
 *               status:
 *                 type: string
 *                 enum: [published, draft, scheduled]
 *                 description: Publication status
 *               categoryId:
 *                 type: string
 *                 description: ID of the primary category
 *               tagIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag IDs
 *               publishedAt:
 *                 type: string
 *                 format: date-time
 *                 description: Publication date and time (required for scheduled posts)
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   delete:
 *     description: Delete a blog post (author or admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Post ID
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */

export async function GET(request, { params }) {
  try {
    const postId = params.id
    
    // Mock posts data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn the basics of Next.js and how to set up your first project',
        content: '<p>Next.js is a powerful React framework that makes building web applications easier...</p><p>In this tutorial, we\'ll cover the fundamentals of Next.js and build a simple blog application from scratch. By the end, you\'ll have a solid understanding of the framework\'s core features including routing, data fetching, and static site generation.</p>',
        featuredImage: 'https://example.com/images/nextjs-intro.jpg',
        status: 'published',
        authorId: 'author_1',
        categoryId: 'cat_5',
        tagIds: ['tag_2', 'tag_3'],
        viewCount: 1250,
        likeCount: 42,
        commentCount: 8,
        publishedAt: '2023-07-15T09:30:00Z',
        createdAt: '2023-07-10T08:45:00Z',
        updatedAt: '2023-07-14T16:20:00Z'
      },
      {
        id: 'post_2',
        title: 'React Hooks in Depth',
        slug: 'react-hooks-in-depth',
        excerpt: 'A comprehensive guide to React hooks and how to use them effectively',
        content: '<p>React Hooks were introduced in React 16.8 and have revolutionized the way we write components...</p><p>This article dives deep into the most commonly used hooks, including useState, useEffect, useContext, and useReducer. We\'ll also cover custom hooks and best practices for optimal performance.</p>',
        featuredImage: 'https://example.com/images/react-hooks.jpg',
        status: 'published',
        authorId: 'author_1',
        categoryId: 'cat_4',
        tagIds: ['tag_1', 'tag_2'],
        viewCount: 980,
        likeCount: 35,
        commentCount: 12,
        publishedAt: '2023-07-10T14:20:00Z',
        createdAt: '2023-07-05T11:30:00Z',
        updatedAt: '2023-07-09T17:15:00Z'
      }
    ]
    
    // Find the requested post
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
    
    // Update view count (in a real app, this would be tracked separately)
    const updatedPost = { ...post, viewCount: post.viewCount + 1 }
    
    // Mock authors data
    const mockAuthors = [
      {
        id: 'author_1',
        name: 'John Doe',
        email: 'john@example.com',
        bio: 'Senior developer and tech blogger',
        avatar: 'https://i.pravatar.cc/150?img=1'
      },
      {
        id: 'author_2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        bio: 'UX designer and front-end developer',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    ]
    
    // Mock categories data
    const mockCategories = [
      {
        id: 'cat_4',
        name: 'React',
        slug: 'react'
      },
      {
        id: 'cat_5',
        name: 'Next.js',
        slug: 'nextjs'
      }
    ]
    
    // Mock tags data
    const mockTags = [
      {
        id: 'tag_1',
        name: 'JavaScript',
        slug: 'javascript'
      },
      {
        id: 'tag_2',
        name: 'React',
        slug: 'react'
      },
      {
        id: 'tag_3',
        name: 'Next.js',
        slug: 'nextjs'
      }
    ]
    
    // Get author, category, and tags for the response
    const author = mockAuthors.find(author => author.id === updatedPost.authorId)
    const category = mockCategories.find(cat => cat.id === updatedPost.categoryId)
    const tags = mockTags.filter(tag => updatedPost.tagIds.includes(tag.id))
    
    // Prepare the response
    const responsePost = {
      ...updatedPost,
      author: author ? {
        id: author.id,
        name: author.name,
        bio: author.bio,
        avatar: author.avatar
      } : null,
      category: category ? {
        id: category.id,
        name: category.name,
        slug: category.slug
      } : null,
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name,
        slug: tag.slug
      }))
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post retrieved successfully',
        data: {
          post: responsePost
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
        message: 'Failed to retrieve post',
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
    const postId = params.id
    
    // Check authentication (in a real app, verify bearer token)
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
    
    // In a real app, verify the token and get the user data
    const userData = {
      id: 'author_1',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: true
    }
    
    // Mock posts data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn the basics of Next.js and how to set up your first project',
        content: '<p>Next.js is a powerful React framework that makes building web applications easier...</p>',
        featuredImage: 'https://example.com/images/nextjs-intro.jpg',
        status: 'published',
        authorId: 'author_1',
        categoryId: 'cat_5',
        tagIds: ['tag_2', 'tag_3'],
        publishedAt: '2023-07-15T09:30:00Z',
        createdAt: '2023-07-10T08:45:00Z',
        updatedAt: '2023-07-14T16:20:00Z'
      },
      {
        id: 'post_2',
        title: 'React Hooks in Depth',
        slug: 'react-hooks-in-depth',
        excerpt: 'A comprehensive guide to React hooks and how to use them effectively',
        content: '<p>React Hooks were introduced in React 16.8 and have revolutionized the way we write components...</p>',
        featuredImage: 'https://example.com/images/react-hooks.jpg',
        status: 'published',
        authorId: 'author_2',
        categoryId: 'cat_4',
        tagIds: ['tag_1', 'tag_2'],
        publishedAt: '2023-07-10T14:20:00Z',
        createdAt: '2023-07-05T11:30:00Z',
        updatedAt: '2023-07-09T17:15:00Z'
      }
    ]
    
    // Find the post to update
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
    
    const post = mockPosts[postIndex]
    
    // Check if user is the author or an admin
    if (post.authorId !== userData.id && !userData.isAdmin) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You do not have permission to update this post'
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
    
    // Validate status if provided
    if (data.status) {
      const validStatuses = ['published', 'draft', 'scheduled']
      
      if (!validStatuses.includes(data.status)) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Invalid status: ${data.status}. Must be one of: ${validStatuses.join(', ')}`
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
      
      // Validate scheduled post has publishedAt date
      if (data.status === 'scheduled' && !data.publishedAt && !post.publishedAt) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Scheduled posts must include a publishedAt date'
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
    
    // Mock categories data for validation
    const mockCategories = [
      { id: 'cat_1', name: 'Tutorials' },
      { id: 'cat_2', name: 'Guides' },
      { id: 'cat_3', name: 'Best Practices' },
      { id: 'cat_4', name: 'React', parentId: 'cat_1' },
      { id: 'cat_5', name: 'Next.js', parentId: 'cat_1' }
    ]
    
    // Validate category if provided
    if (data.categoryId) {
      const categoryExists = mockCategories.some(cat => cat.id === data.categoryId)
      
      if (!categoryExists) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'Invalid category ID'
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
    
    // Mock tags data for validation
    const mockTags = [
      { id: 'tag_1', name: 'JavaScript' },
      { id: 'tag_2', name: 'React' },
      { id: 'tag_3', name: 'Next.js' },
      { id: 'tag_4', name: 'CSS' },
      { id: 'tag_5', name: 'Performance' },
      { id: 'tag_6', name: 'TypeScript' }
    ]
    
    // Validate tags if provided
    if (data.tagIds && Array.isArray(data.tagIds) && data.tagIds.length > 0) {
      const invalidTags = data.tagIds.filter(tagId => !mockTags.some(tag => tag.id === tagId))
      
      if (invalidTags.length > 0) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `Invalid tag IDs: ${invalidTags.join(', ')}`
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
    
    // Check if title is being updated and generate new slug if needed
    let slug = post.slug
    
    if (data.title && data.title !== post.title) {
      slug = data.title.toLowerCase()
        .replace(/[^\w\s-]/g, '') // Remove special characters
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
      
      // Check if slug already exists for another post
      const slugExists = mockPosts.some(p => p.id !== post.id && p.slug === slug)
      
      if (slugExists) {
        return new Response(
          JSON.stringify({
            success: false,
            message: 'A post with this title already exists'
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
    
    // Update the post
    const now = new Date().toISOString()
    
    const updatedPost = {
      ...post,
      title: data.title !== undefined ? data.title.trim() : post.title,
      slug,
      excerpt: data.excerpt !== undefined ? data.excerpt.trim() : post.excerpt,
      content: data.content !== undefined ? data.content.trim() : post.content,
      featuredImage: data.featuredImage !== undefined ? data.featuredImage : post.featuredImage,
      status: data.status || post.status,
      categoryId: data.categoryId || post.categoryId,
      tagIds: data.tagIds || post.tagIds,
      publishedAt: data.publishedAt || post.publishedAt,
      updatedAt: now
    }
    
    // Update publishedAt if status changed to published
    if (data.status === 'published' && post.status !== 'published') {
      updatedPost.publishedAt = now
    }
    
    // In a real app, save the post to the database
    
    // Get author, category, and tags for the response
    const author = {
      id: userData.id,
      name: userData.name
    }
    
    const category = mockCategories.find(cat => cat.id === updatedPost.categoryId)
    const tags = mockTags.filter(tag => updatedPost.tagIds.includes(tag.id))
    
    // Prepare the response
    const responsePost = {
      ...updatedPost,
      author,
      category: {
        id: category.id,
        name: category.name
      },
      tags: tags.map(tag => ({
        id: tag.id,
        name: tag.name
      })),
      content: undefined // Don't include full content in response
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post updated successfully',
        data: {
          post: responsePost
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
        message: 'Failed to update post',
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
    const postId = params.id
    
    // Check authentication (in a real app, verify bearer token)
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
    
    // In a real app, verify the token and get the user data
    const userData = {
      id: 'author_1',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: true
    }
    
    // Mock posts data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        authorId: 'author_1'
      },
      {
        id: 'post_2',
        title: 'React Hooks in Depth',
        authorId: 'author_2'
      }
    ]
    
    // Find the post to delete
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
    
    const post = mockPosts[postIndex]
    
    // Check if user is the author or an admin
    if (post.authorId !== userData.id && !userData.isAdmin) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You do not have permission to delete this post'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real app, delete the post and related data from the database
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post deleted successfully'
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
        message: 'Failed to delete post',
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