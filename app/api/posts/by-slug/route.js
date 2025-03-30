/**
 * @swagger
 * /api/posts/{slug}:
 *   get:
 *     description: Returns a specific blog post by slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post
 *     responses:
 *       200:
 *         description: A single blog post
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { slug } = params
    
    // In a real implementation, fetch the post from a database
    // For now, we'll use mock data
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        excerpt: 'Learn the basics of JavaScript programming',
        content: 'JavaScript is a programming language used to create interactive effects within web browsers. It was first introduced in 1995 and has since become one of the most popular programming languages in the world.\n\nJavaScript is primarily used for web development, but it can also be used for server-side programming (Node.js), mobile app development, desktop app development, and more.\n\nIn this tutorial, we\'ll cover the basics of JavaScript, including variables, data types, functions, control structures, and more. By the end of this tutorial, you\'ll have a solid foundation in JavaScript programming.',
        coverImage: '/images/posts/javascript-basics.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['javascript', 'webdev', 'programming'],
        author: {
          id: '1',
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg',
          bio: 'Web developer and JavaScript enthusiast'
        },
        publishedAt: '2023-06-15T10:00:00Z',
        updatedAt: '2023-06-16T10:00:00Z',
        viewCount: 1250,
        likeCount: 42,
        readingTime: '5 min read',
        relatedPosts: [
          {
            id: '2',
            title: 'Introduction to React',
            slug: 'introduction-to-react',
            excerpt: 'A beginner\'s guide to React JS'
          },
          {
            id: '4',
            title: 'Getting Started with Next.js',
            slug: 'getting-started-with-nextjs',
            excerpt: 'Learn how to build applications with Next.js'
          }
        ],
        comments: [
          {
            id: '1',
            authorName: 'Jane Smith',
            authorAvatar: '/images/authors/jane-smith.jpg',
            content: 'Great article! Very informative.',
            createdAt: '2023-06-15T15:30:00Z',
            likeCount: 5
          },
          {
            id: '2',
            authorName: 'Mike Johnson',
            authorAvatar: '/images/authors/mike-johnson.jpg',
            content: 'Thanks for sharing this. I learned a lot!',
            createdAt: '2023-06-16T09:15:00Z',
            likeCount: 3
          }
        ]
      },
      {
        id: '2',
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        excerpt: 'A beginner\'s guide to React JS',
        content: 'React is a JavaScript library for building user interfaces. It allows you to compose complex UIs from small and isolated pieces of code called "components".\n\nCreated by Facebook, React has gained widespread adoption in the web development community due to its efficient approach to updating the DOM and its component-based architecture.\n\nIn this guide, we\'ll introduce you to the core concepts of React, including components, props, state, and the virtual DOM. We\'ll also walk through creating a simple React application.',
        coverImage: '/images/posts/react-intro.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['react', 'javascript', 'frontend'],
        author: {
          id: '2',
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg',
          bio: 'Frontend developer specializing in React'
        },
        publishedAt: '2023-06-22T10:00:00Z',
        updatedAt: '2023-06-23T11:30:00Z',
        viewCount: 980,
        likeCount: 35,
        readingTime: '7 min read',
        relatedPosts: [
          {
            id: '1',
            title: 'Getting Started with JavaScript',
            slug: 'getting-started-with-javascript',
            excerpt: 'Learn the basics of JavaScript programming'
          },
          {
            id: '4',
            title: 'Getting Started with Next.js',
            slug: 'getting-started-with-nextjs',
            excerpt: 'Learn how to build applications with Next.js'
          }
        ],
        comments: [
          {
            id: '3',
            authorName: 'John Doe',
            authorAvatar: '/images/authors/john-doe.jpg',
            content: 'This is exactly what I needed to get started with React!',
            createdAt: '2023-06-22T15:45:00Z',
            likeCount: 7
          }
        ]
      },
      {
        id: '3',
        title: 'Building a Mobile App with React Native',
        slug: 'building-mobile-app-react-native',
        excerpt: 'Learn how to build cross-platform mobile apps',
        content: 'React Native lets you create truly native apps and doesn\'t compromise your users\' experiences. It provides a core set of platform agnostic native components like View, Text, and Image that map directly to the platform\'s native UI building blocks.\n\nWith React Native, you can use the same codebase for both iOS and Android platforms, which significantly reduces development time and costs.',
        coverImage: '/images/posts/react-native.jpg',
        category: {
          id: '2',
          name: 'Mobile Development',
          slug: 'mobile-development'
        },
        tags: ['react-native', 'mobile', 'javascript'],
        author: {
          id: '2',
          name: 'Jane Smith',
          avatar: '/images/authors/jane-smith.jpg',
          bio: 'Frontend developer specializing in React'
        },
        publishedAt: '2023-07-05T10:00:00Z',
        updatedAt: '2023-07-06T09:20:00Z',
        viewCount: 1500,
        likeCount: 56,
        readingTime: '10 min read',
        relatedPosts: [
          {
            id: '2',
            title: 'Introduction to React',
            slug: 'introduction-to-react',
            excerpt: 'A beginner\'s guide to React JS'
          }
        ],
        comments: []
      },
      {
        id: '4',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        excerpt: 'Learn how to build applications with Next.js',
        content: 'Next.js is a React framework that enables server-side rendering and static site generation. It provides a set of features such as hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more.\n\nNext.js aims to have the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed.',
        coverImage: '/images/posts/nextjs-intro.jpg',
        category: {
          id: '1',
          name: 'Web Development',
          slug: 'web-development'
        },
        tags: ['nextjs', 'react', 'javascript', 'ssg', 'ssr'],
        author: {
          id: '1',
          name: 'John Doe',
          avatar: '/images/authors/john-doe.jpg',
          bio: 'Web developer and JavaScript enthusiast'
        },
        publishedAt: '2023-07-15T10:00:00Z',
        updatedAt: '2023-07-16T12:45:00Z',
        viewCount: 2100,
        likeCount: 75,
        readingTime: '8 min read',
        relatedPosts: [
          {
            id: '1',
            title: 'Getting Started with JavaScript',
            slug: 'getting-started-with-javascript',
            excerpt: 'Learn the basics of JavaScript programming'
          },
          {
            id: '2',
            title: 'Introduction to React',
            slug: 'introduction-to-react',
            excerpt: 'A beginner\'s guide to React JS'
          }
        ],
        comments: [
          {
            id: '4',
            authorName: 'Sarah Johnson',
            authorAvatar: '/images/authors/sarah-johnson.jpg',
            content: 'Next.js has been a game-changer for my projects. Thanks for this guide!',
            createdAt: '2023-07-15T16:20:00Z',
            likeCount: 10
          }
        ]
      },
      {
        id: '5',
        title: 'Introduction to Docker',
        slug: 'introduction-to-docker',
        excerpt: 'Get started with containerization using Docker',
        content: 'Docker is a platform that enables developers to automate the deployment of applications inside containers. Containers allow a developer to package up an application with all the parts it needs, such as libraries and other dependencies, and ship it all out as one package.\n\nWith Docker, you can ensure that your application works seamlessly in any environment, from development to testing to production.',
        coverImage: '/images/posts/docker-intro.jpg',
        category: {
          id: '3',
          name: 'DevOps',
          slug: 'devops'
        },
        tags: ['docker', 'devops', 'containers'],
        author: {
          id: '3',
          name: 'Sarah Johnson',
          avatar: '/images/authors/sarah-johnson.jpg',
          bio: 'DevOps engineer and cloud enthusiast'
        },
        publishedAt: '2023-08-01T10:00:00Z',
        updatedAt: '2023-08-02T14:10:00Z',
        viewCount: 1800,
        likeCount: 62,
        readingTime: '6 min read',
        relatedPosts: [],
        comments: [
          {
            id: '5',
            authorName: 'John Doe',
            authorAvatar: '/images/authors/john-doe.jpg',
            content: 'Docker has simplified my workflow significantly. Great introduction!',
            createdAt: '2023-08-01T15:50:00Z',
            likeCount: 8
          }
        ]
      }
    ]
    
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
    
    // Increment view count in a real application
    // For now, we just return the post with the current view count
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post fetched successfully',
        data: post
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
        message: 'Failed to fetch post',
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
 * /api/posts/{slug}:
 *   put:
 *     description: Updates a specific blog post (admin or author only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *               excerpt:
 *                 type: string
 *                 description: A brief summary of the post
 *               categoryId:
 *                 type: string
 *                 description: The ID of the category the post belongs to
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array of tag names or IDs
 *               coverImage:
 *                 type: string
 *                 description: URL of the cover image
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *                 description: Publication status of the post
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
  try {
    const { slug } = params
    
    // Simulating authentication check
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
    
    const token = authHeader.split(' ')[1]
    
    // Mock user data based on token
    let currentUser
    if (token === 'mock-admin-token') {
      currentUser = { id: 'admin', role: 'admin' }
    } else if (token === 'mock-author1-token') {
      currentUser = { id: '1', role: 'author' }
    } else if (token === 'mock-author2-token') {
      currentUser = { id: '2', role: 'author' }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid token'
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
    
    // Mock list of existing posts
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        authorId: '1',
        // Other post data...
      },
      {
        id: '2',
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        authorId: '2',
        // Other post data...
      },
      {
        id: '3',
        title: 'Building a Mobile App with React Native',
        slug: 'building-mobile-app-react-native',
        authorId: '2',
        // Other post data...
      },
      {
        id: '4',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        authorId: '1',
        // Other post data...
      },
      {
        id: '5',
        title: 'Introduction to Docker',
        slug: 'introduction-to-docker',
        authorId: '3',
        // Other post data...
      }
    ]
    
    // Check if the post exists
    const existingPost = mockPosts.find(post => post.slug === slug)
    if (!existingPost) {
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
    
    // Check if the user is authorized to update this post
    // Admin can update any post, authors can only update their own posts
    if (currentUser.role !== 'admin' && currentUser.id !== existingPost.authorId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You are not authorized to update this post'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate if title is provided and not empty
    if (data.title !== undefined && data.title.trim() === '') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Title cannot be empty'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Create a new slug from the title if the title changed
    let newSlug = slug
    if (data.title && data.title.toLowerCase() !== existingPost.title.toLowerCase()) {
      newSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    }
    
    // Check if the new slug would conflict with an existing post
    if (newSlug !== slug && mockPosts.some(post => post.slug === newSlug)) {
      // Append a unique identifier to avoid conflict
      newSlug = `${newSlug}-${Date.now().toString().slice(-4)}`
    }
    
    // In a real implementation, update the post in the database
    // For the mock response, we'll simulate an updated post object
    
    const updatedPost = {
      ...existingPost,
      title: data.title || existingPost.title,
      slug: newSlug,
      content: data.content !== undefined ? data.content : existingPost.content,
      excerpt: data.excerpt !== undefined ? data.excerpt : existingPost.excerpt,
      categoryId: data.categoryId || existingPost.categoryId,
      tags: data.tags || existingPost.tags,
      coverImage: data.coverImage || existingPost.coverImage,
      status: data.status || existingPost.status,
      updatedAt: new Date().toISOString()
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post updated successfully',
        data: {
          originalSlug: slug,
          updatedPost
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

/**
 * @swagger
 * /api/posts/{slug}:
 *   delete:
 *     description: Deletes a specific blog post (admin or author only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the post to delete
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401:
 *         description: Unauthorized - user not authenticated or not authorized
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
  try {
    const { slug } = params
    
    // Simulating authentication check
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
    
    const token = authHeader.split(' ')[1]
    
    // Mock user data based on token
    let currentUser
    if (token === 'mock-admin-token') {
      currentUser = { id: 'admin', role: 'admin' }
    } else if (token === 'mock-author1-token') {
      currentUser = { id: '1', role: 'author' }
    } else if (token === 'mock-author2-token') {
      currentUser = { id: '2', role: 'author' }
    } else {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid token'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock list of existing posts
    const mockPosts = [
      {
        id: '1',
        title: 'Getting Started with JavaScript',
        slug: 'getting-started-with-javascript',
        authorId: '1',
        // Other post data...
      },
      {
        id: '2',
        title: 'Introduction to React',
        slug: 'introduction-to-react',
        authorId: '2',
        // Other post data...
      },
      {
        id: '3',
        title: 'Building a Mobile App with React Native',
        slug: 'building-mobile-app-react-native',
        authorId: '2',
        // Other post data...
      },
      {
        id: '4',
        title: 'Getting Started with Next.js',
        slug: 'getting-started-with-nextjs',
        authorId: '1',
        // Other post data...
      },
      {
        id: '5',
        title: 'Introduction to Docker',
        slug: 'introduction-to-docker',
        authorId: '3',
        // Other post data...
      }
    ]
    
    // Check if the post exists
    const existingPost = mockPosts.find(post => post.slug === slug)
    if (!existingPost) {
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
    
    // Check if the user is authorized to delete this post
    // Admin can delete any post, authors can only delete their own posts
    if (currentUser.role !== 'admin' && currentUser.id !== existingPost.authorId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'You are not authorized to delete this post'
        }),
        {
          status: 401,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation, delete the post from the database
    // For the mock response, we'll just acknowledge the deletion
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Post deleted successfully',
        data: {
          id: existingPost.id,
          title: existingPost.title,
          slug,
          deletedAt: new Date().toISOString()
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