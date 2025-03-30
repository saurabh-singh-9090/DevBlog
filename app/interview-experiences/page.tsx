"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaCalendarAlt, FaUserAlt } from 'react-icons/fa'

type InterviewExperience = {
  id: string
  company: string
  role: string
  author: string
  date: string
  experience: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  outcome: 'Accepted' | 'Rejected' | 'Pending'
}

const interviewExperiences: InterviewExperience[] = [
  {
    id: "google-sde-1",
    company: "Google",
    role: "Software Engineer L3",
    author: "Anonymous",
    date: "May 15, 2023",
    experience: "I had 5 rounds of interviews including a phone screen, coding interviews, and a system design interview...",
    difficulty: "Hard",
    outcome: "Accepted"
  },
  {
    id: "microsoft-sde-1",
    company: "Microsoft",
    role: "Software Engineer II",
    author: "Jane Doe",
    date: "April 3, 2023",
    experience: "The interview process consisted of 4 rounds focusing on data structures, algorithms, and system design...",
    difficulty: "Medium",
    outcome: "Accepted"
  },
  {
    id: "amazon-sde-1",
    company: "Amazon",
    role: "SDE I",
    author: "John Smith",
    date: "June 12, 2023",
    experience: "I went through the typical Amazon interview loop with a focus on their leadership principles...",
    difficulty: "Medium",
    outcome: "Rejected"
  },
  {
    id: "meta-sde-1",
    company: "Meta",
    role: "Software Engineer E4",
    author: "Anonymous",
    date: "March 22, 2023",
    experience: "The interview process was challenging with a heavy focus on algorithms and system design...",
    difficulty: "Hard",
    outcome: "Pending"
  }
]

const companies = ["All", "Google", "Microsoft", "Amazon", "Meta", "Apple", "Netflix"]
const difficulties = ["All", "Easy", "Medium", "Hard"]
const outcomes = ["All", "Accepted", "Rejected", "Pending"]

export default function InterviewExperiences() {
  const [selectedCompany, setSelectedCompany] = useState<string>("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All")
  const [selectedOutcome, setSelectedOutcome] = useState<string>("All")
  
  const filteredExperiences = interviewExperiences.filter(exp => {
    return (selectedCompany === "All" || exp.company === selectedCompany) &&
           (selectedDifficulty === "All" || exp.difficulty === selectedDifficulty) &&
           (selectedOutcome === "All" || exp.outcome === selectedOutcome)
  })

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-2">Interview Experiences</h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Read real interview experiences shared by candidates who interviewed at top tech companies
      </p>
      
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
          >
            {companies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Difficulty</label>
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
          >
            {difficulties.map(diff => (
              <option key={diff} value={diff}>{diff}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Outcome</label>
          <select 
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={selectedOutcome}
            onChange={(e) => setSelectedOutcome(e.target.value)}
          >
            {outcomes.map(outcome => (
              <option key={outcome} value={outcome}>{outcome}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map(exp => (
          <Link 
            key={exp.id} 
            href={`/interview-experiences/${exp.id}`}
            className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white dark:bg-gray-800"
          >
            <div className="p-6">
              <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                exp.outcome === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                exp.outcome === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {exp.outcome}
              </div>
              
              <h2 className="text-xl font-bold mb-2">{exp.role} at {exp.company}</h2>
              
              <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-3 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
                {exp.difficulty}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-4">{exp.experience}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center">
                  <FaUserAlt className="mr-1" />
                  <span>{exp.author}</span>
                </div>
                <div className="flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>{exp.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {filteredExperiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No interview experiences match your filters.</p>
        </div>
      )}
      
      {/* Share Button */}
      <div className="mt-12 text-center">
        <Link 
          href="/interview-experiences/share"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          Share Your Interview Experience
        </Link>
      </div>
    </div>
  )
} 