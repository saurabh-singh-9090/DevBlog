'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Image from 'next/image'

export default function AboutPage() {
  const { user } = useAuth()
  const [expandedCompany, setExpandedCompany] = useState<string | null>('Allcaps')
  const [authorImage, setAuthorImage] = useState('author.png')

  useEffect(() => {
    // Set the author image to the admin's image if available
    if (user?.isAdmin && user?.image) {
      setAuthorImage(user.image)
    }
  }, [user])

  const toggleCompany = (company: string) => {
    if (expandedCompany === company) {
      setExpandedCompany(null)
    } else {
      setExpandedCompany(company)
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <h1 className="text-4xl font-bold mb-6">About the Author</h1>

        <div className="flex flex-col md:flex-row gap-8 my-8 bg-slate-50 dark:bg-slate-800 p-8 rounded-lg">
          <div className="md:w-1/3 flex flex-col items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg mb-4">
              <Image
                src={`/${authorImage}`}
                alt="Author Photo" 
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
            <div className="mt-6 flex flex-col space-y-2">
              <h3 className="text-xl font-semibold">Connect with me</h3>
              <a 
                href="https://saurabh-kumar-singh.netlify.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <svg width="24px" height="24px" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 1a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13zm4.894 4a5.527 5.527 0 0 0-3.053-2.676c.444.84.765 1.74.953 2.676h2.1zm.582 2.995A5.11 5.11 0 0 0 14 7.5a5.464 5.464 0 0 0-.213-1.5h-2.342c.032.331.055.664.055 1a10.114 10.114 0 0 1-.206 2h2.493c.095-.329.158-.665.19-1.005zm-3.535 0l.006-.051A9.04 9.04 0 0 0 10.5 7a8.994 8.994 0 0 0-.076-1H6.576A8.82 8.82 0 0 0 6.5 7a8.98 8.98 0 0 0 .233 2h3.534c.077-.332.135-.667.174-1.005zM10.249 5a8.974 8.974 0 0 0-1.255-2.97C8.83 2.016 8.666 2 8.5 2a3.62 3.62 0 0 0-.312.015l-.182.015L8 2.04A8.97 8.97 0 0 0 6.751 5h3.498zM5.706 5a9.959 9.959 0 0 1 .966-2.681A5.527 5.527 0 0 0 3.606 5h2.1zM3.213 6A5.48 5.48 0 0 0 3 7.5 5.48 5.48 0 0 0 3.213 9h2.493A10.016 10.016 0 0 1 5.5 7c0-.336.023-.669.055-1H3.213zm2.754 4h-2.36a5.515 5.515 0 0 0 3.819 2.893A10.023 10.023 0 0 1 5.967 10zM8.5 12.644A8.942 8.942 0 0 0 9.978 10H7.022A8.943 8.943 0 0 0 8.5 12.644zM11.033 10a10.024 10.024 0 0 1-1.459 2.893A5.517 5.517 0 0 0 13.393 10h-2.36z"/></svg>
                My Portfolio
              </a>
              <a 
                href="https://www.linkedin.com/in/saurabh-singh-kumar/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                </svg>
                LinkedIn Profile
              </a>
              <a 
                href="mailto:90360saurabh@gmail.com" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
                </svg>
                90360saurabh@gmail.com
              </a>
              <a 
                href="https://github.com/saurabh-singh-9090/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                </svg>
                GitHub Profile
              </a>
            </div>
          </div>
          <div className="md:w-2/3">
            <h3 className="text-2xl font-bold mb-4">Professional Experience</h3>
            
            {/* Experience accordions */}
            <div className="space-y-3">
              {/* Allcaps */}
              <div className="border rounded-md overflow-hidden dark:border-gray-700">
                <button 
                  className={`flex justify-between items-center w-full p-4 text-left ${
                    expandedCompany === 'Allcaps' 
                      ? 'bg-blue-50 dark:bg-blue-900/30' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => toggleCompany('Allcaps')}
                >
                  <div>
                    <h4 className="text-xl font-semibold">Founding Software Engineer</h4>
                    <p className="text-gray-600 dark:text-gray-400">Allcaps Teachnologies Pvt Ltd. | 2024 - Present</p>
                  </div>
                  {expandedCompany === 'Allcaps' ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {expandedCompany === 'Allcaps' && (
                  <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
                      <ul>
                        <li>• Developed frontend solutions for B2B SaaS AI-based product called Calm™ AI from end to end.</li>
                        <li>• Developed a scalable and maintainable codebase using NextJs, TypeScript and Tailwind Css.</li>
                        <li>• Integrated Sentry for monitoring client side errors and implemented an efficient error handling mechanism throughout the application.</li>
                        <li>• Integrated Mixpanel for analytics and implemented a robust analytics system to track user behavior and improve the overall user experience.</li>
                      </ul>
                  </div>
                )}
              </div>
              
              {/* KreditBee */}
              <div className="border rounded-md overflow-hidden dark:border-gray-700">
                <button 
                  className={`flex justify-between items-center w-full p-4 text-left ${
                    expandedCompany === 'InnovateSoft' 
                      ? 'bg-blue-50 dark:bg-blue-900/30' 
                      : 'bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => toggleCompany('InnovateSoft')}
                >
                  <div>
                    <h4 className="text-xl font-semibold">Software Developer</h4>
                    <p className="text-gray-600 dark:text-gray-400">KreditBee | 2023 - 2024</p>
                  </div>
                  {expandedCompany === 'InnovateSoft' ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </button>
                {expandedCompany === 'InnovateSoft' && (
                  <div className="p-4 border-t bg-white dark:bg-gray-800 dark:border-gray-700">
                    <ul>
                      <li>• Enhanced the Kreditbee website performance by 10% through optimizing the core web vitals and webpage assets.</li>
                      <li>• Introduced Video KYC Nudge in the Profile creation flow, utilized by over 1 Crore users on the KreditBee app.</li>
                      <li>• Implemented seamless integration of frontend solutions with backend developers for Video KYC processes and enhanced the Profile Re-verification system, optimizing the verification workflow.</li>
                      <li>• Implemented responsive design principles to enhance user experiences across devices and collaborated with cross-functional teams to develop user-friendly interfaces for financial products.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mt-8 mb-4">Qualifications</h3>
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Bachelor of Technology</h4>
              <p className="text-gray-600 dark:text-gray-400">IIIT Bhubaneswar | 2019 - 2023 | ECE</p>
            </div>
            
            <div className="mb-6">
              <h4 className="text-xl font-semibold">Senior Secondary (CBSE)</h4>
              <p className="text-gray-600 dark:text-gray-400">Sri Chaitanya, Vizag | 2018 | Science(PCM)</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-6 rounded-md my-8">
          <h3 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 mb-2">Connect with the Author</h3>
          <p className="mb-4">
            I&apos;m always open to discussing tech, software development opportunities, or potential collaborations. 
            Don&apos;t hesitate to reach out if you have questions about my articles or want to chat!
          </p>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://linkedin.com/in/yourusername" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Connect on LinkedIn
            </a>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Send Email
            </a>
          </div>
        </div>
      
      <div className="prose prose-lg max-w-none">
        <p>
          Welcome to DevBlog, a professional platform dedicated to sharing knowledge,
          insights, and best practices in software development. Our mission is to create 
          a community of learners and experts who can collaborate and grow together.
        </p><br/>
        
        <h2 className='text-xl font-semibold'>Our Mission</h2>
        <p>
          At DevBlog, we believe that knowledge should be accessible to everyone. 
          We strive to create high-quality, in-depth content that helps developers 
          of all skill levels improve their craft and stay updated with the latest 
          technologies and trends.
        </p><br/>
        
        <h2 className='text-xl font-semibold'>Our Team</h2>
        <p>
          Our team consists of passionate developers, technical writers, and industry 
          experts who are committed to creating valuable content. Each member brings 
          a unique perspective and expertise, ensuring a diverse range of topics and 
          approaches.
        </p><br/>
        
        <h2 className='text-xl font-semibold'>Join Our Community</h2>
        <p>
          We invite you to join our growing community of developers. Whether you&apos;re 
          a seasoned professional or just starting your journey, there&apos;s something 
          for everyone at DevBlog.
        </p><br/>
        <p className='text-lg font-bold'>
          You can contribute to our platform by:
        </p>
        <ul>
          <li>Submitting guest posts</li>
          <li>Engaging with our content through comments and discussions</li>
          <li>Sharing our articles with your network</li>
          <li>Providing feedback to help us improve</li>
        </ul><br/>
        
        <h2 className='text-xl font-semibold'>Contact Us</h2>
        <p>
          Have questions, suggestions, or feedback? We&apos;d love to hear from you! 
          Visit our <a href="/contact"><b>contact page</b></a> to get in touch.
        </p>

      </div>
    </div>
  )
}
