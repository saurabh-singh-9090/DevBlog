/**
 * @swagger
 * /api/newsletter/analytics:
 *   get:
 *     description: Get newsletter analytics data (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: period
 *         schema:
 *           type: string
 *           enum: [7d, 30d, 90d, 6m, 12m, all]
 *           default: 30d
 *         description: Time period for analytics
 *       - in: query
 *         name: compare
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Include comparison with previous period
 *     responses:
 *       200:
 *         description: Analytics data
 *       401:
 *         description: Unauthorized - requires admin privileges
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get the authorization header to check admin privileges
    const authHeader = request.headers.get('Authorization')
    
    // Validate admin authentication (in real app would validate JWT/session)
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
    
    // Mock token verification - in a real app this would verify a JWT
    const token = authHeader.split(' ')[1]
    const mockAdminTokens = ['admin-token-123', 'admin-token-456']
    
    if (!mockAdminTokens.includes(token)) {
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
    
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const period = searchParams.get('period') || '30d'
    const compare = searchParams.get('compare') === 'true'
    
    // Validate period
    const validPeriods = ['7d', '30d', '90d', '6m', '12m', 'all']
    if (!validPeriods.includes(period)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Invalid period. Valid periods are: ${validPeriods.join(', ')}`
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Generate analytics data based on period
    const analyticsData = generateAnalyticsData(period, compare)
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Analytics data retrieved successfully',
        data: analyticsData
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
        message: 'Failed to retrieve analytics data',
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
 * Generate mock analytics data based on the requested period
 */
function generateAnalyticsData(period, compare) {
  // Get date ranges for the requested period
  const { current, previous } = getDateRanges(period)
  
  // Generate summary metrics
  const summary = generateSummaryMetrics(current, compare ? previous : null)
  
  // Generate subscriber growth data
  const subscriberGrowth = generateSubscriberGrowth(current, compare ? previous : null)
  
  // Generate engagement metrics
  const engagement = generateEngagementMetrics(current, compare ? previous : null)
  
  // Generate top campaigns
  const topCampaigns = generateTopCampaigns(current.start, current.end, 5)
  
  // Generate subscriber demographics
  const demographics = generateDemographics()
  
  // Generate delivery metrics
  const deliveryMetrics = generateDeliveryMetrics(current, compare ? previous : null)
  
  return {
    period,
    current: {
      start: current.start.toISOString(),
      end: current.end.toISOString()
    },
    previous: compare ? {
      start: previous.start.toISOString(),
      end: previous.end.toISOString()
    } : null,
    summary,
    subscriberGrowth,
    engagement,
    topCampaigns,
    demographics,
    deliveryMetrics
  }
}

/**
 * Calculate date ranges for the requested period and the previous period
 */
function getDateRanges(period) {
  const now = new Date()
  const end = new Date(now)
  let start
  
  // Calculate start date based on period
  switch (period) {
    case '7d':
      start = new Date(now)
      start.setDate(now.getDate() - 7)
      break
    case '30d':
      start = new Date(now)
      start.setDate(now.getDate() - 30)
      break
    case '90d':
      start = new Date(now)
      start.setDate(now.getDate() - 90)
      break
    case '6m':
      start = new Date(now)
      start.setMonth(now.getMonth() - 6)
      break
    case '12m':
      start = new Date(now)
      start.setFullYear(now.getFullYear() - 1)
      break
    case 'all':
      // For demo, assume the newsletter started 2 years ago
      start = new Date(now)
      start.setFullYear(now.getFullYear() - 2)
      break
    default:
      start = new Date(now)
      start.setDate(now.getDate() - 30)
  }
  
  // Calculate previous period with same duration
  const duration = end.getTime() - start.getTime()
  const previousEnd = new Date(start)
  const previousStart = new Date(previousEnd.getTime() - duration)
  
  return {
    current: { start, end },
    previous: { start: previousStart, end: previousEnd }
  }
}

/**
 * Generate summary metrics for the requested period
 */
function generateSummaryMetrics(current, previous) {
  // Mock data for current period
  const currentData = {
    totalSubscribers: 1250,
    activeSubscribers: 1175,
    newSubscribers: 87,
    unsubscribes: 12,
    netGrowth: 75,
    growthRate: 6.38,
    campaignsSent: 5,
    totalEmailsSent: 5840,
    avgOpenRate: 42.3,
    avgClickRate: 18.7
  }
  
  // If comparison is requested, generate previous period data
  if (previous) {
    const previousData = {
      totalSubscribers: 1175,
      activeSubscribers: 1104,
      newSubscribers: 68,
      unsubscribes: 9,
      netGrowth: 59,
      growthRate: 5.29,
      campaignsSent: 4,
      totalEmailsSent: 4416,
      avgOpenRate: 39.8,
      avgClickRate: 17.2
    }
    
    // Calculate changes between periods
    return {
      totalSubscribers: {
        value: currentData.totalSubscribers,
        change: calculatePercentChange(previousData.totalSubscribers, currentData.totalSubscribers)
      },
      activeSubscribers: {
        value: currentData.activeSubscribers,
        change: calculatePercentChange(previousData.activeSubscribers, currentData.activeSubscribers)
      },
      newSubscribers: {
        value: currentData.newSubscribers,
        change: calculatePercentChange(previousData.newSubscribers, currentData.newSubscribers)
      },
      unsubscribes: {
        value: currentData.unsubscribes,
        change: calculatePercentChange(previousData.unsubscribes, currentData.unsubscribes)
      },
      netGrowth: {
        value: currentData.netGrowth,
        change: calculatePercentChange(previousData.netGrowth, currentData.netGrowth)
      },
      growthRate: {
        value: currentData.growthRate,
        change: currentData.growthRate - previousData.growthRate
      },
      campaignsSent: {
        value: currentData.campaignsSent,
        change: calculatePercentChange(previousData.campaignsSent, currentData.campaignsSent)
      },
      totalEmailsSent: {
        value: currentData.totalEmailsSent,
        change: calculatePercentChange(previousData.totalEmailsSent, currentData.totalEmailsSent)
      },
      avgOpenRate: {
        value: currentData.avgOpenRate,
        change: currentData.avgOpenRate - previousData.avgOpenRate
      },
      avgClickRate: {
        value: currentData.avgClickRate,
        change: currentData.avgClickRate - previousData.avgClickRate
      }
    }
  }
  
  // If no comparison, just return current values
  return {
    totalSubscribers: { value: currentData.totalSubscribers },
    activeSubscribers: { value: currentData.activeSubscribers },
    newSubscribers: { value: currentData.newSubscribers },
    unsubscribes: { value: currentData.unsubscribes },
    netGrowth: { value: currentData.netGrowth },
    growthRate: { value: currentData.growthRate },
    campaignsSent: { value: currentData.campaignsSent },
    totalEmailsSent: { value: currentData.totalEmailsSent },
    avgOpenRate: { value: currentData.avgOpenRate },
    avgClickRate: { value: currentData.avgClickRate }
  }
}

/**
 * Generate subscriber growth data for charting
 */
function generateSubscriberGrowth(current, previous) {
  const durationDays = Math.round((current.end - current.start) / (1000 * 60 * 60 * 24))
  const dataPoints = Math.min(durationDays, 30) // Cap at 30 data points
  const interval = Math.max(1, Math.floor(durationDays / dataPoints))
  
  const currentData = []
  let subscriberCount = 1175 // Base value at start
  
  // Generate data points for current period
  for (let i = 0; i <= dataPoints; i++) {
    const date = new Date(current.start)
    date.setDate(current.start.getDate() + i * interval)
    
    if (date > current.end) break
    
    // Random daily growth between 1-5 subscribers
    const dailyGrowth = Math.floor(Math.random() * 5) + 1
    subscriberCount += dailyGrowth
    
    currentData.push({
      date: date.toISOString().split('T')[0],
      subscribers: subscriberCount
    })
  }
  
  // If comparison is requested, generate previous period data
  if (previous) {
    const previousData = []
    subscriberCount = 1104 // Base value at start of previous period
    
    // Generate data points for previous period
    for (let i = 0; i <= dataPoints; i++) {
      const date = new Date(previous.start)
      date.setDate(previous.start.getDate() + i * interval)
      
      if (date > previous.end) break
      
      // Random daily growth between 0-4 subscribers
      const dailyGrowth = Math.floor(Math.random() * 4)
      subscriberCount += dailyGrowth
      
      previousData.push({
        date: date.toISOString().split('T')[0],
        subscribers: subscriberCount
      })
    }
    
    return {
      current: currentData,
      previous: previousData
    }
  }
  
  return {
    current: currentData
  }
}

/**
 * Generate engagement metrics for the requested period
 */
function generateEngagementMetrics(current, previous) {
  const currentData = {
    byDay: [
      { day: 'Monday', openRate: 38.2, clickRate: 15.1 },
      { day: 'Tuesday', openRate: 43.7, clickRate: 18.5 },
      { day: 'Wednesday', openRate: 45.1, clickRate: 21.3 },
      { day: 'Thursday', openRate: 41.2, clickRate: 19.7 },
      { day: 'Friday', openRate: 39.8, clickRate: 17.2 },
      { day: 'Saturday', openRate: 32.4, clickRate: 14.5 },
      { day: 'Sunday', openRate: 34.6, clickRate: 13.8 }
    ],
    byTime: [
      { hour: '00:00-03:59', openRate: 22.7, clickRate: 8.3 },
      { hour: '04:00-07:59', openRate: 31.2, clickRate: 13.5 },
      { hour: '08:00-11:59', openRate: 48.5, clickRate: 22.1 },
      { hour: '12:00-15:59', openRate: 45.3, clickRate: 19.8 },
      { hour: '16:00-19:59', openRate: 39.7, clickRate: 17.3 },
      { hour: '20:00-23:59', openRate: 35.2, clickRate: 14.9 }
    ],
    byDevice: {
      desktop: 57.8,
      mobile: 35.4,
      tablet: 6.8
    },
    byLocation: [
      { country: 'United States', percentage: 68.7 },
      { country: 'United Kingdom', percentage: 12.3 },
      { country: 'Canada', percentage: 8.5 },
      { country: 'Australia', percentage: 4.2 },
      { country: 'Germany', percentage: 3.1 },
      { country: 'Other', percentage: 3.2 }
    ]
  }
  
  if (previous) {
    const previousData = {
      byDay: [
        { day: 'Monday', openRate: 36.1, clickRate: 14.3 },
        { day: 'Tuesday', openRate: 41.2, clickRate: 17.8 },
        { day: 'Wednesday', openRate: 43.7, clickRate: 20.5 },
        { day: 'Thursday', openRate: 40.3, clickRate: 18.9 },
        { day: 'Friday', openRate: 38.2, clickRate: 16.7 },
        { day: 'Saturday', openRate: 31.5, clickRate: 13.8 },
        { day: 'Sunday', openRate: 33.4, clickRate: 13.2 }
      ],
      byTime: [
        { hour: '00:00-03:59', openRate: 21.2, clickRate: 7.8 },
        { hour: '04:00-07:59', openRate: 29.8, clickRate: 12.7 },
        { hour: '08:00-11:59', openRate: 46.3, clickRate: 21.2 },
        { hour: '12:00-15:59', openRate: 43.5, clickRate: 18.9 },
        { hour: '16:00-19:59', openRate: 38.2, clickRate: 16.5 },
        { hour: '20:00-23:59', openRate: 33.7, clickRate: 14.1 }
      ],
      byDevice: {
        desktop: 60.3,
        mobile: 33.1,
        tablet: 6.6
      },
      byLocation: [
        { country: 'United States', percentage: 70.2 },
        { country: 'United Kingdom', percentage: 11.8 },
        { country: 'Canada', percentage: 8.3 },
        { country: 'Australia', percentage: 4.0 },
        { country: 'Germany', percentage: 2.9 },
        { country: 'Other', percentage: 2.8 }
      ]
    }
    
    // Calculate changes for day data
    const byDayWithChanges = currentData.byDay.map((dayData, index) => {
      const prevDay = previousData.byDay[index]
      return {
        day: dayData.day,
        openRate: {
          value: dayData.openRate,
          change: dayData.openRate - prevDay.openRate
        },
        clickRate: {
          value: dayData.clickRate,
          change: dayData.clickRate - prevDay.clickRate
        }
      }
    })
    
    // Calculate changes for time data
    const byTimeWithChanges = currentData.byTime.map((timeData, index) => {
      const prevTime = previousData.byTime[index]
      return {
        hour: timeData.hour,
        openRate: {
          value: timeData.openRate,
          change: timeData.openRate - prevTime.openRate
        },
        clickRate: {
          value: timeData.clickRate,
          change: timeData.clickRate - prevTime.clickRate
        }
      }
    })
    
    // Calculate changes for device data
    const byDeviceWithChanges = {
      desktop: {
        value: currentData.byDevice.desktop,
        change: currentData.byDevice.desktop - previousData.byDevice.desktop
      },
      mobile: {
        value: currentData.byDevice.mobile,
        change: currentData.byDevice.mobile - previousData.byDevice.mobile
      },
      tablet: {
        value: currentData.byDevice.tablet,
        change: currentData.byDevice.tablet - previousData.byDevice.tablet
      }
    }
    
    // Return engagement data with changes
    return {
      byDay: byDayWithChanges,
      byTime: byTimeWithChanges,
      byDevice: byDeviceWithChanges,
      byLocation: currentData.byLocation // Location data typically doesn't show period-over-period change
    }
  }
  
  // Return current data without changes
  return currentData
}

/**
 * Generate top performing campaigns
 */
function generateTopCampaigns(startDate, endDate, limit = 5) {
  // Mock campaign data
  const campaigns = [
    {
      id: 'camp_1',
      subject: 'July Newsletter: Summer Updates',
      sentAt: '2023-07-15T10:00:00Z',
      recipientCount: 850,
      openCount: 423,
      openRate: 49.8,
      clickCount: 187,
      clickRate: 22.0,
      unsubscribeCount: 5,
      unsubscribeRate: 0.6
    },
    {
      id: 'camp_2',
      subject: 'Welcome to Our Blog',
      sentAt: '2023-06-20T17:00:00Z',
      recipientCount: 157,
      openCount: 128,
      openRate: 81.5,
      clickCount: 98,
      clickRate: 62.4,
      unsubscribeCount: 2,
      unsubscribeRate: 1.3
    },
    {
      id: 'camp_3',
      subject: 'Special Feature: Summer Reading List',
      sentAt: '2023-07-02T15:00:00Z',
      recipientCount: 842,
      openCount: 521,
      openRate: 61.9,
      clickCount: 312,
      clickRate: 37.1,
      unsubscribeCount: 8,
      unsubscribeRate: 0.9
    },
    {
      id: 'camp_6',
      subject: 'June Newsletter: Getting Ready for Summer',
      sentAt: '2023-06-15T10:00:00Z',
      recipientCount: 812,
      openCount: 382,
      openRate: 47.0,
      clickCount: 165,
      clickRate: 20.3,
      unsubscribeCount: 7,
      unsubscribeRate: 0.9
    },
    {
      id: 'camp_7',
      subject: 'Tech Trends 2023: Mid-Year Update',
      sentAt: '2023-06-28T14:30:00Z',
      recipientCount: 458,
      openCount: 289,
      openRate: 63.1,
      clickCount: 185,
      clickRate: 40.4,
      unsubscribeCount: 3,
      unsubscribeRate: 0.7
    },
    {
      id: 'camp_8',
      subject: 'Industry Insights: Q2 2023 Report',
      sentAt: '2023-07-10T09:15:00Z',
      recipientCount: 567,
      openCount: 298,
      openRate: 52.6,
      clickCount: 134,
      clickRate: 23.6,
      unsubscribeCount: 4,
      unsubscribeRate: 0.7
    }
  ]
  
  // Filter campaigns within date range
  const filteredCampaigns = campaigns.filter(campaign => {
    const sentDate = new Date(campaign.sentAt)
    return sentDate >= startDate && sentDate <= endDate
  })
  
  // Sort by open rate to get top performing
  const sortedCampaigns = filteredCampaigns.sort((a, b) => b.openRate - a.openRate)
  
  // Return the top campaigns
  return sortedCampaigns.slice(0, limit)
}

/**
 * Generate demographic data about subscribers
 */
function generateDemographics() {
  return {
    segments: [
      { name: 'New Subscribers', count: 157, percentage: 12.6 },
      { name: 'Highly Engaged', count: 423, percentage: 33.8 },
      { name: 'Tech Interest', count: 289, percentage: 23.1 },
      { name: 'Marketing Interest', count: 178, percentage: 14.2 },
      { name: 'Design Interest', count: 125, percentage: 10.0 },
      { name: 'Other', count: 78, percentage: 6.2 }
    ],
    activity: [
      { level: 'Very Active (opened >80%)', count: 312, percentage: 25.0 },
      { level: 'Active (opened 50-80%)', count: 438, percentage: 35.0 },
      { level: 'Occasional (opened 20-50%)', count: 287, percentage: 23.0 },
      { level: 'Rare (opened <20%)', count: 138, percentage: 11.0 },
      { level: 'Inactive (never opened)', count: 75, percentage: 6.0 }
    ],
    subscriptionAge: [
      { period: '<30 days', count: 87, percentage: 7.0 },
      { period: '30-90 days', count: 176, percentage: 14.1 },
      { period: '90-180 days', count: 215, percentage: 17.2 },
      { period: '180-365 days', count: 389, percentage: 31.1 },
      { period: '>365 days', count: 383, percentage: 30.6 }
    ]
  }
}

/**
 * Generate delivery metrics
 */
function generateDeliveryMetrics(current, previous) {
  const currentData = {
    delivered: 99.2,
    bounced: 0.8,
    hardBounce: 0.3,
    softBounce: 0.5,
    spam: 0.1,
    averageSendTime: 13.4, // seconds
    deviceBreakdown: {
      desktop: 57.8,
      mobile: 35.4,
      tablet: 6.8
    },
    emailClientBreakdown: [
      { name: 'Gmail', percentage: 42.5 },
      { name: 'Apple Mail', percentage: 26.8 },
      { name: 'Outlook', percentage: 18.3 },
      { name: 'Yahoo Mail', percentage: 6.4 },
      { name: 'Other', percentage: 6.0 }
    ],
    deliveryByHour: [
      { hour: '00', count: 174, deliveryRate: 98.9 },
      { hour: '04', count: 312, deliveryRate: 99.4 },
      { hour: '08', count: 628, deliveryRate: 99.5 },
      { hour: '12', count: 745, deliveryRate: 99.3 },
      { hour: '16', count: 687, deliveryRate: 99.1 },
      { hour: '20', count: 426, deliveryRate: 98.7 }
    ]
  }
  
  if (previous) {
    const previousData = {
      delivered: 98.8,
      bounced: 1.2,
      hardBounce: 0.4,
      softBounce: 0.8,
      spam: 0.2,
      averageSendTime: 14.7, // seconds
      deviceBreakdown: {
        desktop: 60.3,
        mobile: 33.1,
        tablet: 6.6
      }
    }
    
    return {
      delivered: {
        value: currentData.delivered,
        change: currentData.delivered - previousData.delivered
      },
      bounced: {
        value: currentData.bounced,
        change: currentData.bounced - previousData.bounced
      },
      hardBounce: {
        value: currentData.hardBounce,
        change: currentData.hardBounce - previousData.hardBounce
      },
      softBounce: {
        value: currentData.softBounce,
        change: currentData.softBounce - previousData.softBounce
      },
      spam: {
        value: currentData.spam,
        change: currentData.spam - previousData.spam
      },
      averageSendTime: {
        value: currentData.averageSendTime,
        change: currentData.averageSendTime - previousData.averageSendTime
      },
      deviceBreakdown: {
        desktop: {
          value: currentData.deviceBreakdown.desktop,
          change: currentData.deviceBreakdown.desktop - previousData.deviceBreakdown.desktop
        },
        mobile: {
          value: currentData.deviceBreakdown.mobile,
          change: currentData.deviceBreakdown.mobile - previousData.deviceBreakdown.mobile
        },
        tablet: {
          value: currentData.deviceBreakdown.tablet,
          change: currentData.deviceBreakdown.tablet - previousData.deviceBreakdown.tablet
        }
      },
      emailClientBreakdown: currentData.emailClientBreakdown,
      deliveryByHour: currentData.deliveryByHour
    }
  }
  
  return currentData
}

/**
 * Calculate percent change between two values
 */
function calculatePercentChange(oldValue, newValue) {
  if (oldValue === 0) return null
  return ((newValue - oldValue) / oldValue) * 100
} 