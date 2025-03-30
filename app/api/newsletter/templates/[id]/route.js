/**
 * @swagger
 * /api/newsletter/templates/{id}:
 *   get:
 *     description: Get details of a specific newsletter template (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the template
 *     responses:
 *       200:
 *         description: Template details
 *       401:
 *         description: Unauthorized - requires admin privileges
 *       404:
 *         description: Template not found
 *       500:
 *         description: Server error
 */
export async function GET(request, { params }) {
  try {
    const { id } = params
    
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
    
    // Mock template data
    const mockTemplates = {
      'tmpl_1': {
        id: 'tmpl_1',
        name: 'Standard Newsletter',
        description: 'Basic template for regular newsletters',
        createdAt: '2023-05-10T10:00:00Z',
        updatedAt: '2023-07-15T14:30:00Z',
        creator: {
          id: 'admin-1',
          name: 'Admin One'
        },
        previewImage: 'https://example.com/templates/standard_preview.jpg',
        lastUsed: '2023-07-27T09:15:00Z',
        usageCount: 12,
        category: 'general',
        tags: ['standard', 'general'],
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Standard Newsletter</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f6f6f6;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="padding: 20px; text-align: center; background-color: #0056b3;">
      <h1 style="color: white;">{{company_name}}</h1>
    </div>
    <div style="padding: 20px;">
      <h2>{{title}}</h2>
      <p>{{introduction}}</p>
      
      <div style="margin: 30px 0;">
        {{main_content}}
      </div>
      
      <div style="margin-top: 30px; border-top: 1px solid #eee; padding-top: 20px;">
        <p>Stay updated with our latest news and offers!</p>
        <p>Follow us on social media:</p>
        <div style="margin: 10px 0;">
          {{social_links}}
        </div>
      </div>
    </div>
    <div style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666;">
      <p>© {{current_year}} {{company_name}}. All rights reserved.</p>
      <p>{{unsubscribe_link}}</p>
    </div>
  </div>
</body>
</html>`
      },
      'tmpl_2': {
        id: 'tmpl_2',
        name: 'Welcome Email',
        description: 'Template for welcoming new subscribers',
        createdAt: '2023-05-20T09:45:00Z',
        updatedAt: '2023-06-12T11:20:00Z',
        creator: {
          id: 'admin-1',
          name: 'Admin One'
        },
        previewImage: 'https://example.com/templates/welcome_preview.jpg',
        lastUsed: '2023-07-25T16:30:00Z',
        usageCount: 157,
        category: 'onboarding',
        tags: ['welcome', 'onboarding'],
        html: `<!DOCTYPE html>
<html>
<head>
  <title>Welcome to {{company_name}}</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
    <div style="padding: 20px; text-align: center; background-color: #4CAF50;">
      <h1 style="color: white;">Welcome to {{company_name}}!</h1>
    </div>
    <div style="padding: 30px;">
      <h2>Hello {{subscriber_name}},</h2>
      <p>Thank you for subscribing to our newsletter. We're excited to have you join our community!</p>
      
      <div style="margin: 30px 0;">
        <h3>What to expect:</h3>
        <ul>
          <li>{{benefit_1}}</li>
          <li>{{benefit_2}}</li>
          <li>{{benefit_3}}</li>
        </ul>
      </div>
      
      <div style="margin: 30px 0; text-align: center;">
        <a href="{{cta_link}}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; display: inline-block;">{{cta_text}}</a>
      </div>
      
      <p>If you have any questions, feel free to reply to this email or contact our support team.</p>
      
      <div style="margin-top: 30px;">
        <p>Best regards,<br>The {{company_name}} Team</p>
      </div>
    </div>
    <div style="padding: 20px; background-color: #f0f0f0; text-align: center; font-size: 12px; color: #666;">
      <p>© {{current_year}} {{company_name}}. All rights reserved.</p>
      <p>{{unsubscribe_link}}</p>
    </div>
  </div>
</body>
</html>`
      }
    }
    
    // Check if the template exists
    if (!mockTemplates[id]) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Template not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Return template details
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Template retrieved successfully',
        data: mockTemplates[id]
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
        message: 'Failed to retrieve template',
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
 * /api/newsletter/templates/{id}:
 *   put:
 *     description: Update a specific newsletter template (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the template to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the template
 *               description:
 *                 type: string
 *                 description: Updated description of the template
 *               html:
 *                 type: string
 *                 description: Updated HTML content of the template
 *               category:
 *                 type: string
 *                 description: Updated category of the template
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated tags for the template
 *     responses:
 *       200:
 *         description: Template updated successfully
 *       400:
 *         description: Invalid input
 *       401:
 *         description: Unauthorized - requires admin privileges
 *       404:
 *         description: Template not found
 *       500:
 *         description: Server error
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params
    
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
    
    // Parse the request body
    const data = await request.json()
    
    // Mock template data
    const mockTemplates = {
      'tmpl_1': {
        id: 'tmpl_1',
        name: 'Standard Newsletter',
        description: 'Basic template for regular newsletters',
        createdAt: '2023-05-10T10:00:00Z',
        updatedAt: '2023-07-15T14:30:00Z',
        creator: {
          id: 'admin-1',
          name: 'Admin One'
        },
        previewImage: 'https://example.com/templates/standard_preview.jpg',
        lastUsed: '2023-07-27T09:15:00Z',
        usageCount: 12,
        category: 'general',
        tags: ['standard', 'general'],
        html: '<!DOCTYPE html><html><head><title>Standard Newsletter</title></head><body>Standard newsletter template content</body></html>'
      },
      'tmpl_2': {
        id: 'tmpl_2',
        name: 'Welcome Email',
        description: 'Template for welcoming new subscribers',
        createdAt: '2023-05-20T09:45:00Z',
        updatedAt: '2023-06-12T11:20:00Z',
        creator: {
          id: 'admin-1',
          name: 'Admin One'
        },
        previewImage: 'https://example.com/templates/welcome_preview.jpg',
        lastUsed: '2023-07-25T16:30:00Z',
        usageCount: 157,
        category: 'onboarding',
        tags: ['welcome', 'onboarding'],
        html: '<!DOCTYPE html><html><head><title>Welcome Email</title></head><body>Welcome email template content</body></html>'
      }
    }
    
    // Check if the template exists
    if (!mockTemplates[id]) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Template not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation:
    // 1. Validate and sanitize HTML content if provided
    // 2. Generate a new preview image if HTML changed
    // 3. Update the template in the database
    
    // Mock the update by combining existing data with updates
    const template = mockTemplates[id]
    
    const updatedTemplate = {
      ...template,
      name: data.name !== undefined ? data.name : template.name,
      description: data.description !== undefined ? data.description : template.description,
      html: data.html !== undefined ? data.html : template.html,
      category: data.category !== undefined ? data.category : template.category,
      tags: data.tags !== undefined ? data.tags : template.tags,
      updatedAt: new Date().toISOString()
    }
    
    // Return the updated template (without the full HTML content for brevity)
    const templateResponse = { ...updatedTemplate }
    delete templateResponse.html
    templateResponse.htmlExcerpt = updatedTemplate.html.substring(0, 100) + '...'
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Template updated successfully',
        data: templateResponse
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
        message: 'Failed to update template',
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
 * /api/newsletter/templates/{id}:
 *   delete:
 *     description: Delete a newsletter template (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the template to delete
 *     responses:
 *       200:
 *         description: Template deleted successfully
 *       401:
 *         description: Unauthorized - requires admin privileges
 *       404:
 *         description: Template not found
 *       409:
 *         description: Conflict - template is in use
 *       500:
 *         description: Server error
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params
    
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
    
    // Mock template data
    const mockTemplates = {
      'tmpl_1': {
        id: 'tmpl_1',
        name: 'Standard Newsletter',
        usageCount: 12,
        isDefault: true
      },
      'tmpl_2': {
        id: 'tmpl_2',
        name: 'Welcome Email',
        usageCount: 157,
        isDefault: false
      },
      'tmpl_3': {
        id: 'tmpl_3',
        name: 'Product Announcement',
        usageCount: 3,
        isDefault: false
      },
      'tmpl_6': {
        id: 'tmpl_6',
        name: 'Content Newsletter',
        usageCount: 0,
        isDefault: false
      }
    }
    
    // Check if the template exists
    if (!mockTemplates[id]) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Template not found'
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // In a real implementation:
    // 1. Check if the template is being used in any scheduled newsletters or automations
    // 2. Prevent deletion if it's being referenced
    // 3. Delete the template from the database
    
    // Check if template is default
    if (mockTemplates[id].isDefault) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Cannot delete a default template'
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // Check if template is still in use
    if (mockTemplates[id].usageCount > 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: `Cannot delete a template that is in use (used in ${mockTemplates[id].usageCount} newsletters)`
        }),
        {
          status: 409,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
    }
    
    // For the mock, we just acknowledge the deletion
    const deletedTemplate = mockTemplates[id]
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Template deleted successfully',
        data: {
          id: deletedTemplate.id,
          name: deletedTemplate.name,
          deletedAt: new Date().toISOString()
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
        message: 'Failed to delete template',
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