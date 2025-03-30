import Link from 'next/link'

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/legal" className="text-yellow-500 hover:text-yellow-600">
          ← Back to Legal
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2>Introduction</h2>
        <p>
          At DevBlog, we respect your privacy and are committed to protecting your personal data. 
          This privacy policy explains how we collect, use, and share information about you when you 
          visit our website and interact with our content.
        </p>
        
        <h2>Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>
            <strong>Personal information</strong>: When you register for an account, we collect your name, 
            email address, and password.
          </li>
          <li>
            <strong>Usage data</strong>: We collect information about how you interact with our website, including 
            the pages you visit, the links you click, and the time you spend on each page.
          </li>
          <li>
            <strong>Device information</strong>: We collect information about the device you use to access our website, 
            including your IP address, browser type, operating system, and device identifiers.
          </li>
          <li>
            <strong>Cookies and similar technologies</strong>: We use cookies and similar technologies to track your 
            activity on our website and hold certain information. See our Cookie Policy for more details.
          </li>
        </ul>
        
        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Provide, maintain, and improve our website and services</li>
          <li>Create and maintain your account</li>
          <li>Process and complete transactions</li>
          <li>Send you technical notices, updates, security alerts, and support messages</li>
          <li>Respond to your comments, questions, and requests</li>
          <li>Personalize your experience on our website</li>
          <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
          <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
        </ul>
        
        <h2>Sharing Your Information</h2>
        <p>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following cases:</p>
        <ul>
          <li>With service providers who perform services on our behalf</li>
          <li>To comply with legal obligations</li>
          <li>To protect and defend our rights and property</li>
          <li>With your consent or at your direction</li>
        </ul>
        
        <h2>Data Security</h2>
        <p>
          We implement appropriate security measures to protect your personal information from unauthorized access, 
          alteration, disclosure, or destruction. However, no method of transmission over the Internet or method 
          of electronic storage is 100% secure, and we cannot guarantee absolute security.
        </p>
        
        <h2>Your Rights</h2>
        <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
        <ul>
          <li>The right to access the personal information we have about you</li>
          <li>The right to correct inaccurate personal information</li>
          <li>The right to delete your personal information</li>
          <li>The right to restrict or object to the processing of your personal information</li>
          <li>The right to data portability</li>
          <li>The right to withdraw consent</li>
        </ul>
        
        <h2>Changes to This Privacy Policy</h2>
        <p>
          We may update this privacy policy from time to time to reflect changes in our practices or for other 
          operational, legal, or regulatory reasons. We will notify you of any material changes by posting the 
          new privacy policy on this page and updating the &ldquo;Last updated&rdquo; date.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about this privacy policy or our privacy practices, please contact us at:
        </p>
        <p>
          <strong>Email</strong>: privacy@devblog.com<br />
          <strong>Address</strong>: 123 Tech Street, San Francisco, CA 94105
        </p>
      </div>
    </div>
  )
} 