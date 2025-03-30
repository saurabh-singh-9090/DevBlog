/**
 * @swagger
 * /api/health:
 *   get:
 *     description: Health check endpoint to verify the service is running
 *     responses:
 *       200:
 *         description: Service is healthy
 *       500:
 *         description: Service is unhealthy
 */
export async function GET() {
  try {
    // In a real implementation, you might check:
    // 1. Database connectivity
    // 2. External service dependencies
    // 3. System resources (memory, disk space, etc.)
    // 4. Application metrics
    
    // For this mock implementation, we'll just return a success response
    
    // Get system information
    const healthInfo = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      // In a real implementation, you would include more detailed health checks
      checks: {
        database: 'connected',
        api: 'operational',
        cache: 'operational',
        storage: 'operational'
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Service is healthy',
        data: healthInfo
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          // Don't cache health check responses to ensure fresh status
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  } catch (error) {
    // If any part of the health check fails, return an error response
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Service is unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate'
        }
      }
    )
  }
} 