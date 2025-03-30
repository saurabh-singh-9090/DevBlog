/**
 * @swagger
 * /api/search:
 *   get:
 *     description: Search blog posts by query, tags, and other criteria
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Search query text
 *       - in: query
 *         name: tags
 *         schema:
 *           type: string
 *         description: Comma-separated list of tag slugs to filter by
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Category slug to filter by
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Author ID to filter by
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Maximum number of results to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Number of results to skip
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [date_desc, date_asc, relevance]
 *           default: relevance
 *         description: Sort order for results
 *     responses:
 *       200:
 *         description: Search results retrieved successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q') || ''
    const tagsParam = searchParams.get('tags')
    const category = searchParams.get('category')
    const author = searchParams.get('author')
    const limit = parseInt(searchParams.get('limit') || '10', 10)
    const offset = parseInt(searchParams.get('offset') || '0', 10)
    const sort = searchParams.get('sort') || 'relevance'
    
    // Parse tags from comma-separated string
    const tags = tagsParam ? tagsParam.split(',').map(tag => tag.trim()).filter(Boolean) : []
    
    // Validate sort parameter
    const validSorts = ['date_desc', 'date_asc', 'relevance']
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
    
    // Mock post data
    const mockPosts = [
      {
        id: 'post_1',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn how to set up a new Next.js project and start building your first application.',
        content: 'Next.js is a React framework that provides a structure for server-side rendering, routing, and more. In this tutorial, we\'ll walk through setting up a basic Next.js application from scratch.',
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
        content: 'React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. This article explores the most commonly used hooks like useState, useEffect, and useContext.',
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
        content: 'Creating a blog with Next.js offers many advantages like static site generation and easy API routes. In this comprehensive guide, we\'ll build a modern blog using Next.js for the framework, MDX for content management, and Tailwind CSS for styling.',
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
        content: 'CSS has evolved significantly in recent years with features like Grid, Custom Properties, and advanced animations. This article demonstrates practical applications of these modern CSS features to create stunning designs.',
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
        content: 'Writing high-quality JavaScript involves more than just making things work. This guide covers naming conventions, code organization, performance optimization, and modern ES6+ features to write cleaner and more maintainable JavaScript code.',
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
        content: 'TypeScript is a superset of JavaScript that adds static typing and other features to enhance developer productivity and code quality. This tutorial introduces the core concepts of TypeScript including types, interfaces, and how to integrate it into your projects.',
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
        content: 'Performance optimization is crucial for creating responsive React applications. This article covers key techniques like memoization, code splitting, virtualization, and proper state management to significantly improve your React app\'s performance.',
        publishedAt: '2023-08-02T09:30:00Z',
        category: { id: 'cat_3', name: 'Best Practices', slug: 'best-practices' },
        tags: [
          { id: 'tag_2', name: 'React', slug: 'react' },
          { id: 'tag_12', name: 'Performance', slug: 'performance' },
          { id: 'tag_15', name: 'Optimization', slug: 'optimization' }
        ],
        author: { id: 'author_2', name: 'John Smith' },
        featuredImage: 'https://example.com/images/react-performance.jpg'
      },
      {
        id: 'post_8',
        title: 'Creating Custom React Hooks',
        slug: 'creating-custom-react-hooks',
        excerpt: 'Learn how to build your own custom React hooks to reuse stateful logic across components.',
        content: 'Custom React hooks allow you to extract component logic into reusable functions. This tutorial demonstrates how to create and share stateful logic between components without duplicating code. We\'ll build several practical custom hooks from scratch.',
        publishedAt: '2023-08-10T11:45:00Z',
        category: { id: 'cat_1', name: 'Tutorials', slug: 'tutorials' },
        tags: [
          { id: 'tag_2', name: 'React', slug: 'react' },
          { id: 'tag_4', name: 'Hooks', slug: 'hooks' },
          { id: 'tag_3', name: 'JavaScript', slug: 'javascript' }
        ],
        author: { id: 'author_2', name: 'John Smith' },
        featuredImage: 'https://example.com/images/custom-react-hooks.jpg'
      }
    ]
    
    // Filter posts based on query parameters
    let filteredPosts = [...mockPosts]
    
    // Filter by text search (if query is provided)
    if (query) {
      const searchTerms = query.toLowerCase().split(' ').filter(Boolean)
      
      if (searchTerms.length > 0) {
        filteredPosts = filteredPosts.filter(post => {
          const searchableText = [
            post.title,
            post.excerpt,
            post.content,
            post.category.name,
            ...post.tags.map(tag => tag.name)
          ].join(' ').toLowerCase()
          
          // Check if all search terms are present
          return searchTerms.every(term => searchableText.includes(term))
        })
        
        // Add relevance score for sorting
        filteredPosts = filteredPosts.map(post => {
          const titleText = post.title.toLowerCase()
          const excerptText = post.excerpt.toLowerCase()
          const contentText = post.content.toLowerCase()
          
          // Calculate relevance: title matches are worth more than excerpt or content matches
          let relevanceScore = 0
          
          searchTerms.forEach(term => {
            // Title matches (most important)
            if (titleText.includes(term)) {
              relevanceScore += 10
              // Bonus for title starting with the term
              if (titleText.startsWith(term)) {
                relevanceScore += 5
              }
            }
            
            // Excerpt matches (second most important)
            if (excerptText.includes(term)) {
              relevanceScore += 5
            }
            
            // Content matches (least important but still valuable)
            if (contentText.includes(term)) {
              relevanceScore += 3
            }
            
            // Tag matches (also important)
            if (post.tags.some(tag => tag.name.toLowerCase().includes(term))) {
              relevanceScore += 8
            }
          })
          
          return {
            ...post,
            relevanceScore
          }
        })
      }
    }
    
    // Filter by tags
    if (tags.length > 0) {
      filteredPosts = filteredPosts.filter(post => 
        tags.every(tagSlug => 
          post.tags.some(tag => tag.slug === tagSlug)
        )
      )
    }
    
    // Filter by category
    if (category) {
      filteredPosts = filteredPosts.filter(post => post.category.slug === category)
    }
    
    // Filter by author
    if (author) {
      filteredPosts = filteredPosts.filter(post => post.author.id === author)
    }
    
    // Sort posts
    if (sort === 'date_desc') {
      filteredPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } else if (sort === 'date_asc') {
      filteredPosts.sort((a, b) => 
        new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
      )
    } else if (sort === 'relevance' && query) {
      // Already sorted by relevance when we added the score
      filteredPosts.sort((a, b) => {
        // First by relevance score
        const scoreDiff = (b.relevanceScore || 0) - (a.relevanceScore || 0)
        if (scoreDiff !== 0) return scoreDiff
        
        // If relevance is tied, sort by date (newer first)
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      })
    } else {
      // Default to date_desc if relevance sorting is requested but no query is provided
      filteredPosts.sort((a, b) => 
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    }
    
    // Apply pagination
    const total = filteredPosts.length
    const paginatedPosts = filteredPosts.slice(offset, offset + limit)
    
    // Clean up posts for response (remove content and relevance scores)
    const cleanedPosts = paginatedPosts.map(post => {
      // Create a shallow copy of the post object
      const cleanPost = { ...post }
      // Delete the properties we don't want to include
      delete cleanPost.content
      delete cleanPost.relevanceScore
      return cleanPost
    })
    
    // Get unique tags and categories for search filters
    const allTags = Array.from(
      new Set(mockPosts.flatMap(post => post.tags.map(tag => JSON.stringify(tag))))
    ).map(tag => JSON.parse(tag))
    
    const allCategories = Array.from(
      new Set(mockPosts.map(post => JSON.stringify(post.category)))
    ).map(category => JSON.parse(category))
    
    const allAuthors = Array.from(
      new Set(mockPosts.map(post => JSON.stringify(post.author)))
    ).map(author => JSON.parse(author))
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Search results retrieved successfully',
        data: {
          posts: cleanedPosts,
          pagination: {
            total,
            limit,
            offset,
            hasMore: offset + limit < total
          },
          filters: {
            tags: allTags,
            categories: allCategories,
            authors: allAuthors
          },
          searchParams: {
            query,
            tags,
            category,
            author,
            sort
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
        message: 'Failed to perform search',
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