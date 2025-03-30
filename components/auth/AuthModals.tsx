'use client'

import { useState } from 'react'
import { LoginModal } from './LoginModal'
import { SignupModal } from './SignupModal'

interface AuthModalsProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  initialView?: 'login' | 'signup'
}

export function AuthModals({ 
  isOpen, 
  setIsOpen, 
  initialView = 'login' 
}: AuthModalsProps) {
  const [currentView, setCurrentView] = useState<'login' | 'signup'>(initialView)

  const switchToLogin = () => setCurrentView('login')
  const switchToSignup = () => setCurrentView('signup')

  return (
    <>
      {currentView === 'login' ? (
        <LoginModal 
          isOpen={isOpen && currentView === 'login'} 
          setIsOpen={setIsOpen}
          onSwitchToSignup={switchToSignup}
        />
      ) : (
        <SignupModal 
          isOpen={isOpen && currentView === 'signup'} 
          setIsOpen={setIsOpen}
          onSwitchToLogin={switchToLogin}
        />
      )}
    </>
  )
} 