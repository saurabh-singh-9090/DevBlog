"use client"

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa'

export default function ShareInterviewExperience() {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    author: '',
    experience: '',
    difficulty: 'Medium',
    outcome: 'Pending',
    anonymous: false
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Here you would typically submit the data to your backend API
    // For now, we'll just simulate an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      company: '',
      role: '',
      author: '',
      experience: '',
      difficulty: 'Medium',
      outcome: 'Pending',
      anonymous: false
    });
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  if (isSubmitted) {
    return (
      <div className="container max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Your interview experience has been submitted successfully. After review, it will be published on our platform.
          </p>
          <Link 
            href="/interview-experiences"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            Back to Interview Experiences
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/interview-experiences" 
        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back to all experiences
      </Link>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold">Share Your Interview Experience</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Help other candidates prepare by sharing your interview journey
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Company*
              </label>
              <input
                type="text"
                id="company"
                name="company"
                required
                value={formData.company}
                onChange={handleChange}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                placeholder="e.g. Google, Microsoft, Amazon"
              />
            </div>
            
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Role*
              </label>
              <input
                type="text"
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
                placeholder="e.g. Software Engineer, Product Manager"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div>
            <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Interview Experience*
            </label>
            <textarea
              id="experience"
              name="experience"
              required
              value={formData.experience}
              onChange={handleChange}
              className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
              placeholder="Write about your interview experience"
            />
          </div>
          
          <div>
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="outcome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Outcome
            </label>
            <select
              id="outcome"
              name="outcome"
              value={formData.outcome}
              onChange={handleChange}
              className="shadow-sm focus:ring-emerald-500 focus:border-emerald-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-md"
            >
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="anonymous" className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleCheckboxChange}
                className="form-checkbox h-4 w-4 text-emerald-600 dark:text-emerald-400"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                Share anonymously
              </span>
            </label>
          </div>
          
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 