/**
 * @swagger
 * /api/posts/{slug}/related:
 *   get:
 *     description: Returns related posts for a specific blog post
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
 *           default: 3
 *         description: Maximum number of related posts to return
 *     responses:
 *       200:
 *         description: A list of related posts
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    const { searchParams } = new URL(request.url)
    
    const limit = parseInt(searchParams.get('limit') || '3', 10)
    
    // In a real implementation:
    // 1. Check if the post exists
    // 2. Find posts with similar category, tags, or keywords
    // 3. Order by relevance
    // 4. Apply limit
    
    // Mock posts data
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        excerpt: 'Learn the basics of JavaScript programming',
        coverImage: '/images/posts/javascript-basics.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['javascript', 'webdev', 'programming'],
        publishedAt: '2023-06-15T10:00:00Z',
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg'
        }
      },
      {
        id: '2',
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        excerpt: 'A beginner\'s guide to React JS',
        coverImage: '/images/posts/react-intro.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['react', 'javascript', 'frontend'],
        publishedAt: '2023-06-22T10:00:00Z',
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg'
        }
      },
      {
        id: '3',
        title: 'Building a Mobile App with React Native',
        slug: 'building-mobile-app-react-native',
        excerpt: 'Learn how to build cross-platform mobile apps',
        coverImage: '/images/posts/react-native.jpg',
        category: {
          id: '2',
          name: 'Mobile Development',
          slug: 'mobile-development'
        },
        tags: ['react-native', 'mobile', 'javascript'],
        publishedAt: '2023-07-05T10:00:00Z',
        author: {
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg'
        }
      },
      {
        id: '4',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn how to build applications with Next.js',
        coverImage: '/images/posts/nextjs-intro.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['nextjs', 'react', 'javascript', 'ssg', 'ssr'],
        publishedAt: '2023-07-15T10:00:00Z',
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg'
        }
      },
      {
        id: '5',
        title: 'Introduction to Docker',
        slug: 'introduction-to-docker',
        excerpt: 'Get started with containerization using Docker',
        coverImage: '/images/posts/docker-intro.jpg',
        category: {
          id: '3',
          name: 'DevOps',
          slug: 'devops'
        },
        tags: ['docker', 'devops', 'containers'],
        publishedAt: '2023-08-01T10:00:00Z',
        author: {
          name: 'Sarah Johnson',
          avatar: '/images/authors/sarah-johnson.jpg'
        }
      },
      {
        id: '6',
        title: 'Advanced JavaScript Techniques',
        slug: 'advanced-javascript-techniques',
        excerpt: 'Take your JavaScript skills to the next level',
        coverImage: '/images/posts/advanced-js.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['javascript', 'advanced', 'webdev'],
        publishedAt: '2023-06-28T10:00:00Z',
        author: {
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg'
        }
      }
    ]
    
    // Check if the post exists
    const currentPost = mockPosts.find(post => post.slug === slug)
    if (!currentPost) {
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
    
    // Find related posts (exclude current post)
    const otherPosts = mockPosts.filter(post => post.slug !== slug)
    
    // Calculate relevance score for each post (based on shared category and tags)
    const relatedPosts = otherPosts.map(post => {
      // Points for matching category
      let relevanceScore = post.category.id === currentPost.category.id ? 5 : 0
      
      // Points for matching tags (1 point per matching tag)
      const matchingTags = post.tags.filter(tag => currentPost.tags.includes(tag))
      relevanceScore += matchingTags.length
      
      return {
        ...post,
        relevanceScore,
        matchingTags
      }
    })
    
    // Sort by relevance score (highest first) and limit results
    const sortedRelatedPosts = relatedPosts
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ ...post }) => post) // Remove scoring fields from output
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Related posts fetched successfully',
        data: sortedRelatedPosts
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
        message: 'Failed to fetch related posts',
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