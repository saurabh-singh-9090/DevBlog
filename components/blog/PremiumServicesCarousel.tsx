"use client"

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { HiChevronRight } from 'react-icons/hi'
import { FaLaptopCode, FaChalkboardTeacher } from 'react-icons/fa'
import { RiRocketLine } from 'react-icons/ri'

type PremiumService = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  hoverColor: string;
  gradient: string;
  link: string;
  companies?: string[];
}

export function PremiumServicesCarousel() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [, setScrollPosition] = useState(0)
  const [, setMaxScroll] = useState(0)

  useEffect(() => {
    if (containerRef.current) {
      setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setMaxScroll(containerRef.current.scrollWidth - containerRef.current.clientWidth)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleScroll = () => {
    if (containerRef.current) {
      setScrollPosition(containerRef.current.scrollLeft)
    }
  }

  const premiumServices: PremiumService[] = [
    {
      id: "mock-interviews",
      title: "Want mock interviews?",
      description: "Practice with experienced interviewers from top companies to improve your technical interview skills.",
      icon: <FaLaptopCode className="w-8 h-8" />,
      color: "bg-gradient-to-r from-indigo-600 to-purple-600",
      hoverColor: "bg-gradient-to-r from-indigo-700 to-purple-700",
      gradient: "from-indigo-600 to-purple-600",
      link: "/premium/mock-interviews",
      companies: ["aws", "google", "microsoft", "accenture", "databricks", "coinbase"]
    },
    {
      id: "career-guidance",
      title: "Need career guidance?",
      description: "Get personalized advice from industry experts to navigate your career path and growth.",
      icon: <RiRocketLine className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      hoverColor: "bg-gradient-to-r from-blue-600 to-cyan-600",
      gradient: "from-blue-500 to-cyan-500",
      link: "/premium/career-guidance",
      companies: ["aws", "google", "microsoft", "accenture", "databricks", "coinbase"]
    },
    {
      id: "interview-experiences",
      title: "Real interview experiences?",
      description: "Read about real interview experiences from candidates who interviewed at top tech companies.",
      icon: <FaChalkboardTeacher className="w-8 h-8" />,
      color: "bg-gradient-to-r from-emerald-500 to-teal-500",
      hoverColor: "bg-gradient-to-r from-emerald-600 to-teal-600",
      gradient: "from-emerald-500 to-teal-500",
      link: "/interview-experiences",
      companies: ["aws", "google", "microsoft", "accenture", "databricks", "coinbase"]
    }
  ]

  return (
    <div className="py-8 bg-gray-50 dark:bg-gray-900">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* <h2 className="text-2xl font-bold mb-6">Premium Services</h2> */}
        
        <div className="relative">
          <div 
            ref={containerRef} 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            onScroll={handleScroll}
          >
            {premiumServices.map((service) => (
              <Link 
                key={service.id} 
                href={service.link}
                className="transition-transform duration-300 hover:scale-105"
              >
                <div className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-gray-800 h-full border border-transparent hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300">
                  <div className={`${service.color} p-4 md:p-6 text-white flex items-center`}>
                    <div className="text-3xl md:text-4xl mb-0 mr-3 bg-white/20 p-2 rounded-full flex items-center justify-center">
                      {service.icon}
                    </div>
                    <h3 className="text-lg md:text-xl font-bold">{service.title}</h3>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm md:text-base">{service.description}</p>
                    <div className="flex justify-end">
                      <span className={`${service.color} hover:${service.hoverColor} text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md text-sm font-medium transition-colors duration-200 inline-flex items-center`}>
                        Learn More
                        <HiChevronRight className="ml-1 md:ml-2 h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 