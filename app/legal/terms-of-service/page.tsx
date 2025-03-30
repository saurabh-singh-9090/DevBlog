import Link from 'next/link'

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Link href="/legal" className="text-yellow-500 hover:text-yellow-600">
          ← Back to Legal
        </Link>
      </div>
      
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p>Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
        
        <h2>Introduction</h2>
        <p>
          Welcome to DevBlog. By accessing or using our website, you agree to be bound by these Terms of Service 
          (&ldquo;Terms&rdquo;). If you do not agree to all the terms and conditions of this agreement, then you may not 
          access the website or use any services.
        </p>
        
        <h2>Use of Our Services</h2>
        <p>
          You must follow any policies made available to you within the Services. You may use our Services only as 
          permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms 
          or policies or if we are investigating suspected misconduct.
        </p>
        
        <h2>Account Registration</h2>
        <p>
          When you create an account with us, you must provide information that is accurate, complete, and current 
          at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination 
          of your account.
        </p>
        <p>
          You are responsible for safeguarding the password that you use to access our Services and for any activities 
          or actions under your password. You agree not to disclose your password to any third party. You must notify 
          us immediately upon becoming aware of any breach of security or unauthorized use of your account.
        </p>
        
        <h2>User Content</h2>
        <p>
          Our Services allow you to post, link, store, share and otherwise make available certain information, text, 
          graphics, videos, or other material (&ldquo;Content&rdquo;). You are responsible for the Content that you post on or 
          through our Services, including its legality, reliability, and appropriateness.
        </p>
        <p>
          By posting Content on or through our Services, you represent and warrant that: (i) the Content is yours 
          and/or you have the right to use it and the right to grant us the rights and license as provided in these 
          Terms, and (ii) that the posting of your Content on or through our Services does not violate the privacy 
          rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
        </p>
        
        <h2>Intellectual Property</h2>
        <p>
          Our Services and its original content (excluding Content provided by users), features and functionality are 
          and will remain the exclusive property of DevBlog and its licensors. Our Services are protected by copyright, 
          trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress 
          may not be used in connection with any product or service without the prior written consent of DevBlog.
        </p>
        
        <h2>Links To Other Web Sites</h2>
        <p>
          Our Services may contain links to third-party websites or services that are not owned or controlled by DevBlog.
        </p>
        <p>
          DevBlog has no control over, and assumes no responsibility for, the content, privacy policies, or practices 
          of any third-party websites or services. You further acknowledge and agree that DevBlog shall not be responsible 
          or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection 
          with the use of or reliance on any such content, goods or services available on or through any such websites 
          or services.
        </p>
        
        <h2>Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason 
          whatsoever, including without limitation if you breach the Terms.
        </p>
        <p>
          Upon termination, your right to use our Services will immediately cease. If you wish to terminate your 
          account, you may simply discontinue using our Services.
        </p>
        
        <h2>Limitation of Liability</h2>
        <p>
          In no event shall DevBlog, nor its directors, employees, partners, agents, suppliers, or affiliates, be 
          liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, 
          loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of 
          or inability to access or use our Services; (ii) any conduct or content of any third party on our Services; 
          (iii) any content obtained from our Services; and (iv) unauthorized access, use or alteration of your transmissions 
          or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether 
          or not we have been informed of the possibility of such damage.
        </p>
        
        <h2>Changes</h2>
        <p>
          We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is 
          material we will try to provide at least 30 days notice prior to any new terms taking effect. What constitutes 
          a material change will be determined at our sole discretion.
        </p>
        
        <h2>Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          <strong>Email</strong>: legal@devblog.com<br />
          <strong>Address</strong>: 123 Tech Street, San Francisco, CA 94105
        </p>
      </div>
    </div>
  )
} 