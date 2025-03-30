/**
 * @swagger
 * /api/rss:
 *   get:
 *     description: Generate RSS feed for the blog
 *     responses:
 *       200:
 *         description: RSS feed
 *         content:
 *           application/rss+xml:
 *             schema:
 *               type: string
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get base URL from request
    const baseUrl = new URL(request.url).origin
    
    // Basic blog info
    const blogInfo = {
      title: 'Tech Blog',
      description: 'A blog about web development, programming, and technology',
      language: 'en-us',
      lastBuildDate: new Date().toUTCString(),
      link: baseUrl
    }
    
    // Get all published posts
    // In a real app, this would fetch from the database
    const posts = await getMockPosts()
    
    // Create RSS feed
    const rssFeed = generateRssFeed(blogInfo, posts)
    
    // Return XML response
    return new Response(rssFeed, {
      status: 200,
      headers: {
        'Content-Type': 'application/rss+xml',
        'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
      }
    })
  } catch (error) {
    console.error('Error generating RSS feed:', error)
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to generate RSS feed',
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
 * Generate RSS feed XML
 */
function generateRssFeed(blogInfo, posts) {
  const { title, description, language, lastBuildDate, link } = blogInfo
  
  // RSS header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/">\n'
  xml += '<channel>\n'
  
  // Blog info
  xml += `  <title>${escapeXml(title)}</title>\n`
  xml += `  <description>${escapeXml(description)}</description>\n`
  xml += `  <language>${language}</language>\n`
  xml += `  <link>${link}</link>\n`
  xml += `  <lastBuildDate>${lastBuildDate}</lastBuildDate>\n`
  xml += `  <atom:link href="${link}/api/rss" rel="self" type="application/rss+xml" />\n`
  
  // Add posts
  for (const post of posts) {
    const postLink = `${link}/blog/${post.slug}`
    const pubDate = new Date(post.publishedAt).toUTCString()
    
    xml += '  <item>\n'
    xml += `    <title>${escapeXml(post.title)}</title>\n`
    xml += `    <link>${postLink}</link>\n`
    xml += `    <guid isPermaLink="true">${postLink}</guid>\n`
    xml += `    <pubDate>${pubDate}</pubDate>\n`
    
    // Add author if available
    if (post.author) {
      xml += `    <dc:creator>${escapeXml(post.author.name)}</dc:creator>\n`
    }
    
    // Add categories (tags)
    if (post.tags && Array.isArray(post.tags)) {
      for (const tag of post.tags) {
        xml += `    <category>${escapeXml(tag)}</category>\n`
      }
    }
    
    // Add excerpt
    if (post.excerpt) {
      xml += `    <description>${escapeXml(post.excerpt)}</description>\n`
    }
    
    // Add full content if available
    if (post.content) {
      xml += `    <content:encoded><![CDATA[${post.content}]]></content:encoded>\n`
    }
    
    xml += '  </item>\n'
  }
  
  // Close RSS feed
  xml += '</channel>\n'
  xml += '</rss>'
  
  return xml
}

/**
 * Escape XML special characters
 */
function escapeXml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
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
      updatedAt: '2023-06-20T14:30:00Z',
      excerpt: 'Learn how to set up a new Next.js project and start building your first application.',
      content: '<p>In this tutorial, we\'ll walk through setting up a new Next.js project from scratch. Next.js is a powerful React framework that offers server-side rendering, static site generation, and more out of the box.</p><p>Let\'s get started...</p>',
      author: { name: 'Jane Doe', email: 'jane@example.com' },
      tags: ['Next.js', 'React', 'JavaScript', 'Web Development']
    },
    {
      id: 2,
      title: 'Understanding React Hooks',
      slug: 'understanding-react-hooks',
      publishedAt: '2023-06-22T09:15:00Z',
      updatedAt: null,
      excerpt: 'Dive into React Hooks and learn how they can simplify your functional components.',
      content: '<p>React Hooks have revolutionized how we write React components. Gone are the days of class components with complex lifecycle methods. With hooks, we can add state and other React features to functional components.</p><p>In this article, we\'ll explore the most commonly used hooks...</p>',
      author: { name: 'John Smith', email: 'john@example.com' },
      tags: ['React', 'JavaScript', 'Hooks', 'Frontend']
    },
    {
      id: 3,
      title: 'Building a Blog with Next.js',
      slug: 'building-a-blog-with-nextjs',
      publishedAt: '2023-07-01T11:30:00Z',
      updatedAt: '2023-07-05T16:45:00Z',
      excerpt: 'Step-by-step guide to creating a full-featured blog using Next.js, MDX, and Tailwind CSS.',
      content: '<p>Building a blog is a great way to learn web development concepts. In this comprehensive guide, we\'ll build a modern blog using Next.js, MDX for content, and Tailwind CSS for styling.</p><p>By the end, you\'ll have a fully-functional blog with features like...</p>',
      author: { name: 'Jane Doe', email: 'jane@example.com' },
      tags: ['Next.js', 'MDX', 'Tailwind CSS', 'Blog', 'Web Development']
    },
    {
      id: 4,
      title: 'Advanced CSS Techniques',
      slug: 'advanced-css-techniques',
      publishedAt: '2023-07-10T13:20:00Z',
      updatedAt: null,
      excerpt: 'Explore advanced CSS techniques that will take your web design skills to the next level.',
      content: '<p>CSS has evolved significantly over the years, with modern features that make complex layouts and animations easier than ever. In this post, we\'ll look at some advanced techniques that can elevate your design work.</p><p>From CSS Grid to custom properties to animations...</p>',
      author: { name: 'Alex Johnson', email: 'alex@example.com' },
      tags: ['CSS', 'Web Design', 'Frontend', 'Animation']
    },
    {
      id: 5,
      title: 'JavaScript Best Practices',
      slug: 'javascript-best-practices',
      publishedAt: '2023-07-18T08:45:00Z',
      updatedAt: '2023-07-20T11:10:00Z',
      excerpt: 'Learn the best practices for writing clean, efficient, and maintainable JavaScript code.',
      content: '<p>Writing good JavaScript involves more than just making code that works. In this guide, we\'ll explore best practices that lead to code that\'s easier to read, maintain, and debug.</p><p>From naming conventions to performance optimizations...</p>',
      author: { name: 'John Smith', email: 'john@example.com' },
      tags: ['JavaScript', 'Best Practices', 'Clean Code', 'Performance']
    }
  ]
} 