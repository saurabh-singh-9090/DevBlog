/**
 * @swagger
 * /api/sitemap:
 *   get:
 *     description: Generate XML sitemap for the blog
 *     responses:
 *       200:
 *         description: XML sitemap
 *         content:
 *           application/xml:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get base URL from request
    const baseUrl = new URL(request.url).origin
    
    // Get all published posts, tags, and categories
    // In a real app, this would fetch from the database
    const posts = await getMockPosts()
    const tags = await getMockTags()
    const categories = await getMockCategories()
    
    // Create sitemap XML
    const sitemap = generateSitemap(baseUrl, posts, tags, categories)
    
    // Return XML response
    return new Response(sitemap, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to generate sitemap',
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
 * Generate sitemap XML
 */
function generateSitemap(baseUrl, posts, tags, categories) {
  // XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
  
  // Add homepage
  xml += `  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>\n`
  
  // Add main pages
  const mainPages = [
    { path: '/about', priority: '0.8', changefreq: 'monthly' },
    { path: '/contact', priority: '0.7', changefreq: 'monthly' },
    { path: '/blog', priority: '0.9', changefreq: 'daily' },
    { path: '/categories', priority: '0.8', changefreq: 'weekly' },
    { path: '/tags', priority: '0.8', changefreq: 'weekly' },
    { path: '/archive', priority: '0.7', changefreq: 'weekly' },
    { path: '/subscribe', priority: '0.7', changefreq: 'monthly' }
  ]
  
  for (const page of mainPages) {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>\n`
  }
  
  // Add blog posts
  for (const post of posts) {
    xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${post.updatedAt || post.publishedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`
  }
  
  // Add tag pages
  for (const tag of tags) {
    xml += `  <url>
    <loc>${baseUrl}/tags/${tag.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>\n`
  }
  
  // Add category pages
  for (const category of categories) {
    xml += `  <url>
    <loc>${baseUrl}/categories/${category.slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`
  }
  
  // Close XML
  xml += '</urlset>'
  
  return xml
}

/**
 * Mock function to get all published posts
 * In a real app, this would fetch from the database
 */
async function getMockPosts() {
  return [
    {
      id: 1,
      title: 'Getting Started with Next.js',
      slug: 'getting-started-with-nextjs',
      publishedAt: '2023-06-15T10:00:00Z',
      updatedAt: '2023-06-20T14:30:00Z'
    },
    {
      id: 2,
      title: 'Understanding React Hooks',
      slug: 'understanding-react-hooks',
      publishedAt: '2023-06-22T09:15:00Z',
      updatedAt: null
    },
    {
      id: 3,
      title: 'Building a Blog with Next.js',
      slug: 'building-a-blog-with-nextjs',
      publishedAt: '2023-07-01T11:30:00Z',
      updatedAt: '2023-07-05T16:45:00Z'
    },
    {
      id: 4,
      title: 'Advanced CSS Techniques',
      slug: 'advanced-css-techniques',
      publishedAt: '2023-07-10T13:20:00Z',
      updatedAt: null
    },
    {
      id: 5,
      title: 'JavaScript Best Practices',
      slug: 'javascript-best-practices',
      publishedAt: '2023-07-18T08:45:00Z',
      updatedAt: '2023-07-20T11:10:00Z'
    },
    {
      id: 6,
      title: 'TypeScript for React Developers',
      slug: 'typescript-for-react-developers',
      publishedAt: '2023-07-25T15:30:00Z',
      updatedAt: null
    }
  ]
}

/**
 * Mock function to get all tags
 * In a real app, this would fetch from the database
 */
async function getMockTags() {
  return [
    { id: 1, name: 'JavaScript', slug: 'javascript' },
    { id: 2, name: 'React', slug: 'react' },
    { id: 3, name: 'Next.js', slug: 'nextjs' },
    { id: 4, name: 'CSS', slug: 'css' },
    { id: 5, name: 'TypeScript', slug: 'typescript' },
    { id: 6, name: 'Web Development', slug: 'web-development' },
    { id: 7, name: 'Frontend', slug: 'frontend' },
    { id: 8, name: 'Performance', slug: 'performance' }
  ]
}

/**
 * Mock function to get all categories
 * In a real app, this would fetch from the database
 */
async function getMockCategories() {
  return [
    { id: 1, name: 'Tutorials', slug: 'tutorials' },
    { id: 2, name: 'Guides', slug: 'guides' },
    { id: 3, name: 'Best Practices', slug: 'best-practices' },
    { id: 4, name: 'Tips & Tricks', slug: 'tips-and-tricks' },
    { id: 5, name: 'Case Studies', slug: 'case-studies' }
  ]
} 