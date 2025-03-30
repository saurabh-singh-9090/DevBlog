import { User } from '@/types'

// Mock admin user
const ADMIN_USER: User = {
  id: '1',
  name: 'Admin',
  email: 'admin@example.com',
  isAdmin: true,
  image: '' // Default avatar
}

// Mock regular user
const REGULAR_USER: User = {
  id: '2',
  name: 'User',
  email: 'user@example.com',
  isAdmin: false,
  image: '' // Default avatar
}

// Get localStorage key for users database
const USERS_DB_KEY = 'devblog_users'

// Initialize users database in localStorage if it doesn't exist
const initUsersDatabase = (): void => {
  if (typeof window === 'undefined') return
  
  if (!localStorage.getItem(USERS_DB_KEY)) {
    // Initialize with default users
    const initialUsers = {
      'admin@example.com': ADMIN_USER,
      'user@example.com': REGULAR_USER
    }
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(initialUsers))
  }
}

// Get all users from localStorage
const getUsers = (): Record<string, User> => {
  if (typeof window === 'undefined') return {}
  
  initUsersDatabase()
  const usersStr = localStorage.getItem(USERS_DB_KEY)
  if (!usersStr) return {}
  
  try {
    return JSON.parse(usersStr) as Record<string, User>
  } catch (error) {
    console.error('Error parsing users from localStorage', error)
    return {}
  }
}

// Save users to localStorage
const saveUsers = (users: Record<string, User>): void => {
  if (typeof window === 'undefined') return
  localStorage.setItem(USERS_DB_KEY, JSON.stringify(users))
}

// Register a new user
export const register = async (name: string, email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Simple validation
        if (!name || !email || !password) {
          reject(new Error('All fields are required'))
          return
        }
        
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          reject(new Error('Invalid email format'))
          return
        }
        
        // Password length validation
        if (password.length < 6) {
          reject(new Error('Password must be at least 6 characters long'))
          return
        }
        
        // Check if email already exists
        const users = getUsers()
        if (users[email]) {
          reject(new Error('Email already registered'))
          return
        }
        
        // Create new user
        const newUser: User = {
          id: `user_${Date.now()}`,
          name,
          email,
          isAdmin: false,
          image: '',
          likedPosts: []
        }
        
        // Store user in "database"
        users[email] = newUser
        
        // Add password to a separate object for security
        // In a real app, you'd hash the password
        const passwordsKey = 'devblog_passwords'
        const passwordsStr = localStorage.getItem(passwordsKey) || '{}'
        const passwords = JSON.parse(passwordsStr)
        passwords[email] = password
        
        // Save users and passwords
        saveUsers(users)
        localStorage.setItem(passwordsKey, JSON.stringify(passwords))
        
        resolve(newUser)
      } catch (error) {
        reject(error)
      }
    }, 500) // Simulate network delay
  })
}

// Login function that handles both default and custom users
export const login = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      try {
        // Simple validation
        if (!email || !password) {
          reject(new Error('Email and password are required'))
          return
        }
        
        // Get users and passwords
        const users = getUsers()
        const passwordsKey = 'devblog_passwords'
        const passwordsStr = localStorage.getItem(passwordsKey) || '{}'
        const passwords = JSON.parse(passwordsStr)
        
        // For admin login
        if (email === 'admin@example.com' && password === 'admin123') {
          localStorage.setItem('user', JSON.stringify(ADMIN_USER));
          resolve(ADMIN_USER);
          return; // Add an early return here
        } 
        // For regular demo user
        else if (email === 'user@example.com' && password === 'user123') {
          localStorage.setItem('user', JSON.stringify(REGULAR_USER));
          resolve(REGULAR_USER);
          return; // Add an early return here
        }
        
        // Then continue with the regular user check from the database
        const user = users[email]
        if (!user) {
          reject(new Error('Invalid email or password'))
          return
        }
        
        // Check password for regular users
        const storedPassword = passwords[email]
        if (storedPassword !== password) {
          reject(new Error('Invalid email or password'))
          return
        }
        
        // Login successful
        localStorage.setItem('user', JSON.stringify(user))
        resolve(user)
      } catch (error) {
        reject(error)
      }
    }, 500) // Simulate network delay
  })
}

// Logout function
export const logout = (): void => {
  localStorage.removeItem('user')
}

// Get current user from localStorage
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null
  }
  
  const userStr = localStorage.getItem('user')
  if (!userStr) {
    return null
  }
  
  try {
    return JSON.parse(userStr) as User
  } catch (error) {
    console.error('Error parsing user from localStorage', error)
    return null
  }
}

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null
}

// Check if user is admin
export const isAdmin = (): boolean => {
  const user = getCurrentUser()
  return user ? user.isAdmin : false
}

// Update user information
export const updateUser = (userData: Partial<User>): User | null => {
  const currentUser = getCurrentUser()
  
  if (!currentUser) {
    return null
  }
  
  // Update user data with new values
  const updatedUser: User = {
    ...currentUser,
    ...userData
  }
  
  // Update in the "users database" as well
  const users = getUsers()
  if (users[updatedUser.email]) {
    users[updatedUser.email] = updatedUser
    saveUsers(users)
  }
  
  // Save updated user to current session
  localStorage.setItem('user', JSON.stringify(updatedUser))
  
  return updatedUser
}
