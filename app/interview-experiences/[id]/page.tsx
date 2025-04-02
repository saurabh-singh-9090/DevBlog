"use client"

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { FaArrowLeft, FaCalendarAlt, FaUserAlt } from 'react-icons/fa'

// This would typically come from an API or database
// For now, we'll use the same data as the main page
const interviewExperiences = [
  {
    id: "google-sde-1",
    company: "Google",
    role: "Software Engineer L3",
    author: "Anonymous",
    date: "May 15, 2023",
    difficulty: "Hard",
    outcome: "Accepted",
    content: `
# My Google Interview Experience

## Interview Process

The interview process at Google consisted of 5 rounds:

1. Phone Screen: 45-minute technical interview with a Google engineer
2. Online Assessment: LeetCode-style problems to solve in a timed environment
3. Technical Interview 1: Data structures and algorithm questions
4. Technical Interview 2: System design and architecture
5. Behavioral Interview: Questions about my past experiences and challenges

## Technical Questions

Some of the topics covered included:
- Graph traversal algorithms (BFS/DFS)
- Dynamic programming
- Hash tables and their implementation
- System design for a real-time chat application

## Tips for Candidates

1. Practice LeetCode problems, especially medium and hard difficulty
2. Study system design concepts thoroughly
3. Review Google's core values before the behavioral interview
4. Be prepared to explain your thought process clearly

## Outcome

I received an offer one week after my final interview. The entire process took about 5 weeks from initial application to offer.
    `
  },
  {
    id: "microsoft-sde-1",
    company: "Microsoft",
    role: "Software Engineer II",
    author: "Jane Doe",
    date: "April 3, 2023",
    difficulty: "Medium",
    outcome: "Accepted",
    content: `
# Microsoft Interview Experience

## Interview Process

The Microsoft interview process consisted of 4 rounds:

1. Initial Screening: 30-minute call with a recruiter
2. Technical Phone Interview: 60-minute coding interview
3. Virtual Onsite (3 interviews):
   - Coding interview focusing on data structures
   - System design interview
   - Behavioral interview with the hiring manager

## Technical Questions

I was asked questions related to:
- Binary trees and traversal
- String manipulation problems
- Designing a simplified version of OneDrive
- How I handle conflicts in a team

## Outcome

I received an offer after a week. The process was smooth and the interviewers were friendly and helpful.
    `
  },
  // Additional interview experiences would go here
]

export default function InterviewExperienceDetail() {
  const params = useParams()
  const id = params.id as string
  
  const experience = interviewExperiences.find(exp => exp.id === id)
  
  if (!experience) {
    return notFound()
  }
  
  return (
    <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/interview-experiences" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to all experiences
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${
            experience.outcome === 'Accepted' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
            experience.outcome === 'Rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
            'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {experience.outcome}
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold mb-2">{experience.role} at {experience.company}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
            <div className="flex items-center mr-4 mb-2">
              <FaUserAlt className="mr-1" />
              <span>{experience.author}</span>
            </div>
            <div className="flex items-center mr-4 mb-2">
              <FaCalendarAlt className="mr-1" />
              <span>{experience.date}</span>
            </div>
            <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium mb-2 bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200`}>
              {experience.difficulty}
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="prose dark:prose-invert max-w-none">
            {/* This would typically be a markdown renderer */}
            <div dangerouslySetInnerHTML={{ __html: experience.content.split('\n').map(line => {
              if (line.startsWith('# ')) {
                return `<h1 class="text-2xl font-bold mt-6 mb-4">${line.substring(2)}</h1>`;
              } else if (line.startsWith('## ')) {
                return `<h2 class="text-xl font-bold mt-5 mb-3">${line.substring(3)}</h2>`;
              } else if (line.startsWith('- ')) {
                return `<li class="ml-6 mb-1">${line.substring(2)}</li>`;
              } else if (line.startsWith('1. ') || line.startsWith('2. ') || line.startsWith('3. ') || 
                         line.startsWith('4. ') || line.startsWith('5. ')) {
                return `<div class="ml-6 mb-1">${line}</div>`;
              } else if (line.trim() === '') {
                return '<br />';
              } else {
                return `<p class="mb-4">${line}</p>`;
              }
            }).join('') }} />
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between items-center">
        <Link 
          href="/interview-experiences"
          className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <FaArrowLeft className="mr-2" />
          Back to all experiences
        </Link>
        
        <Link 
          href="/interview-experiences/share"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
        >
          Share Your Experience
        </Link>
      </div>
    </div>
  )
} 