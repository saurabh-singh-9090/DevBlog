'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'

interface TaskProgress {
  [key: string]: boolean;
}

// Helper function to get localStorage value if exists, with fallback to default
const getLocalStorageValue = <T,>(key: string, defaultValue: T): T => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key)
    if (saved !== null) {
      return JSON.parse(saved) as T
    }
  }
  return defaultValue
}

// Define roadmap sections and tasks
const roadmapSections = [
  {
    id: 'fundamentals',
    title: 'Web Fundamentals',
    description: 'Master the core technologies of the web',
    tasks: [
      { id: 'html', label: 'Learn HTML - Document structure, semantic elements, forms' },
      { id: 'css', label: 'Learn CSS - Selectors, box model, layouts, responsive design' },
      { id: 'js-basic', label: 'JavaScript Basics - Variables, data types, functions, loops' },
      { id: 'dom', label: 'DOM Manipulation - Selecting elements, events, modifying content' },
      { id: 'git', label: 'Version Control with Git - Commits, branches, pull requests' },
      { id: 'accessibility', label: 'Web Accessibility - ARIA, semantic HTML, keyboard navigation' },
    ]
  },
  {
    id: 'modern-js',
    title: 'Advanced JavaScript',
    description: 'Deepen your JavaScript knowledge',
    tasks: [
      { id: 'es6', label: 'ES6+ Features - Arrow functions, destructuring, modules' },
      { id: 'async', label: 'Asynchronous JavaScript - Promises, async/await, fetch API' },
      { id: 'closure', label: 'Closures and Scope - Lexical environment, execution context' },
      { id: 'oop', label: 'Object-Oriented Programming - Classes, inheritance, encapsulation' },
      { id: 'fp', label: 'Functional Programming - Pure functions, immutability, higher-order functions' },
      { id: 'testing-js', label: 'Testing - Jest, Testing Library, writing tests' }
    ]
  },
  {
    id: 'frameworks',
    title: 'Frontend Frameworks',
    description: 'Learn modern UI frameworks and libraries',
    tasks: [
      { id: 'react', label: 'React - Components, props, state, hooks, context API' },
      { id: 'router', label: 'Routing - React Router, Next.js routing' },
      { id: 'state-mgmt', label: 'State Management - Redux, Zustand, Context API' },
      { id: 'form', label: 'Form Handling - React Hook Form, Formik' },
      { id: 'styling', label: 'Styling Solutions - CSS modules, Styled Components, Tailwind CSS' },
      { id: 'nextjs', label: 'Next.js - Server components, data fetching, routing' }
    ]
  },
  {
    id: 'tooling',
    title: 'Build Tools & Deployment',
    description: 'Master the tools that enhance your workflow',
    tasks: [
      { id: 'bundlers', label: 'Module Bundlers - Webpack, Vite' },
      { id: 'typescript', label: 'TypeScript - Types, interfaces, generics' },
      { id: 'package-mgr', label: 'Package Managers - npm, yarn, pnpm' },
      { id: 'linting', label: 'Linting & Formatting - ESLint, Prettier' },
      { id: 'cicd', label: 'CI/CD - GitHub Actions, Vercel, Netlify' },
      { id: 'perf', label: 'Performance Optimization - Code splitting, lazy loading, profiling' }
    ]
  },
  {
    id: 'advanced',
    title: 'Advanced Concepts',
    description: 'Elevate your skills with advanced topics',
    tasks: [
      { id: 'pwa', label: 'Progressive Web Apps - Service workers, offline support' },
      { id: 'animation', label: 'Animations - CSS animations, Framer Motion, GSAP' },
      { id: 'api', label: 'API Development - REST, GraphQL, tRPC' },
      { id: 'auth', label: 'Authentication - JWT, OAuth, Auth providers' },
      { id: 'a11y', label: 'Advanced Accessibility - Focus management, screen readers' },
      { id: 'i18n', label: 'Internationalization - i18next, formatting libraries' }
    ]
  }
]

export default function FrontendRoadmapPage() {
  // Client-side only state
  const [isClient, setIsClient] = useState(false)
  const [progress, setProgress] = useState<TaskProgress>({})

  // Use effect to initialize from localStorage only on client side
  useEffect(() => {
    const defaultProgress: TaskProgress = {}
    roadmapSections.forEach(section => {
      section.tasks.forEach(task => {
        defaultProgress[task.id] = false
      })
    })
    setProgress(getLocalStorageValue<TaskProgress>('frontend-roadmap-progress', defaultProgress))
    setIsClient(true)
  }, [])

  // Calculate progress percentage for each section and overall
  const calculateSectionProgress = (sectionId: string) => {
    if (!isClient) return 0
    
    const section = roadmapSections.find(s => s.id === sectionId)
    if (!section) return 0
    
    const totalTasks = section.tasks.length
    const completedTasks = section.tasks.filter(task => progress[task.id]).length
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  }

  const calculateOverallProgress = () => {
    if (!isClient) return 0
    
    const totalTasks = roadmapSections.reduce((acc, section) => acc + section.tasks.length, 0)
    const completedTasks = Object.values(progress).filter(val => val === true).length
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
  }

  // Handle checkbox change
  const handleTaskChange = (taskId: string, checked: boolean) => {
    const newProgress = { ...progress, [taskId]: checked }
    setProgress(newProgress)
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('frontend-roadmap-progress', JSON.stringify(newProgress))
    }
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Frontend Developer Roadmap</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A step-by-step guide to becoming a modern frontend developer in 2025
        </p>
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">Overall Progress</h2>
            <span className="text-lg font-medium">
              {isClient ? `${calculateOverallProgress()}%` : '0%'}
            </span>
          </div>
          <Progress value={isClient ? calculateOverallProgress() : 0} className="h-2" />
        </div>
        
        <div className="space-y-8">
          {roadmapSections.map(section => (
            <Card 
              key={section.id} 
              className="border-t-4 py-6" 
              style={{ 
                borderTopColor: isClient 
                  ? `hsl(${calculateSectionProgress(section.id) * 1.2}, 80%, 50%)` 
                  : `hsl(0, 80%, 50%)`
              }}
            >
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </div>
                  <span className="text-lg font-semibold">
                    {isClient ? `${calculateSectionProgress(section.id)}%` : '0%'}
                  </span>
                </div>
                <Progress 
                  value={isClient ? calculateSectionProgress(section.id) : 0} 
                  className="h-1.5 mt-2" 
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {section.tasks.map(task => {
                    const isCompleted = isClient && (progress[task.id] || false);
                    return (
                      <div key={task.id} className={`flex items-start space-x-2 p-2 rounded-md transition-colors ${isCompleted ? 'bg-green-50 dark:bg-green-900/20' : ''}`}>
                        <Checkbox 
                          id={task.id} 
                          checked={isCompleted}
                          onCheckedChange={(checked) => handleTaskChange(task.id, !!checked)}
                          className={`mt-0.5 ${isCompleted ? 'bg-green-500 text-white border-green-500' : ''}`}
                        />
                        <Label 
                          htmlFor={task.id} 
                          className={`${isCompleted ? 'text-green-700 dark:text-green-400 font-medium' : ''} cursor-pointer text-base`}
                        >
                          {task.label}
                        </Label>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">How to Use This Roadmap</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>This is an interactive checklist to track your journey to becoming a frontend developer</li>
            <li>Check off items as you learn them to track your progress</li>
            <li>Your progress is saved locally on your device</li>
            <li>Focus on understanding concepts deeply rather than rushing through</li>
            <li>Supplement with hands-on projects for each section</li>
            <li>Remember that learning is a journey, not a race!</li>
          </ul>
          
          <h3 className="text-xl font-bold mt-6 mb-2">Resources for Learning</h3>
          <p className="mb-3">
            Check out these resources to help you master each section:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li><a href="https://developer.mozilla.org/en-US/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">MDN Web Docs</a> - Comprehensive reference for web technologies</li>
            <li><a href="https://javascript.info/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">JavaScript.info</a> - Modern JavaScript tutorial</li>
            <li><a href="https://react.dev/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">React Documentation</a> - Official React docs</li>
            <li><a href="https://nextjs.org/learn" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Next.js Learn</a> - Interactive Next.js course</li>
            <li><a href="https://www.theodinproject.com/" className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">The Odin Project</a> - Free full-stack curriculum with projects</li>
          </ul>
        </div>
      </div>
    </div>
  )
} 