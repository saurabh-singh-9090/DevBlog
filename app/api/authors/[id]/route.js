/**
 * @swagger
 * /api/authors/{id}:
 *   get:
 *     description: Returns a specific author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the author
 *     responses:
 *       200:
 *         description: A single author
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { id } = params
    
    // In a real implementation, fetch the author from a database
    // For now, we'll use mock data
    const mockAuthors = [
      { 
        id: '1', 
        name: 'John Doe', 
        email: 'john@example.com',
        bio: 'Tech enthusiast and software developer with 10+ years of experience.',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        twitter: '@johndoe',
        github: 'johndoe'
      },
      { 
        id: '2', 
        name: 'Jane Smith', 
        email: 'jane@example.com',
        bio: 'UX designer and front-end developer specializing in accessible web design.',
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        twitter: '@janesmith',
        github: 'janesmith'
      },
      { 
        id: '3', 
        name: 'Mike Johnson', 
        email: 'mike@example.com',
        bio: 'Data scientist and AI researcher focused on machine learning applications.',
        avatarUrl: 'https://i.pravatar.cc/150?img=3',
        twitter: '@mikejohnson',
        github: 'mikejohnson'
      }
    ]
    
    const author = mockAuthors.find(author => author.id === id)
    
    if (!author) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Author not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Author fetched successfully',
        data: author
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
        message: 'Failed to fetch author',
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
 * /api/authors/{id}:
 *   put:
 *     description: Updates a specific author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the author to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the author
 *               email:
 *                 type: string
 *                 description: Email of the author
 *               bio:
 *                 type: string
 *                 description: Author biography
 *               avatarUrl:
 *                 type: string
 *                 description: URL to the author's avatar image
 *               twitter:
 *                 type: string
 *                 description: Author's Twitter handle
 *               github:
 *                 type: string
 *                 description: Author's GitHub username
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params
    
    // In a real implementation:
    // 1. Validate user authentication (admin role or self-update)
    // 2. Parse request body
    const data = await request.json()
    
    // 3. Validate fields
    if (data.email) {
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
    }
    
    // 4. Check if the author exists and update it
    // For this mock, we'll just return a success response
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Author updated successfully',
        data: {
          id,
          name: data.name || 'John Doe',
          email: data.email || 'john@example.com',
          bio: data.bio || 'Tech enthusiast and software developer.',
          avatarUrl: data.avatarUrl || 'https://i.pravatar.cc/150?img=1',
          twitter: data.twitter || '@johndoe',
          github: data.github || 'johndoe',
          updatedAt: new Date().toISOString()
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
        message: 'Failed to update author',
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
 * /api/authors/{id}:
 *   delete:
 *     description: Deletes a specific author
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the author to delete
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       401:
 *         description: Unauthorized - user not authenticated or not an admin
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
    // In a real implementation:
    // 1. Validate user authentication (admin role)
    // 2. Check if the author exists
    // 3. Check if the author has blog posts and handle them
    // 4. Delete the author from the database
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Author deleted successfully',
        data: { id }
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
        message: 'Failed to delete author',
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