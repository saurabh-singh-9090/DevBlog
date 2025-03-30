/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     description: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input data or email already in use
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'password']
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
    
    // Validate password strength (minimum 6 characters)
    if (data.password.length < 6) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Password must be at least 6 characters long'
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
    // 1. Check if the email is already in use
    // 2. Hash the password
    // 3. Create the user in the database
    
    // For our mock implementation, we'll simulate checking if the email exists
    const existingEmails = ['admin@example.com', 'user@example.com']
    if (existingEmails.includes(data.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email already in use'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Mock successful response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'User registered successfully',
        data: {
          id: Math.random().toString(36).substring(2, 9),
          name: data.name,
          email: data.email,
          isAdmin: false,
          createdAt: new Date().toISOString()
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
        message: 'Registration failed',
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