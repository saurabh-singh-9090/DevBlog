/**
 * @swagger
 * /api/posts/share:
 *   post:
 *     description: Track a post being shared to social media
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - postId
 *               - platform
 *             properties:
 *               postId:
 *                 type: string
 *                 description: ID of the post being shared
 *               platform:
 *                 type: string
 *                 enum: [twitter, facebook, linkedin, reddit, email, other]
 *                 description: Platform where the post is being shared
 *               userId:
 *                 type: string
 *                 description: ID of the user sharing (if authenticated)
 *               sessionId:
 *                 type: string
 *                 description: Anonymous session ID (if not authenticated)
 *               customMessage:
 *                 type: string
 *                 description: Custom message added by the user when sharing
 *     responses:
 *       200:
 *         description: Share tracked successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Post not found
 *       500:
 *         description: Server error
 *   get:
 *     description: Get sharing data for posts
 *     parameters:
 *       - in: query
 *         name: postId
 *         schema:
 *           type: string
 *         description: Filter by post ID
 *       - in: query
 *         name: timeframe
 *         schema:
 *           type: string
 *           enum: [day, week, month, year, all]
 *           default: all
 *         description: Timeframe for share stats
 *     responses:
 *       200:
 *         description: Share statistics retrieved successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    if (!data.postId) {
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
    
    if (!data.platform) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Platform is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    const validPlatforms = ['twitter', 'facebook', 'linkedin', 'reddit', 'email', 'other']
    if (!validPlatforms.includes(data.platform)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid platform. Valid platforms are: ${validPlatforms.join(', ')}`
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
    // 1. Check if the post exists
    // 2. Log the sharing event in the database
    
    // Mock post data - in a real app this would check database
    const mockPosts = {
      'post_1': { id: 'post_1', title: 'Getting Started with Next.js', slug: 'getting-started-with-nextjs' },
      'post_2': { id: 'post_2', title: 'Understanding React Hooks', slug: 'understanding-react-hooks' },
      'post_3': { id: 'post_3', title: 'Building a Blog with Next.js', slug: 'building-a-blog-with-nextjs' }
    }
    
    // Check if post exists
    if (!mockPosts[data.postId]) {
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
    
    // Create share event
    const shareEvent = {
      id: 'share_' + Math.random().toString(36).substring(2, 10),
      postId: data.postId,
      platform: data.platform,
      timestamp: new Date().toISOString(),
      userId: data.userId || null,
      sessionId: data.sessionId || null,
      customMessage: data.customMessage || null
    }
    
    // In a real implementation, save the share event to database
    
    // Generate sharing URLs based on platform
    const postUrl = `https://example.com/blog/${mockPosts[data.postId].slug}`
    const postTitle = mockPosts[data.postId].title
    const encodedUrl = encodeURIComponent(postUrl)
    const encodedTitle = encodeURIComponent(postTitle)
    const customText = data.customMessage ? encodeURIComponent(data.customMessage) : ''
    
    let sharingUrl = ''
    
    switch (data.platform) {
      case 'twitter':
        sharingUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}${customText ? ' ' + customText : ''}`
        break
      case 'facebook':
        sharingUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
        break
      case 'linkedin':
        sharingUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`
        break
      case 'reddit':
        sharingUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`
        break
      case 'email':
        sharingUrl = `mailto:?subject=${encodedTitle}&body=${customText ? customText + '%0A%0A' : ''}${encodedUrl}`
        break
      default:
        // For 'other', just use the post URL
        sharingUrl = postUrl
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: `Share to ${data.platform} tracked successfully`,
        data: {
          shareEvent,
          shareUrl: sharingUrl,
          post: {
            id: data.postId,
            title: mockPosts[data.postId].title,
            url: postUrl
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
        message: 'Failed to process share',
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

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const timeframe = searchParams.get('timeframe') || 'all'
    
    // Validate timeframe
    const validTimeframes = ['day', 'week', 'month', 'year', 'all']
    if (!validTimeframes.includes(timeframe)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid timeframe. Valid timeframes are: ${validTimeframes.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock share data
    const mockShares = [
      { id: 'share_1', postId: 'post_1', platform: 'twitter', timestamp: '2023-07-15T10:30:00Z' },
      { id: 'share_2', postId: 'post_1', platform: 'facebook', timestamp: '2023-07-16T11:45:00Z' },
      { id: 'share_3', postId: 'post_2', platform: 'linkedin', timestamp: '2023-07-16T12:20:00Z' },
      { id: 'share_4', postId: 'post_1', platform: 'twitter', timestamp: '2023-07-17T09:10:00Z' },
      { id: 'share_5', postId: 'post_3', platform: 'email', timestamp: '2023-07-17T14:55:00Z' },
      { id: 'share_6', postId: 'post_2', platform: 'reddit', timestamp: '2023-07-18T16:30:00Z' },
      { id: 'share_7', postId: 'post_1', platform: 'linkedin', timestamp: '2023-07-19T10:15:00Z' },
      { id: 'share_8', postId: 'post_3', platform: 'facebook', timestamp: '2023-07-19T13:40:00Z' },
      { id: 'share_9', postId: 'post_2', platform: 'twitter', timestamp: '2023-07-20T11:05:00Z' },
      { id: 'share_10', postId: 'post_1', platform: 'email', timestamp: '2023-07-20T15:20:00Z' },
      { id: 'share_11', postId: 'post_3', platform: 'twitter', timestamp: '2023-06-15T10:30:00Z' },
      { id: 'share_12', postId: 'post_2', platform: 'facebook', timestamp: '2023-06-16T11:45:00Z' },
      { id: 'share_13', postId: 'post_1', platform: 'linkedin', timestamp: '2023-06-16T12:20:00Z' },
      { id: 'share_14', postId: 'post_3', platform: 'twitter', timestamp: '2023-05-17T09:10:00Z' },
      { id: 'share_15', postId: 'post_2', platform: 'email', timestamp: '2023-05-17T14:55:00Z' }
    ]
    
    // Filter shares by timeframe
    let filteredShares = [...mockShares]
    const now = new Date()
    
    if (timeframe !== 'all') {
      let cutoffDate
      
      switch (timeframe) {
        case 'day':
          cutoffDate = new Date(now)
          cutoffDate.setDate(now.getDate() - 1)
          break
        case 'week':
          cutoffDate = new Date(now)
          cutoffDate.setDate(now.getDate() - 7)
          break
        case 'month':
          cutoffDate = new Date(now)
          cutoffDate.setMonth(now.getMonth() - 1)
          break
        case 'year':
          cutoffDate = new Date(now)
          cutoffDate.setFullYear(now.getFullYear() - 1)
          break
      }
      
      filteredShares = filteredShares.filter(share => 
        new Date(share.timestamp) > cutoffDate
      )
    }
    
    // Filter by postId if provided
    if (postId) {
      filteredShares = filteredShares.filter(share => share.postId === postId)
    }
    
    // Group by platform for statistics
    const platformStats = {}
    filteredShares.forEach(share => {
      if (!platformStats[share.platform]) {
        platformStats[share.platform] = 0
      }
      platformStats[share.platform]++
    })
    
    // Get total shares
    const totalShares = filteredShares.length
    
    // Group by post if no postId provided
    let postStats = null
    if (!postId) {
      postStats = {}
      filteredShares.forEach(share => {
        if (!postStats[share.postId]) {
          postStats[share.postId] = {
            total: 0,
            platforms: {}
          }
        }
        
        postStats[share.postId].total++
        
        if (!postStats[share.postId].platforms[share.platform]) {
          postStats[share.postId].platforms[share.platform] = 0
        }
        
        postStats[share.postId].platforms[share.platform]++
      })
    }
    
    // Generate time series data for chart visualization
    let timeSeriesData = null
    
    // Only generate time series if filtering by postId or if there's a reasonable amount of data
    if (postId || totalShares <= 100) {
      // Sort shares by timestamp
      const sortedShares = [...filteredShares].sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      )
      
      if (timeframe === 'day') {
        // For day, group by hour
        timeSeriesData = groupSharesByTimeUnit(sortedShares, 'hour')
      } else if (timeframe === 'week') {
        // For week, group by day
        timeSeriesData = groupSharesByTimeUnit(sortedShares, 'day')
      } else if (timeframe === 'month') {
        // For month, group by day
        timeSeriesData = groupSharesByTimeUnit(sortedShares, 'day')
      } else {
        // For year or all, group by month
        timeSeriesData = groupSharesByTimeUnit(sortedShares, 'month')
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Share statistics retrieved successfully',
        data: {
          timeframe,
          total: totalShares,
          platformStats,
          ...(postId ? {} : { postStats }),
          ...(timeSeriesData ? { timeSeriesData } : {})
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
        message: 'Failed to retrieve share statistics',
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
 * Group shares by a time unit (hour, day, month) for time series data
 */
function groupSharesByTimeUnit(shares, unit) {
  const timeSeriesData = {}
  
  shares.forEach(share => {
    const date = new Date(share.timestamp)
    let timeKey
    
    if (unit === 'hour') {
      // Format: YYYY-MM-DD HH:00
      timeKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:00`
    } else if (unit === 'day') {
      // Format: YYYY-MM-DD
      timeKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
    } else if (unit === 'month') {
      // Format: YYYY-MM
      timeKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`
    }
    
    if (!timeSeriesData[timeKey]) {
      timeSeriesData[timeKey] = {
        time: timeKey,
        total: 0,
        platforms: {}
      }
    }
    
    timeSeriesData[timeKey].total++
    
    if (!timeSeriesData[timeKey].platforms[share.platform]) {
      timeSeriesData[timeKey].platforms[share.platform] = 0
    }
    
    timeSeriesData[timeKey].platforms[share.platform]++
  })
  
  // Convert to array and sort by time
  return Object.values(timeSeriesData).sort((a, b) => 
    a.time.localeCompare(b.time)
  )
} 