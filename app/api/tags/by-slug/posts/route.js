/**
 * @swagger
 * /api/tags/{slug}/posts:
 *   get:
 *     description: Returns all posts with a specific tag
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the tag
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
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, popular]
 *           default: newest
 *         description: Sort order for posts
 *     responses:
 *       200:
 *         description: A list of posts with the specified tag
 *       404:
 *         description: Tag not found
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
    // 1. Check if the tag exists
    // 2. Fetch posts with this tag from the database
    
    // Mock list of tags
    const mockTags = [
      { id: '1', name: 'JavaScript', slug: 'javascript', count: 15 },
      { id: '2', name: 'React', slug: 'react', count: 12 },
      { id: '3', name: 'Next.js', slug: 'nextjs', count: 8 },
      { id: '4', name: 'CSS', slug: 'css', count: 7 },
      { id: '5', name: 'HTML', slug: 'html', count: 5 },
      { id: '6', name: 'TypeScript', slug: 'typescript', count: 5 }
    ]
    
    // Check if the tag exists
    const tag = mockTags.find(tag => tag.slug === slug)
    if (!tag) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Tag not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock posts data
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        excerpt: 'Learn the basics of JavaScript programming',
        content: 'JavaScript is a programming language used to create interactive effects within web browsers...',
        coverImage: '/images/posts/javascript-basics.jpg',
        tags: ['javascript', 'webdev'],
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg'
        },
        publishedAt: '2023-06-15T10:00:00Z',
        viewCount: 1250,
        likeCount: 42
      },
      {
        id: '2',
        title: 'Advanced JavaScript Concepts',
        slug: 'advanced-javascript-concepts',
        excerpt: 'Dive deeper into JavaScript with advanced concepts',
        content: 'Explore closures, prototypes, and the event loop...',
        coverImage: '/images/posts/advanced-js.jpg',
        tags: ['javascript', 'advanced'],
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg'
        },
        publishedAt: '2023-06-22T10:00:00Z',
        viewCount: 980,
        likeCount: 35
      },
      {
        id: '3',
        title: 'Building React Components',
        slug: 'building-react-components',
        excerpt: 'Learn how to build reusable React components',
        content: 'React components allow you to split the UI into independent, reusable pieces...',
        coverImage: '/images/posts/react-components.jpg',
        tags: ['react', 'javascript', 'webdev'],
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg'
        },
        publishedAt: '2023-07-05T10:00:00Z',
        viewCount: 1500,
        likeCount: 56
      },
      {
        id: '4',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn how to build applications with Next.js',
        content: 'Next.js is a React framework that enables server-side rendering and static site generation...',
        coverImage: '/images/posts/nextjs-intro.jpg',
        tags: ['nextjs', 'react', 'javascript'],
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg'
        },
        publishedAt: '2023-07-15T10:00:00Z',
        viewCount: 2100,
        likeCount: 75
      },
      {
        id: '5',
        title: 'CSS Grid Layout',
        slug: 'css-grid-layout',
        excerpt: 'Master CSS Grid for modern web layouts',
        content: 'CSS Grid Layout is a two-dimensional layout system designed for user interface design...',
        coverImage: '/images/posts/css-grid.jpg',
        tags: ['css', 'webdev'],
        author: {
          name: 'Sarah Johnson',
          avatar: '/images/authors/sarah-johnson.jpg'
        },
        publishedAt: '2023-08-01T10:00:00Z',
        viewCount: 1800,
        likeCount: 62
      }
    ]
    
    // Filter posts by tag
    const postsWithTag = mockPosts.filter(post => post.tags.includes(slug))
    
    // Sort posts
    const sortedPosts = [...postsWithTag].sort((a, b) => {
      if (sort === 'newest') {
        return new Date(b.publishedAt) - new Date(a.publishedAt)
      }
      if (sort === 'popular') {
        return b.viewCount - a.viewCount
      }
      return 0
    })
    
    // Apply pagination
    const paginatedPosts = sortedPosts.slice(offset, offset + limit)
    
    // Return the response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Posts fetched successfully',
        data: {
          tag,
          posts: paginatedPosts,
          pagination: {
            total: postsWithTag.length,
            limit,
            offset,
            hasMore: offset + limit < postsWithTag.length
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
        message: 'Failed to fetch posts',
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