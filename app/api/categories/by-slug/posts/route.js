/**
 * @swagger
 * /api/categories/{slug}/posts:
 *   get:
 *     description: Returns all posts in a specific category
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the category
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
 *         description: A list of posts in the specified category
 *       404:
 *         description: Category not found
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
    // 1. Check if the category exists
    // 2. Fetch posts in this category from the database
    
    // Mock list of categories
    const mockCategories = [
      { id: '1', name: 'Web Development', slug: 'web-development', count: 15, description: 'Articles about web development technologies and trends' },
      { id: '2', name: 'Mobile Development', slug: 'mobile-development', count: 8, description: 'Resources for mobile app development' },
      { id: '3', name: 'DevOps', slug: 'devops', count: 6, description: 'Topics on DevOps practices and tools' },
      { id: '4', name: 'Cloud Computing', slug: 'cloud-computing', count: 10, description: 'Cloud platforms and services' },
      { id: '5', name: 'Machine Learning', slug: 'machine-learning', count: 12, description: 'Articles on machine learning and AI' },
      { id: '6', name: 'Cybersecurity', slug: 'cybersecurity', count: 9, description: 'Security best practices and news' }
    ]
    
    // Check if the category exists
    const category = mockCategories.find(category => category.slug === slug)
    if (!category) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Category not found'
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
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
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
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        excerpt: 'A beginner\'s guide to React JS',
        content: 'React is a JavaScript library for building user interfaces. It allows you to compose complex UIs from small and isolated pieces of code called "components"...',
        coverImage: '/images/posts/react-intro.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
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
        title: 'Building a Mobile App with React Native',
        slug: 'building-mobile-app-react-native',
        excerpt: 'Learn how to build cross-platform mobile apps',
        content: 'React Native lets you create truly native apps and doesn\'t compromise your users\' experiences...',
        coverImage: '/images/posts/react-native.jpg',
        category: {
          id: '2',
          name: 'Mobile Development',
          slug: 'mobile-development'
        },
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
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
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
        title: 'Introduction to Docker',
        slug: 'introduction-to-docker',
        excerpt: 'Get started with containerization using Docker',
        content: 'Docker is a platform that enables developers to automate the deployment of applications inside containers...',
        coverImage: '/images/posts/docker-intro.jpg',
        category: {
          id: '3',
          name: 'DevOps',
          slug: 'devops'
        },
        author: {
          name: 'Sarah Johnson',
          avatar: '/images/authors/sarah-johnson.jpg'
        },
        publishedAt: '2023-08-01T10:00:00Z',
        viewCount: 1800,
        likeCount: 62
      }
    ]
    
    // Filter posts by category
    const postsInCategory = mockPosts.filter(post => post.category.slug === slug)
    
    // Sort posts
    const sortedPosts = [...postsInCategory].sort((a, b) => {
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
          category,
          posts: paginatedPosts,
          pagination: {
            total: postsInCategory.length,
            limit,
            offset,
            hasMore: offset + limit < postsInCategory.length
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