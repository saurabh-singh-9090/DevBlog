import Link from 'next/link'

export default function LegalPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Legal Information</h1>
      
      <p className="mb-8 text-muted-foreground">
        Welcome to our legal information center. Here you can find our policies regarding privacy, terms of service, 
        and cookie usage. If you have any questions about these policies, please contact us.
      </p>
      
      <div className="grid gap-6">
        <div className="border rounded-lg p-6 hover:border-yellow-500 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Privacy Policy</h2>
          <p className="text-muted-foreground mb-4">
            Learn how we collect, use, and protect your personal information when you use our services.
          </p>
          <Link 
            href="/legal/privacy-policy" 
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Read Privacy Policy →
          </Link>
        </div>
        
        <div className="border rounded-lg p-6 hover:border-yellow-500 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Terms of Service</h2>
          <p className="text-muted-foreground mb-4">
            Our terms and conditions for using DevBlog including content guidelines and user responsibilities.
          </p>
          <Link 
            href="/legal/terms-of-service" 
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Read Terms of Service →
          </Link>
        </div>
        
        <div className="border rounded-lg p-6 hover:border-yellow-500 transition-colors">
          <h2 className="text-2xl font-semibold mb-2">Cookie Policy</h2>
          <p className="text-muted-foreground mb-4">
            Information about how we use cookies and similar technologies on our website.
          </p>
          <Link 
            href="/legal/cookie-policy" 
            className="text-yellow-500 hover:text-yellow-600 font-medium"
          >
            Read Cookie Policy →
          </Link>
        </div>
      </div>
    </div>
  )
} 