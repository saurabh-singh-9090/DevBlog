import Link from 'next/link'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'

export function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-background">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-500 to-yellow-300 bg-clip-text text-transparent">
              DevBlog
            </h3>
            <p className="max-w-sm text-muted-foreground">
              A professional blog for developers sharing insights, tutorials, and best practices
              in software development.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaGithub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-2">
            <div className="space-y-3">
              <h4 className="text-base font-medium">Navigation</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Categories</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/category/react" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    React
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/javascript" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    JavaScript
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/category/typescript" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    TypeScript
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-base font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link 
                    href="/legal/privacy-policy" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/legal/terms-of-service" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/legal/cookie-policy" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {currentYear} DevBlog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
