/**
 * @swagger
 * /api/contact:
 *   post:
 *     description: Submits a contact form message
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - message
 *             properties:
 *               name:
 *                 type: string
 *                 description: Sender's name
 *               email:
 *                 type: string
 *                 description: Sender's email address
 *               subject:
 *                 type: string
 *                 description: Message subject (optional)
 *               message:
 *                 type: string
 *                 description: Message content
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'message']
    for (const field of requiredFields) {
      if (!data[field]) {
        return new Response(
          JSON.stringify({
            success: false,
            message: `${field} is required`
          }),
          {
            status: 400,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email format'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Validate message length
    if (data.message.length < 10) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Message must be at least 10 characters long'
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
    // 1. Apply spam filtering
    // 2. Send the message via email
    // 3. Store the message in a database for admin review
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon!',
        data: {
          id: Math.random().toString(36).substring(2, 9),
          name: data.name,
          email: data.email,
          subject: data.subject || 'Contact Form Submission',
          message: data.message,
          submittedAt: new Date().toISOString()
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
        message: 'Failed to send message',
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