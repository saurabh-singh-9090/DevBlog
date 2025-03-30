'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { HiMoon, HiSun } from 'react-icons/hi'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="w-9 px-0"
    >
      {theme === 'light' ? (
        <HiMoon className="h-5 w-5" />
      ) : (
        <HiSun className="h-5 w-5" />
      )}
    </Button>
  )
}
