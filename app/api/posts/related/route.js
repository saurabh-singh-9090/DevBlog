/**
 * @swagger
 * /api/posts/related:
 *   get:
 *     description: Get related posts based on a current post
 *     parameters:
 *       - in: query
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the current post
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 3
 *         description: Maximum number of related posts to return
 *       - in: query
 *         name: algorithm
 *         schema:
 *           type: string
 *           enum: [tag, category, mixed]
 *           default: mixed
 *         description: Algorithm to use for finding related posts
 *     responses:
 *       200:
 *         description: Related posts retrieved successfully
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
    const limit = parseInt(searchParams.get('limit') || '3', 10)
    const algorithm = searchParams.get('algorithm') || 'mixed'
    
    // Validate postId
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
    
    // Validate algorithm
    const validAlgorithms = ['tag', 'category', 'mixed']
    if (!validAlgorithms.includes(algorithm)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid algorithm. Valid options are: ${validAlgorithms.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock post data with categories and tags
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn how to set up a new Next.js project and start building your first application.',
        publishedAt: '2023-06-15T10:00:00Z',
        category: { id: 'cat_1', name: 'Tutorials', slug: 'tutorials' },
        tags: [
          { id: 'tag_1', name: 'Next.js', slug: 'nextjs' },
          { id: 'tag_2', name: 'React', slug: 'react' },
          { id: 'tag_3', name: 'JavaScript', slug: 'javascript' }
        ],
        author: { id: 'author_1', name: 'Jane Doe' },
        featuredImage: 'https://example.com/images/nextjs-intro.jpg'
      },
      {
        id: 'post_2',
        title: 'Understanding React Hooks',
        slug: 'understanding-react-hooks',
        excerpt: 'Dive into React Hooks and learn how they can simplify your functional components.',
        publishedAt: '2023-06-22T09:15:00Z',
        category: { id: 'cat_1', name: 'Tutorials', slug: 'tutorials' },
        tags: [
          { id: 'tag_2', name: 'React', slug: 'react' },
          { id: 'tag_3', name: 'JavaScript', slug: 'javascript' },
          { id: 'tag_4', name: 'Hooks', slug: 'hooks' }
        ],
        author: { id: 'author_2', name: 'John Smith' },
        featuredImage: 'https://example.com/images/react-hooks.jpg'
      },
      {
        id: 'post_3',
        title: 'Building a Blog with Next.js',
        slug: 'building-a-blog-with-nextjs',
        excerpt: 'Step-by-step guide to creating a full-featured blog using Next.js, MDX, and Tailwind CSS.',
        publishedAt: '2023-07-01T11:30:00Z',
        category: { id: 'cat_2', name: 'Guides', slug: 'guides' },
        tags: [
          { id: 'tag_1', name: 'Next.js', slug: 'nextjs' },
          { id: 'tag_5', name: 'MDX', slug: 'mdx' },
          { id: 'tag_6', name: 'Tailwind CSS', slug: 'tailwind-css' },
          { id: 'tag_7', name: 'Blog', slug: 'blog' }
        ],
        author: { id: 'author_1', name: 'Jane Doe' },
        featuredImage: 'https://example.com/images/nextjs-blog.jpg'
      },
      {
        id: 'post_4',
        title: 'Advanced CSS Techniques',
        slug: 'advanced-css-techniques',
        excerpt: 'Explore advanced CSS techniques that will take your web design skills to the next level.',
        publishedAt: '2023-07-10T13:20:00Z',
        category: { id: 'cat_3', name: 'Best Practices', slug: 'best-practices' },
        tags: [
          { id: 'tag_8', name: 'CSS', slug: 'css' },
          { id: 'tag_9', name: 'Web Design', slug: 'web-design' },
          { id: 'tag_10', name: 'Frontend', slug: 'frontend' }
        ],
        author: { id: 'author_3', name: 'Alex Johnson' },
        featuredImage: 'https://example.com/images/advanced-css.jpg'
      },
      {
        id: 'post_5',
        title: 'JavaScript Best Practices',
        slug: 'javascript-best-practices',
        excerpt: 'Learn the best practices for writing clean, efficient, and maintainable JavaScript code.',
        publishedAt: '2023-07-18T08:45:00Z',
        category: { id: 'cat_3', name: 'Best Practices', slug: 'best-practices' },
        tags: [
          { id: 'tag_3', name: 'JavaScript', slug: 'javascript' },
          { id: 'tag_11', name: 'Clean Code', slug: 'clean-code' },
          { id: 'tag_12', name: 'Performance', slug: 'performance' }
        ],
        author: { id: 'author_2', name: 'John Smith' },
        featuredImage: 'https://example.com/images/js-best-practices.jpg'
      },
      {
        id: 'post_6',
        title: 'Introduction to TypeScript',
        slug: 'introduction-to-typescript',
        excerpt: 'Learn the basics of TypeScript and how it improves JavaScript development.',
        publishedAt: '2023-07-25T14:00:00Z',
        category: { id: 'cat_1', name: 'Tutorials', slug: 'tutorials' },
        tags: [
          { id: 'tag_13', name: 'TypeScript', slug: 'typescript' },
          { id: 'tag_3', name: 'JavaScript', slug: 'javascript' },
          { id: 'tag_14', name: 'Static Typing', slug: 'static-typing' }
        ],
        author: { id: 'author_1', name: 'Jane Doe' },
        featuredImage: 'https://example.com/images/typescript-intro.jpg'
      },
      {
        id: 'post_7',
        title: 'React Performance Optimization',
        slug: 'react-performance-optimization',
        excerpt: 'Learn strategies and techniques to optimize React applications for better performance.',
        publishedAt: '2023-08-02T09:30:00Z',
        category: { id: 'cat_3', name: 'Best Practices', slug: 'best-practices' },
        tags: [
          { id: 'tag_2', name: 'React', slug: 'react' },
          { id: 'tag_12', name: 'Performance', slug: 'performance' },
          { id: 'tag_15', name: 'Optimization', slug: 'optimization' }
        ],
        author: { id: 'author_2', name: 'John Smith' },
        featuredImage: 'https://example.com/images/react-performance.jpg'
      }
    ]
    
    // Find the current post
    const currentPost = mockPosts.find(post => post.id === postId)
    
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
    
    // Get related posts based on the selected algorithm
    let relatedPosts = []
    
    if (algorithm === 'tag' || algorithm === 'mixed') {
      // Get related posts by tags
      const currentTags = currentPost.tags.map(tag => tag.id)
      
      // Calculate tag relevance score for each post
      const tagRelatedPosts = mockPosts
        .filter(post => post.id !== currentPost.id) // Exclude current post
        .map(post => {
          const postTags = post.tags.map(tag => tag.id)
          const commonTags = postTags.filter(tagId => currentTags.includes(tagId))
          
          return {
            ...post,
            relevanceScore: commonTags.length / Math.max(currentTags.length, postTags.length),
            commonTagsCount: commonTags.length
          }
        })
        .filter(post => post.commonTagsCount > 0) // Only include posts with at least one common tag
        .sort((a, b) => b.relevanceScore - a.relevanceScore) // Sort by relevance
        
      if (algorithm === 'tag') {
        relatedPosts = tagRelatedPosts.slice(0, limit)
      } else {
        // For mixed algorithm, we'll store these posts for later merging
        relatedPosts = tagRelatedPosts
      }
    }
    
    if (algorithm === 'category' || algorithm === 'mixed') {
      // Get related posts by category
      const categoryRelatedPosts = mockPosts
        .filter(post => 
          post.id !== currentPost.id && // Exclude current post
          post.category.id === currentPost.category.id // Same category
        )
        .map(post => ({
          ...post,
          relevanceScore: 0.5, // Base score for category match
          commonTagsCount: 0
        }))
      
      if (algorithm === 'category') {
        relatedPosts = categoryRelatedPosts.slice(0, limit)
      } else {
        // For mixed algorithm, merge with tag-related posts
        // First, add any category-related posts that aren't already in the list
        const existingIds = new Set(relatedPosts.map(post => post.id))
        const newCategoryPosts = categoryRelatedPosts.filter(post => !existingIds.has(post.id))
        
        // Combine and sort
        relatedPosts = [...relatedPosts, ...newCategoryPosts]
          .sort((a, b) => {
            // First sort by relevance score
            if (b.relevanceScore !== a.relevanceScore) {
              return b.relevanceScore - a.relevanceScore
            }
            // Then by publication date (newer first)
            return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
          })
      }
    }
    
    // Take only the required number of posts
    relatedPosts = relatedPosts.slice(0, limit)
    
    // Remove the scoring properties before returning
    const cleanedPosts = relatedPosts.map(post => {
      // Create a new object without the scoring properties
      const cleanPost = { ...post }
      delete cleanPost.relevanceScore
      delete cleanPost.commonTagsCount
      return cleanPost
    })
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Related posts retrieved successfully',
        data: {
          relatedPosts: cleanedPosts,
          algorithm,
          currentPost: {
            id: currentPost.id,
            title: currentPost.title,
            slug: currentPost.slug
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
        message: 'Failed to retrieve related posts',
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