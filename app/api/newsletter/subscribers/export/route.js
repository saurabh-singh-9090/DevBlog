/**
 * @swagger
 * /api/newsletter/subscribers/export:
 *   get:
 *     description: Export subscribers data (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, csv]
 *           default: csv
 *         description: Export format
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [active, unsubscribed, all]
 *           default: all
 *         description: Filter by subscription status
 *       - in: query
 *         name: segmentId
 *         schema:
 *           type: string
 *         description: Filter by segment ID
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter subscribers from this date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter subscribers to this date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Subscribers data exported successfully
 *       400:
 *         description: Invalid input
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
    
    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const format = searchParams.get('format') || 'csv'
    const status = searchParams.get('status') || 'all'
    const segmentId = searchParams.get('segmentId')
    const fromDate = searchParams.get('from')
    const toDate = searchParams.get('to')
    
    // Validate format
    if (!['csv', 'json'].includes(format)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid format. Supported formats are: csv, json'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate status
    if (!['active', 'unsubscribed', 'all'].includes(status)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid status. Supported values are: active, unsubscribed, all'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock subscriber data
    const mockSubscribers = [
      {
        id: 'sub_1',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        status: 'active',
        subscribedAt: '2023-07-15T10:00:00Z',
        segments: ['seg_1'],
        lastOpenedAt: '2023-07-25T16:45:00Z',
        lastClickedAt: '2023-07-25T16:47:30Z',
        emailsSent: 3,
        emailsOpened: 3,
        linksClicked: 2,
        openRate: 100,
        clickRate: 66.7
      },
      {
        id: 'sub_2',
        email: 'jane@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        status: 'active',
        subscribedAt: '2023-07-20T14:30:00Z',
        segments: ['seg_1', 'seg_2'],
        lastOpenedAt: '2023-07-27T11:20:00Z',
        lastClickedAt: '2023-07-27T11:22:15Z',
        emailsSent: 2,
        emailsOpened: 2,
        linksClicked: 2,
        openRate: 100,
        clickRate: 100
      },
      {
        id: 'sub_3',
        email: 'alex@example.com',
        firstName: 'Alex',
        lastName: 'Johnson',
        status: 'active',
        subscribedAt: '2023-06-10T09:45:00Z',
        segments: ['seg_2', 'seg_3'],
        lastOpenedAt: '2023-07-26T14:10:00Z',
        lastClickedAt: '2023-07-26T14:15:30Z',
        emailsSent: 6,
        emailsOpened: 6,
        linksClicked: 5,
        openRate: 100,
        clickRate: 83.3
      },
      {
        id: 'sub_4',
        email: 'sarah@example.com',
        firstName: 'Sarah',
        lastName: 'Wilson',
        status: 'active',
        subscribedAt: '2023-06-15T08:20:00Z',
        segments: ['seg_2'],
        lastOpenedAt: '2023-07-24T09:30:00Z',
        lastClickedAt: '2023-07-24T09:32:10Z',
        emailsSent: 5,
        emailsOpened: 5,
        linksClicked: 4,
        openRate: 100,
        clickRate: 80
      },
      {
        id: 'sub_5',
        email: 'michael@example.com',
        firstName: 'Michael',
        lastName: 'Brown',
        status: 'active',
        subscribedAt: '2023-06-20T16:30:00Z',
        segments: ['seg_1', 'seg_3'],
        lastOpenedAt: '2023-07-23T13:15:00Z',
        lastClickedAt: '2023-07-23T13:17:45Z',
        emailsSent: 4,
        emailsOpened: 3,
        linksClicked: 2,
        openRate: 75,
        clickRate: 66.7
      },
      {
        id: 'sub_6',
        email: 'lisa@example.com',
        firstName: 'Lisa',
        lastName: 'Davis',
        status: 'active',
        subscribedAt: '2023-06-25T12:10:00Z',
        segments: ['seg_1', 'seg_2', 'seg_3'],
        lastOpenedAt: '2023-07-22T10:40:00Z',
        lastClickedAt: '2023-07-22T10:43:20Z',
        emailsSent: 3,
        emailsOpened: 2,
        linksClicked: 1,
        openRate: 66.7,
        clickRate: 50
      },
      {
        id: 'sub_7',
        email: 'robert@example.com',
        firstName: 'Robert',
        lastName: 'Taylor',
        status: 'unsubscribed',
        subscribedAt: '2023-06-01T10:30:00Z',
        unsubscribedAt: '2023-07-10T14:25:00Z',
        unsubscribeReason: 'Too many emails',
        segments: [],
        lastOpenedAt: '2023-07-05T16:20:00Z',
        lastClickedAt: null,
        emailsSent: 4,
        emailsOpened: 2,
        linksClicked: 0,
        openRate: 50,
        clickRate: 0
      },
      {
        id: 'sub_8',
        email: 'emily@example.com',
        firstName: 'Emily',
        lastName: 'White',
        status: 'unsubscribed',
        subscribedAt: '2023-06-05T09:20:00Z',
        unsubscribedAt: '2023-07-12T11:15:00Z',
        unsubscribeReason: 'Not interested anymore',
        segments: [],
        lastOpenedAt: '2023-07-08T14:10:00Z',
        lastClickedAt: '2023-07-08T14:12:30Z',
        emailsSent: 3,
        emailsOpened: 2,
        linksClicked: 1,
        openRate: 66.7,
        clickRate: 50
      }
    ]
    
    // Filter by status
    let filteredSubscribers = mockSubscribers
    if (status !== 'all') {
      filteredSubscribers = mockSubscribers.filter(subscriber => subscriber.status === status)
    }
    
    // Filter by segment
    if (segmentId) {
      filteredSubscribers = filteredSubscribers.filter(subscriber => 
        subscriber.segments && subscriber.segments.includes(segmentId)
      )
    }
    
    // Filter by date range
    if (fromDate) {
      const fromDateTime = new Date(fromDate).getTime()
      filteredSubscribers = filteredSubscribers.filter(subscriber => 
        new Date(subscriber.subscribedAt).getTime() >= fromDateTime
      )
    }
    
    if (toDate) {
      const toDateTime = new Date(toDate).getTime() + (24 * 60 * 60 * 1000 - 1) // End of the day
      filteredSubscribers = filteredSubscribers.filter(subscriber => 
        new Date(subscriber.subscribedAt).getTime() <= toDateTime
      )
    }
    
    // Generate export data based on format
    let exportData
    let contentType
    let filename
    
    if (format === 'json') {
      exportData = JSON.stringify(filteredSubscribers, null, 2)
      contentType = 'application/json'
      filename = `subscribers_export_${new Date().toISOString().split('T')[0]}.json`
    } else {
      // CSV format
      // Define CSV headers
      const headers = [
        'id',
        'email',
        'firstName',
        'lastName',
        'status',
        'subscribedAt',
        'unsubscribedAt',
        'unsubscribeReason',
        'segments',
        'lastOpenedAt',
        'lastClickedAt',
        'emailsSent',
        'emailsOpened',
        'linksClicked',
        'openRate',
        'clickRate'
      ]
      
      // Create CSV content with headers
      let csvContent = headers.join(',') + '\n'
      
      // Add each subscriber row
      filteredSubscribers.forEach(subscriber => {
        const row = [
          subscriber.id,
          subscriber.email,
          escapeCsvValue(subscriber.firstName || ''),
          escapeCsvValue(subscriber.lastName || ''),
          subscriber.status,
          subscriber.subscribedAt,
          subscriber.unsubscribedAt || '',
          escapeCsvValue(subscriber.unsubscribeReason || ''),
          (subscriber.segments || []).join(';'),
          subscriber.lastOpenedAt || '',
          subscriber.lastClickedAt || '',
          subscriber.emailsSent || 0,
          subscriber.emailsOpened || 0,
          subscriber.linksClicked || 0,
          subscriber.openRate || 0,
          subscriber.clickRate || 0
        ]
        
        csvContent += row.join(',') + '\n'
      })
      
      exportData = csvContent
      contentType = 'text/csv'
      filename = `subscribers_export_${new Date().toISOString().split('T')[0]}.csv`
    }
    
    // In a real app, this would generate a download rather than just returning the data
    // For API purposes, we'll return the data directly
    
    // Add export summary in the response headers
    const headers = new Headers()
    headers.set('Content-Type', contentType)
    headers.set('Content-Disposition', `attachment; filename="${filename}"`)
    headers.set('X-Export-Count', filteredSubscribers.length.toString())
    headers.set('X-Export-Date', new Date().toISOString())
    
    return new Response(exportData, {
      status: 200,
      headers
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to export subscribers',
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
 * Helper function to escape CSV values that contain commas, quotes, or newlines
 */
function escapeCsvValue(value) {
  if (typeof value !== 'string') {
    return value
  }
  
  // If the value contains a comma, double quote, or newline, wrap it in double quotes
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    // Double up any double quotes to escape them
    return `"${value.replace(/"/g, '""')}"`
  }
  
  return value
} 