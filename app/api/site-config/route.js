/**
 * @swagger
 * /api/site-config:
 *   get:
 *     description: Returns the site configuration
 *     responses:
 *       200:
 *         description: Site configuration
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    // In a real implementation, you would fetch the site configuration
    // from a database or configuration file
    
    // Mock site configuration
    const siteConfig = {
      name: 'Next.js Blog',
      description: 'A modern blog built with Next.js and API routes',
      tagline: 'Exploring the world of web development',
      logo: '/images/logo.svg',
      favicon: '/favicon.ico',
      themeColor: '#0070f3',
      defaultOgImage: '/images/og-image.jpg',
      social: {
        twitter: 'https://twitter.com/nextjs',
        github: 'https://github.com/vercel/next.js',
        linkedin: 'https://linkedin.com/company/vercel',
        instagram: 'https://instagram.com/vercel',
        youtube: 'https://youtube.com/channel/vercel'
      },
      navigation: {
        header: [
          { label: 'Home', path: '/' },
          { label: 'Blog', path: '/blog' },
          { label: 'Categories', path: '/categories' },
          { label: 'About', path: '/about' },
          { label: 'Contact', path: '/contact' }
        ],
        footer: [
          { label: 'Privacy Policy', path: '/privacy-policy' },
          { label: 'Terms of Service', path: '/terms-of-service' },
          { label: 'Sitemap', path: '/sitemap.xml' },
          { label: 'RSS Feed', path: '/rss.xml' }
        ]
      },
      contact: {
        email: 'contact@example.com',
        phone: '+1 (123) 456-7890',
        address: '123 Main St, City, Country'
      },
      homepage: {
        featuredPostsCount: 3,
        recentPostsCount: 6,
        popularPostsCount: 4
      },
      blog: {
        postsPerPage: 9,
        showAuthor: true,
        showDate: true,
        showReadingTime: true,
        showTableOfContents: true,
        showRelatedPosts: true,
        relatedPostsCount: 3
      },
      comments: {
        enabled: true,
        provider: 'internal', // 'internal', 'disqus', etc.
        moderationEnabled: true
      },
      analytics: {
        enabled: true,
        googleAnalyticsId: 'UA-XXXXXXXXX-X'
      },
      newsletter: {
        enabled: true,
        provider: 'mailchimp',
        showOnPosts: true,
        showInSidebar: true
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Site configuration fetched successfully',
        data: siteConfig
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Add cache headers for better performance
          'Cache-Control': 'public, max-age=1800' // Cache for 30 minutes
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to fetch site configuration',
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
 * /api/site-config:
 *   put:
 *     description: Updates the site configuration (admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Site configuration object
 *     responses:
 *       200:
 *         description: Site configuration updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       500:
 *         description: Server error
 */
export async function PUT(request) {
  try {
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
    
    // Check if the user is an admin
    if (token !== 'mock-admin-token') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Admin privileges required'
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
    
    // Validate the input
    if (!data || typeof data !== 'object') {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid site configuration data'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation:
    // 1. Validate the configuration structure and values
    // 2. Update the configuration in a database or file
    // 3. Invalidate any cache for the site configuration
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Site configuration updated successfully',
        data: {
          // Return the updated configuration
          // In a real implementation, this would be fetched from the database
          // after the update
          ...data
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
        message: 'Failed to update site configuration',
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