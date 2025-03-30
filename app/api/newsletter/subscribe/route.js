/**
 * @swagger
 * /api/newsletter/subscribe:
 *   post:
 *     description: Subscribe to the newsletter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address to subscribe
 *               firstName:
 *                 type: string
 *                 description: Subscriber's first name (optional)
 *               lastName:
 *                 type: string
 *                 description: Subscriber's last name (optional)
 *     responses:
 *       201:
 *         description: Successfully subscribed to the newsletter
 *       400:
 *         description: Invalid email address or email already subscribed
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate email is provided
    if (!data.email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email address is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address format'
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
    // 1. Check if the email is already subscribed
    // 2. Add the email to the newsletter database or send to email service (e.g., Mailchimp, SendGrid)
    // 3. Send a confirmation email to the subscriber
    
    // Mock list of existing subscribers to check for duplicates
    const mockSubscribers = [
      { email: 'john@example.com', firstName: 'John', lastName: 'Doe' },
      { email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith' },
      { email: 'test@example.com', firstName: 'Test', lastName: 'User' }
    ]
    
    // Check if email is already subscribed
    const isEmailSubscribed = mockSubscribers.some(
      subscriber => subscriber.email.toLowerCase() === data.email.toLowerCase()
    )
    
    if (isEmailSubscribed) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'This email address is already subscribed to our newsletter'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Create new subscriber
    const newSubscriber = {
      email: data.email,
      firstName: data.firstName || '',
      lastName: data.lastName || '',
      subscribedAt: new Date().toISOString(),
      source: 'website',
      status: 'active'
    }
    
    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Successfully subscribed to the newsletter',
        data: {
          email: newSubscriber.email,
          subscribedAt: newSubscriber.subscribedAt
        }
      }),
      {
        status: 201,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Failed to process subscription',
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
 * /api/newsletter/subscribe:
 *   get:
 *     description: Check if an email is subscribed to the newsletter
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           format: email
 *         required: true
 *         description: Email address to check
 *     responses:
 *       200:
 *         description: Subscription status
 *       400:
 *         description: Invalid email address
 *       500:
 *         description: Server error
 */
export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    
    // Validate email is provided
    if (!email) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email address is required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email address format'
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
    // Check the newsletter database or email service for the subscription status
    
    // Mock list of subscribers
    const mockSubscribers = [
      { email: 'john@example.com', firstName: 'John', lastName: 'Doe', status: 'active', subscribedAt: '2023-01-15T10:00:00Z' },
      { email: 'jane@example.com', firstName: 'Jane', lastName: 'Smith', status: 'active', subscribedAt: '2023-03-22T14:30:00Z' },
      { email: 'test@example.com', firstName: 'Test', lastName: 'User', status: 'unsubscribed', subscribedAt: '2023-02-10T09:45:00Z' }
    ]
    
    // Check if email is in the subscribers list
    const subscriber = mockSubscribers.find(
      sub => sub.email.toLowerCase() === email.toLowerCase()
    )
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Subscription status retrieved successfully',
        data: {
          isSubscribed: !!subscriber && subscriber.status === 'active',
          status: subscriber ? subscriber.status : 'not_found',
          subscriber: subscriber ? {
            email: subscriber.email,
            firstName: subscriber.firstName,
            lastName: subscriber.lastName,
            subscribedAt: subscriber.subscribedAt
          } : null
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
        message: 'Failed to check subscription status',
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