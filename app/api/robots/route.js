/**
 * @swagger
 * /api/robots:
 *   get:
 *     description: Returns the robots.txt file for the blog
 *     responses:
 *       200:
 *         description: Robots.txt file
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 */
export async function GET() {
  try {
    // In a real implementation, you might fetch configuration from a database
    // to determine what should be allowed/disallowed in robots.txt
    
    // Site configuration
    const siteConfig = {
      url: 'https://example.com'
    }
    
    // Generate the robots.txt content
    const robotsTxt = generateRobotsTxt(siteConfig)
    
    return new Response(robotsTxt, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain',
        // Add cache headers for better performance
        'Cache-Control': 'public, max-age=86400' // Cache for 24 hours
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to generate robots.txt',
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
 * Helper function to generate robots.txt content
 */
function generateRobotsTxt(siteConfig) {
  const { url } = siteConfig
  
  let robotsTxt = ''
  
  // User-agent for all crawlers
  robotsTxt += 'User-agent: *\n'
  
  // Allow all crawlers to access the entire site
  robotsTxt += 'Allow: /\n'
  
  // Disallow admin and API paths
  robotsTxt += 'Disallow: /admin/\n'
  robotsTxt += 'Disallow: /api/\n'
  
  // Disallow specific paths
  robotsTxt += 'Disallow: /private/\n'
  robotsTxt += 'Disallow: /draft/\n'
  
  // Add empty line
  robotsTxt += '\n'
  
  // Add sitemap URL
  robotsTxt += `Sitemap: ${url}/api/sitemap\n`
  
  return robotsTxt
} 