/**
 * @swagger
 * /api/posts:
 *   get:
 *     description: Get a list of blog posts with filtering, sorting, and pagination
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [published, draft, scheduled, all]
 *           default: published
 *         description: Filter posts by status
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search term to filter posts by title or content
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter posts by author ID
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter posts by category ID
 *       - in: query
 *         name: tag
 *         schema:
 *           type: string
 *         description: Filter posts by tag ID
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [latest, oldest, title, popular]
 *           default: latest
 *         description: Sort order for posts
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of posts to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of posts to skip
 *     responses:
 *       200:
 *         description: Posts retrieved successfully
 *       500:
 *         description: Server error
 *   post:
 *     description: Create a new blog post (authenticated users only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - excerpt
 *               - categoryId
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
 *                 default: draft
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
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'published'
    const search = searchParams.get('search') || ''
    const authorId = searchParams.get('author') || ''
    const categoryId = searchParams.get('category') || ''
    const tagId = searchParams.get('tag') || ''
    const sort = searchParams.get('sort') || 'latest'
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    
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
      },
      {
        id: 'author_3',
        name: 'Alex Johnson',
        email: 'alex@example.com',
        bio: 'DevOps engineer and cloud specialist',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    ]
    
    // Mock categories data
    const mockCategories = [
      {
        id: 'cat_1',
        name: 'Tutorials',
        slug: 'tutorials'
      },
      {
        id: 'cat_2',
        name: 'Guides',
        slug: 'guides'
      },
      {
        id: 'cat_3',
        name: 'Best Practices',
        slug: 'best-practices'
      },
      {
        id: 'cat_4',
        name: 'React',
        slug: 'react',
        parentId: 'cat_1'
      },
      {
        id: 'cat_5',
        name: 'Next.js',
        slug: 'nextjs',
        parentId: 'cat_1'
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
      },
      {
        id: 'tag_4',
        name: 'CSS',
        slug: 'css'
      },
      {
        id: 'tag_5',
        name: 'Performance',
        slug: 'performance'
      },
      {
        id: 'tag_6',
        name: 'TypeScript',
        slug: 'typescript'
      }
    ]
    
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
        content: '<p>React Hooks were introduced in React 16.8 and have revolutionized the way we write components...</p>',
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
      },
      {
        id: 'post_3',
        title: 'Advanced CSS Grid Layouts',
        slug: 'advanced-css-grid-layouts',
        excerpt: 'How to create complex layouts using CSS Grid',
        content: '<p>CSS Grid has transformed the way we handle layout in web development...</p>',
        featuredImage: 'https://example.com/images/css-grid.jpg',
        status: 'published',
        authorId: 'author_2',
        categoryId: 'cat_2',
        tagIds: ['tag_4'],
        viewCount: 750,
        likeCount: 28,
        commentCount: 5,
        publishedAt: '2023-07-05T10:15:00Z',
        createdAt: '2023-07-01T09:10:00Z',
        updatedAt: '2023-07-04T13:45:00Z'
      },
      {
        id: 'post_4',
        title: 'Building Server Components in Next.js',
        slug: 'building-server-components-in-nextjs',
        excerpt: 'Learn how to use the new server components feature in Next.js',
        content: '<p>Server Components are a new feature in React and Next.js that allows for improved performance...</p>',
        featuredImage: 'https://example.com/images/server-components.jpg',
        status: 'scheduled',
        authorId: 'author_3',
        categoryId: 'cat_5',
        tagIds: ['tag_2', 'tag_3', 'tag_5'],
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        publishedAt: '2023-08-15T11:45:00Z',
        createdAt: '2023-07-20T14:30:00Z',
        updatedAt: '2023-07-22T16:10:00Z'
      },
      {
        id: 'post_5',
        title: 'JavaScript Performance Optimization',
        slug: 'javascript-performance-optimization',
        excerpt: 'Techniques to improve the performance of your JavaScript code',
        content: '<p>Performance optimization is crucial for providing a great user experience...</p>',
        featuredImage: 'https://example.com/images/js-performance.jpg',
        status: 'published',
        authorId: 'author_3',
        categoryId: 'cat_3',
        tagIds: ['tag_1', 'tag_5'],
        viewCount: 620,
        likeCount: 24,
        commentCount: 3,
        publishedAt: '2023-07-18T13:25:00Z',
        createdAt: '2023-07-15T10:20:00Z',
        updatedAt: '2023-07-17T15:40:00Z'
      },
      {
        id: 'post_6',
        title: 'Introduction to TypeScript with React',
        slug: 'introduction-to-typescript-with-react',
        excerpt: 'How to use TypeScript in your React applications',
        content: '<p>TypeScript adds strong typing to JavaScript, making your code more robust and maintainable...</p>',
        featuredImage: 'https://example.com/images/typescript-react.jpg',
        status: 'draft',
        authorId: 'author_1',
        categoryId: 'cat_4',
        tagIds: ['tag_1', 'tag_2', 'tag_6'],
        viewCount: 0,
        likeCount: 0,
        commentCount: 0,
        publishedAt: null,
        createdAt: '2023-07-22T09:15:00Z',
        updatedAt: '2023-07-22T15:30:00Z'
      }
    ]
    
    // Filter posts
    let filteredPosts = [...mockPosts]
    
    // Filter by status
    if (status !== 'all') {
      filteredPosts = filteredPosts.filter(post => post.status === status)
    }
    
    // Filter by search term
    if (search) {
      const searchLower = search.toLowerCase()
      filteredPosts = filteredPosts.filter(post => 
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower) || 
        post.content.toLowerCase().includes(searchLower)
      )
    }
    
    // Filter by author
    if (authorId) {
      filteredPosts = filteredPosts.filter(post => post.authorId === authorId)
    }
    
    // Filter by category (including child categories)
    if (categoryId) {
      const childCategoryIds = mockCategories
        .filter(cat => cat.parentId === categoryId)
        .map(cat => cat.id)
      
      filteredPosts = filteredPosts.filter(post => 
        post.categoryId === categoryId || childCategoryIds.includes(post.categoryId)
      )
    }
    
    // Filter by tag
    if (tagId) {
      filteredPosts = filteredPosts.filter(post => post.tagIds.includes(tagId))
    }
    
    // Sort posts
    switch (sort) {
      case 'oldest':
        filteredPosts.sort((a, b) => new Date(a.publishedAt || a.createdAt) - new Date(b.publishedAt || b.createdAt))
        break
      case 'title':
        filteredPosts.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'popular':
        filteredPosts.sort((a, b) => b.viewCount - a.viewCount)
        break
      case 'latest':
      default:
        filteredPosts.sort((a, b) => new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt))
        break
    }
    
    // Apply pagination
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)
    
    // Enhance posts with additional data (author, category, tags)
    const enhancedPosts = paginatedPosts.map(post => {
      const author = mockAuthors.find(author => author.id === post.authorId)
      const category = mockCategories.find(cat => cat.id === post.categoryId)
      const tags = mockTags.filter(tag => post.tagIds.includes(tag.id))
      
      return {
        ...post,
        author: author ? { 
          id: author.id, 
          name: author.name, 
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
        })),
        content: undefined // Don't include full content in list view
      }
    })
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Posts retrieved successfully',
        data: {
          posts: enhancedPosts,
          pagination: {
            total: filteredPosts.length,
            limit,
            offset,
            hasMore: offset + limit < filteredPosts.length
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
        message: 'Failed to retrieve posts',
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
    
    // In a real app, verify the token and get the user ID
    const userData = {
      id: 'author_1',
      name: 'John Doe',
      email: 'john@example.com',
      isAdmin: true
    }
    
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'content', 'excerpt', 'categoryId']
    const missingFields = requiredFields.filter(field => !data[field] || data[field].trim() === '')
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate status
    const validStatuses = ['published', 'draft', 'scheduled']
    const status = data.status || 'draft'
    
    if (!validStatuses.includes(status)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid status: ${status}. Must be one of: ${validStatuses.join(', ')}`
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
    if (status === 'scheduled' && !data.publishedAt) {
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
    
    // Mock categories data for validation
    const mockCategories = [
      { id: 'cat_1', name: 'Tutorials' },
      { id: 'cat_2', name: 'Guides' },
      { id: 'cat_3', name: 'Best Practices' },
      { id: 'cat_4', name: 'React', parentId: 'cat_1' },
      { id: 'cat_5', name: 'Next.js', parentId: 'cat_1' }
    ]
    
    // Validate category exists
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
    
    // Mock tags data for validation
    const mockTags = [
      { id: 'tag_1', name: 'JavaScript' },
      { id: 'tag_2', name: 'React' },
      { id: 'tag_3', name: 'Next.js' },
      { id: 'tag_4', name: 'CSS' },
      { id: 'tag_5', name: 'Performance' },
      { id: 'tag_6', name: 'TypeScript' }
    ]
    
    // Validate tags exist
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
    
    // Generate slug from title
    const slug = data.title.toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-')     // Replace spaces with hyphens
      .replace(/-+/g, '-')      // Replace multiple hyphens with a single hyphen
    
    // Check if slug already exists
    const existingSlugs = ['getting-started-with-nextjs', 'react-hooks-in-depth', 'advanced-css-grid-layouts']
    
    if (existingSlugs.includes(slug)) {
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
    
    // Create the new post
    const now = new Date().toISOString()
    
    const newPost = {
      id: 'post_' + Math.random().toString(36).substring(2, 6),
      title: data.title.trim(),
      slug,
      excerpt: data.excerpt.trim(),
      content: data.content.trim(),
      featuredImage: data.featuredImage || null,
      status,
      authorId: userData.id,
      categoryId: data.categoryId,
      tagIds: data.tagIds || [],
      viewCount: 0,
      likeCount: 0,
      commentCount: 0,
      publishedAt: status === 'published' ? now : (status === 'scheduled' ? data.publishedAt : null),
      createdAt: now,
      updatedAt: now
    }
    
    // In a real app, save the post to the database
    
    // Get author, category, and tags for the response
    const author = {
      id: userData.id,
      name: userData.name
    }
    
    const category = mockCategories.find(cat => cat.id === data.categoryId)
    const tags = data.tagIds 
      ? mockTags.filter(tag => data.tagIds.includes(tag.id))
      : []
    
    // Prepare the response
    const responsePost = {
      ...newPost,
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
        message: 'Post created successfully',
        data: {
          post: responsePost
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
        message: 'Failed to create post',
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