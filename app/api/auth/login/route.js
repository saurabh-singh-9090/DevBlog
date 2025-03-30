/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     description: Authenticates a user and returns a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Authentication successful
 *       400:
 *         description: Invalid credentials or missing fields
 *       500:
 *         description: Server error
 */
export async function POST(request) {
  try {
    // Parse the request body
    const data = await request.json()
    
    // Validate required fields
    if (!data.email || !data.password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email and password are required'
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation, you would verify the credentials against a database
    // For this mock, we'll use hardcoded credentials as defined in lib/auth/auth.ts
    
    const { email, password } = data
    
    // Check for admin credentials
    if (email === 'admin@example.com' && password === 'admin123') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Authentication successful',
          data: {
            user: {
              id: '1',
              name: 'Admin',
              email: 'admin@example.com',
              isAdmin: true,
              image: ''
            },
            token: 'mock-admin-token' // In a real app, this would be a JWT
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Check for regular user credentials
    if (email === 'user@example.com' && password === 'user123') {
      return new Response(
        JSON.stringify({
          success: true,
          message: 'Authentication successful',
          data: {
            user: {
              id: '2',
              name: 'User',
              email: 'user@example.com',
              isAdmin: false,
              image: ''
            },
            token: 'mock-user-token' // In a real app, this would be a JWT
          }
        }),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Invalid credentials
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Invalid email or password'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Authentication failed',
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
