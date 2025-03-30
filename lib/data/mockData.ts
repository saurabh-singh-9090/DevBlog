import { BlogPost, Category, User, Comment } from '@/types'

// Refresh mechanism for components to know when to update
export let lastRefreshTimestamp = Date.now()

export function triggerDataRefresh() {
  lastRefreshTimestamp = Date.now()
  console.log('Data refresh triggered at:', new Date(lastRefreshTimestamp).toISOString())
}

// Mock categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'React',
    slug: 'react',
    description: 'Articles about React, React hooks, and related libraries.'
  },
  {
    id: '2',
    name: 'JavaScript',
    slug: 'javascript',
    description: 'JavaScript tips, tricks, and best practices.'
  },
  {
    id: '3',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'Learn TypeScript and its advanced features.'
  },
  {
    id: '4',
    name: 'Node.js',
    slug: 'nodejs',
    description: 'Server-side JavaScript with Node.js.'
  },
  {
    id: '5',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Build full-stack web applications with Next.js.'
  }
]

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    isAdmin: true,
    image: 'https://i.pravatar.cc/150?u=admin'
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'user@example.com',
    isAdmin: false,
    image: 'https://i.pravatar.cc/150?u=john'
  },
  {
    id: '3',
    name: 'Jane Smith',
    email: 'jane@example.com',
    isAdmin: false,
    image: 'https://i.pravatar.cc/150?u=jane'
  }
]

// Mock blog posts
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks in functional components',
    slug: 'getting-started-with-react-hooks',
    content: `
# Getting Started with React Hooks

React Hooks were introduced in React 16.8 as a way to use state and other React features without writing a class component. They allow you to "hook into" React state and lifecycle features from function components.

## Why Hooks?

Before Hooks, if you wanted to add state to a component, you had to use a class component. With Hooks, you can add state to function components, which means:

- Less boilerplate code
- Easier to understand and test
- Reuse stateful logic between components
- Avoid the confusion of 'this' in classes

## useState Hook

The most basic Hook is \`useState\`. It lets you add state to function components:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  // Declare a state variable called "count" with initial value 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## useEffect Hook

The \`useEffect\` Hook lets you perform side effects in function components:

\`\`\`jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

React Hooks provide a more direct API to the React concepts you already know: props, state, context, refs, and lifecycle. They also offer a powerful way to compose behavior and reuse stateful logic.
    `,
    excerpt: 'Learn the basics of React Hooks and how they can simplify your functional components with state and lifecycle features.',
    cover_image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[0],
    category: categories[0],
    published_at: '2023-08-15T10:00:00Z',
    likes: 245,
    views: 1250,
    status: 'approved'
  },
  {
    id: '2',
    title: 'Advanced TypeScript Patterns',
    slug: 'advanced-typescript-patterns',
    content: `
# Advanced TypeScript Patterns

TypeScript has become an essential tool for many JavaScript developers. Let's explore some advanced patterns that can help you write more robust code.

## Discriminated Unions

One of the most powerful features in TypeScript is the ability to create discriminated unions:

\`\`\`typescript
type Success = {
  status: 'success';
  data: string[];
};

type Error = {
  status: 'error';
  error: string;
};

type ApiResponse = Success | Error;

function handleResponse(response: ApiResponse) {
  if (response.status === 'success') {
    // TypeScript knows that response is Success type here
    console.log(response.data.length);
  } else {
    // TypeScript knows that response is Error type here
    console.error(response.error);
  }
}
\`\`\`

## Utility Types

TypeScript provides several utility types that can help create new types from existing ones:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  address: string;
}

// Create a new type with only some fields from User
type UserSummary = Pick<User, 'id' | 'name'>;

// Create a new type with all fields from User except some
type UserWithoutAddress = Omit<User, 'address'>;

// Create a new type with all fields from User as optional
type PartialUser = Partial<User>;

// Create a new type with all fields from User as readonly
type ReadonlyUser = Readonly<User>;
\`\`\`

## Generic Constraints

You can limit the types that can be used with generics:

\`\`\`typescript
interface HasLength {
  length: number;
}

// T must have a length property
function logLength<T extends HasLength>(item: T): void {
  console.log(item.length);
}

// Works with strings, arrays, and other objects with length
logLength("Hello"); // 5
logLength([1, 2, 3]); // 3
logLength({ length: 10, value: 'test' }); // 10
\`\`\`

## Conclusion

These advanced TypeScript patterns can help you write more type-safe code, catch errors early, and improve your developer experience.
    `,
    excerpt: 'Dive into advanced TypeScript patterns like discriminated unions, utility types, and generic constraints to write more robust code.',
    cover_image: 'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[1],
    category: categories[2],
    published_at: '2023-09-02T14:30:00Z',
    likes: 198,
    views: 920,
    status: 'approved'
  },
  {
    id: '3',
    title: 'Building a REST API with Node.js and Express',
    slug: 'building-rest-api-with-nodejs-express',
    content: `
# Building a REST API with Node.js and Express

RESTful APIs are a standard way to expose databases to clients, and Express.js makes it easy to build them with Node.js.

## Setting Up the Project

First, let's initialize a new Node.js project and install Express:

\`\`\`bash
mkdir express-api
cd express-api
npm init -y
npm install express mongoose body-parser
\`\`\`

## Creating the Server

Next, let's set up a basic Express server:

\`\`\`javascript
// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API' });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
\`\`\`

## Defining Models with Mongoose

Now, let's define a user model with Mongoose:

\`\`\`javascript
// models/user.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
\`\`\`

## Creating CRUD Routes

Next, let's implement CRUD operations for our user model:

\`\`\`javascript
// routes/users.js
const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one user
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// Create a user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user
router.patch('/:id', getUser, async (req, res) => {
  if (req.body.name) res.user.name = req.body.name;
  if (req.body.email) res.user.email = req.body.email;
  
  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get user by ID
async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id).select('-password');
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
\`\`\`

## Conclusion

With Express.js and Mongoose, you can quickly build a RESTful API for your applications. This is just a starting point - you'd typically want to add authentication, validation, error handling, and more for a production-ready API.
    `,
    excerpt: 'Create a full-featured RESTful API using Node.js and Express with MongoDB integration. Learn how to structure routes and controllers for scalability.',
    cover_image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[2],
    category: categories[3],
    published_at: '2023-07-28T09:15:00Z',
    likes: 310,
    views: 1850,
    status: 'approved'
  },
  {
    id: '4',
    title: 'Modern JavaScript Features You Should Know',
    slug: 'modern-javascript-features-you-should-know',
    content: `
# Modern JavaScript Features You Should Know

JavaScript has evolved significantly in recent years with the introduction of ES6 (ECMAScript 2015) and subsequent versions. Let's explore some of the most useful features that can improve your code quality and developer experience.

## Arrow Functions

Arrow functions provide a concise syntax for writing functions and lexically bind the \`this\` value:

\`\`\`javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Arrow function with one parameter
const square = x => x * x;

// Arrow function with no parameters
const getRandom = () => Math.random();
\`\`\`

## Destructuring

Destructuring allows you to extract values from objects and arrays into distinct variables:

\`\`\`javascript
// Object destructuring
const person = { name: 'John', age: 30, city: 'New York' };
const { name, age } = person;
console.log(name); // 'John'
console.log(age); // 30

// Array destructuring
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]
\`\`\`

## Spread and Rest Operators

The spread operator (\`...\`) allows you to expand elements, while the rest operator collects elements:

\`\`\`javascript
// Spread operator with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

// Spread operator with objects
const person = { name: 'John', age: 30 };
const personWithCity = { ...person, city: 'New York' };
// { name: 'John', age: 30, city: 'New York' }

// Rest parameter in functions
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // 15
\`\`\`

## Optional Chaining

Optional chaining (\`?.\`) allows you to access deeply nested properties without checking if each reference is valid:

\`\`\`javascript
const user = {
  name: 'John',
  address: {
    street: '123 Main St'
  }
};

// Without optional chaining
const zipCode = user.address && user.address.zipCode ? user.address.zipCode : undefined;

// With optional chaining
const zipCode = user.address?.zipCode;
\`\`\`

## Nullish Coalescing

The nullish coalescing operator (\`??\`) provides a default value when a value is null or undefined:

\`\`\`javascript
// Using || (returns first "truthy" value)
const count = data.count || 0; // Could be problematic if count is 0

// Using ?? (only falls back if value is null or undefined)
const count = data.count ?? 0; // Works correctly with 0
\`\`\`

## Conclusion

These modern JavaScript features can help you write cleaner, more maintainable code. By leveraging these features, you can reduce boilerplate, increase readability, and avoid common bugs.
    `,
    excerpt: 'Catch up on the most important modern JavaScript features from recent ECMAScript specifications, including arrow functions, destructuring, and optional chaining.',
    cover_image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[0],
    category: categories[1],
    published_at: '2023-06-12T11:45:00Z',
    likes: 275,
    views: 1560,
    status: 'approved'
  },
  {
    id: '5',
    title: 'Server-Side Rendering with Next.js',
    slug: 'server-side-rendering-with-nextjs',
    content: `
# Server-Side Rendering with Next.js

Next.js is a React framework that enables server-side rendering (SSR), static site generation (SSG), and more. Let's explore how to leverage these rendering strategies for better performance and SEO.

## Why Server-Side Rendering?

Traditional React applications render entirely on the client, which can lead to:

- Poor initial load performance
- SEO challenges (search engines might not see your content)
- Bad user experience, especially on slow connections

Next.js solves these problems by rendering pages on the server first.

## Basic Next.js Setup

First, let's create a basic Next.js application:

\`\`\`bash
npx create-next-app my-app
cd my-app
npm run dev
\`\`\`

## Page-Based Routing

Next.js uses file-system based routing. Create a file in the \`pages\` directory, and it becomes a route:

\`\`\`jsx
// pages/index.js - accessible at /
export default function Home() {
  return <h1>Welcome to Next.js!</h1>;
}

// pages/about.js - accessible at /about
export default function About() {
  return <h1>About us</h1>;
}

// pages/blog/[slug].js - accessible at /blog/:slug
export default function BlogPost({ slug }) {
  return <h1>Blog Post: {slug}</h1>;
}
\`\`\`

## Data Fetching Methods

Next.js provides several ways to fetch data:

### 1. getStaticProps (Static Site Generation)

\`\`\`jsx
// pages/blog.js
export default function Blog({ posts }) {
  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

// This runs at build time in production
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts
    },
    // Re-generate the page at most once per 10 seconds
    revalidate: 10
  };
}
\`\`\`

### 2. getServerSideProps (Server-Side Rendering)

\`\`\`jsx
// pages/dashboard.js
export default function Dashboard({ data }) {
  return <div>Dashboard data: {data}</div>;
}

// This runs on every request
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/dashboard');
  const data = await res.json();

  return {
    props: { data }
  };
}
\`\`\`

### 3. getStaticPaths (for Dynamic Routes)

\`\`\`jsx
// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

// Generate at build time
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() }
  }));

  return {
    paths,
    fallback: 'blocking' // Can be true, false, or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const res = await fetch(\`https://api.example.com/posts/\${params.id}\`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 60
  };
}
\`\`\`

## API Routes

Next.js allows you to create API endpoints within your application:

\`\`\`javascript
// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}
\`\`\`

## Conclusion

Next.js provides a rich set of features for server-side rendering, static generation, and more. By choosing the right data fetching method for each page, you can optimize both user experience and performance.
    `,
    excerpt: 'Learn how to utilize Next.js for server-side rendering to improve performance, SEO, and user experience in your React applications.',
    cover_image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[1],
    category: categories[4],
    published_at: '2023-10-05T16:20:00Z',
    likes: 185,
    views: 920,
    status: 'approved'
  },
  {
    id: '6',
    title: 'State Management with React Context and Hooks',
    slug: 'state-management-with-react-context-and-hooks',
    content: `
# State Management with React Context and Hooks

While libraries like Redux are popular for state management in React applications, the built-in Context API combined with hooks can be a powerful and simpler alternative for many use cases.

## The Problem: Prop Drilling

In React, data flows down the component tree through props. When many components need the same data, you can end up with "prop drilling":

\`\`\`jsx
function App() {
  const [user, setUser] = useState({ name: 'John', isLoggedIn: true });
  
  return <Main user={user} setUser={setUser} />;
}

function Main({ user, setUser }) {
  return <Sidebar user={user} setUser={setUser} />;
}

function Sidebar({ user, setUser }) {
  return <Profile user={user} setUser={setUser} />;
}

function Profile({ user, setUser }) {
  // Finally using the user data
  return <h1>Hello, {user.name}</h1>;
}
\`\`\`

This becomes cumbersome as the component tree grows deeper or more complex.

## React Context API

The Context API helps solve this problem by creating a global state accessible to any component in the tree:

\`\`\`jsx
// 1. Create a context
const UserContext = React.createContext();

// 2. Create a provider component
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John', isLoggedIn: true });
  
  const login = (username) => {
    setUser({ name: username, isLoggedIn: true });
  };
  
  const logout = () => {
    setUser({ name: '', isLoggedIn: false });
  };
  
  const value = { user, login, logout };
  
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 3. Create a custom hook to use the context
function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

// 4. Wrap your app with the provider
function App() {
  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

// 5. Use the context in components
function Profile() {
  const { user, logout } = useUser();
  
  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
\`\`\`

## Combining Multiple Contexts

You can combine multiple contexts for different slices of your state:

\`\`\`jsx
function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <NotificationProvider>
          <Main />
        </NotificationProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
\`\`\`

## Context with useReducer for Complex State

For more complex state logic, combine Context with \`useReducer\`:

\`\`\`jsx
// 1. Create a context
const ShoppingCartContext = React.createContext();

// 2. Define a reducer
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      return { 
        ...state,
        items: [...state.items, action.payload]
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    default:
      throw new Error(\`Unhandled action type: \${action.type}\`);
  }
}

// 3. Create a provider
function ShoppingCartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });
  
  const value = { state, dispatch };
  
  return (
    <ShoppingCartContext.Provider value={value}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

// 4. Create a custom hook
function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
}

// 5. Use it in components
function Product({ product }) {
  const { dispatch } = useShoppingCart();
  
  const addToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };
  
  return (
    <div>
      <h2>{product.name}</h2>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
\`\`\`

## Conclusion

React Context with hooks provides a powerful built-in solution for state management. For smaller to medium-sized applications, it can replace third-party state management libraries while keeping your code simpler and more maintainable.
    `,
    excerpt: 'Discover how to effectively manage state in React applications using Context API and hooks, providing alternatives to larger state management libraries.',
    cover_image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[2],
    category: categories[0],
    published_at: '2023-08-25T13:10:00Z',
    likes: 220,
    views: 1120,
    status: 'approved'
  }
]

// Mock comments array (initially empty, will be populated at runtime)
export const comments: Comment[] = []

// Array for pending posts waiting for approval
export const pendingPosts: BlogPost[] = []

// Array for rejected posts
export const rejectedPosts: BlogPost[] = [
  {
    id: '999',
    title: 'Rejected Sample Post',
    slug: 'rejected-sample-post',
    content: 'This is a sample rejected post to demonstrate the rejection functionality.',
    excerpt: 'Sample rejected post for testing.',
    cover_image: 'https://images.unsplash.com/photo-1568607689150-2beddf9debe0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    author: users[2],
    category: categories[3],
    published_at: '2023-10-15T09:00:00Z',
    submission_date: '2023-10-14T15:45:00Z',
    likes: 0,
    views: 0,
    status: 'rejected'
  }
]

// Helper functions to get data
export const getPostById = (id: string): BlogPost | null => {
  return blogPosts.find(post => post.id === id) || null
}

// Get post by slug and increment views
export const getPostBySlug = (slug: string): BlogPost | null => {
  const post = blogPosts.find(post => post.slug === slug)
  
  if (post) {
    // Track view
    incrementPostViews(post.id)
    
    // Fetch updated post with incremented views
    return getPostById(post.id)
  }
  
  return null
}

// Increment post views
export const incrementPostViews = (postId: string): boolean => {
  const postIndex = blogPosts.findIndex(post => post.id === postId)
  
  if (postIndex !== -1) {
    // Increment views
    blogPosts[postIndex] = {
      ...blogPosts[postIndex],
      views: blogPosts[postIndex].views + 1
    }
    return true
  }
  
  return false
}

// Toggle like on a post
export const togglePostLike = (postId: string, userId: string): boolean => {
  const postIndex = blogPosts.findIndex(post => post.id === postId)
  
  if (postIndex === -1) {
    return false
  }
  
  const post = blogPosts[postIndex]
  const likedBy = post.likedBy || []
  const likedIndex = likedBy.indexOf(userId)
  
  // If user already liked, remove the like
  if (likedIndex !== -1) {
    const updatedLikedBy = [...likedBy]
    updatedLikedBy.splice(likedIndex, 1)
    
    blogPosts[postIndex] = {
      ...post,
      likes: post.likes - 1,
      likedBy: updatedLikedBy
    }
    
    // Also update user's likedPosts array
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      const user = users[userIndex]
      const likedPosts = user.likedPosts || []
      const postIdx = likedPosts.indexOf(postId)
      
      if (postIdx !== -1) {
        const updatedLikedPosts = [...likedPosts]
        updatedLikedPosts.splice(postIdx, 1)
        
        users[userIndex] = {
          ...user,
          likedPosts: updatedLikedPosts
        }
      }
    }
    
    return false // Return false to indicate unliked
  } 
  // Otherwise, add the like
  else {
    blogPosts[postIndex] = {
      ...post,
      likes: post.likes + 1,
      likedBy: [...likedBy, userId]
    }
    
    // Also update user's likedPosts array
    const userIndex = users.findIndex(user => user.id === userId)
    if (userIndex !== -1) {
      const user = users[userIndex]
      const likedPosts = user.likedPosts || []
      
      users[userIndex] = {
        ...user,
        likedPosts: [...likedPosts, postId]
      }
    }
    
    return true // Return true to indicate liked
  }
}

// Check if a user has liked a post
export const hasUserLikedPost = (postId: string, userId: string): boolean => {
  const post = getPostById(postId)
  return post?.likedBy?.includes(userId) || false
}

// Add a comment to a post
export const addComment = (postId: string, userId: string, content: string): Comment | null => {
  // Validate inputs
  if (!postId || !userId || !content.trim()) {
    return null
  }
  
  const user = users.find(user => user.id === userId)
  const post = blogPosts.find(post => post.id === postId)
  
  if (!user || !post) {
    return null
  }
  
  const newComment: Comment = {
    id: Date.now().toString(), // Generate a unique ID
    content: content.trim(),
    post_id: postId,
    author: user,
    created_at: new Date().toISOString()
  }
  
  // Add to comments array
  comments.push(newComment)
  
  return newComment
}

// Get comments for a post
export const getCommentsByPostId = (postId: string): Comment[] => {
  return comments.filter(comment => comment.post_id === postId)
}

// Delete a comment (only admin or the comment author can delete)
export const deleteComment = (commentId: string, userId: string): boolean => {
  const commentIndex = comments.findIndex(comment => comment.id === commentId)
  
  if (commentIndex === -1) {
    return false
  }
  
  const comment = comments[commentIndex]
  const user = users.find(user => user.id === userId)
  
  // Check if the user is the comment author or an admin
  if (!user || (comment.author.id !== userId && !user.isAdmin)) {
    return false
  }
  
  // Remove the comment
  comments.splice(commentIndex, 1)
  return true
}

// Get all posts
export const getAllPosts = (): BlogPost[] => {
  const approvedPosts = [...blogPosts].filter(post => post.status === 'approved')
  console.log(`getAllPosts found ${approvedPosts.length} approved posts out of ${blogPosts.length} total posts`)
  return approvedPosts
}

// Get popular posts sorted by likes
export const getPopularPosts = (): BlogPost[] => {
  return [...blogPosts]
    .filter(post => post.status === 'approved')
    .sort((a, b) => b.likes - a.likes)
}

// Get posts by category
export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post => post.category.slug === categorySlug && post.status === 'approved')
}

// Get category by slug
export const getCategoryBySlug = (slug: string): Category | null => {
  return categories.find(category => category.slug === slug) || null
}

// Delete a post
export const deletePost = (id: string): boolean => {
  const index = blogPosts.findIndex(post => post.id === id)
  
  if (index === -1) {
    return false
  }
  
  blogPosts.splice(index, 1)
  return true
}

// Submit a new post for review
export const submitPost = (
  userId: string,
  title: string,
  content: string,
  excerpt: string,
  categoryId: string,
  coverImage: string
): BlogPost | null => {
  const user = users.find(u => u.id === userId)
  const category = categories.find(c => c.id === categoryId)
  
  if (!user || !category) {
    return null
  }
  
  // Create a slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .concat(`-${Date.now().toString().slice(-4)}`)
  
  const newPost: BlogPost = {
    id: Date.now().toString(),
    title,
    slug,
    content,
    excerpt,
    cover_image: coverImage,
    author: user,
    category,
    published_at: new Date().toISOString(),
    submission_date: new Date().toISOString(),
    likes: 0,
    views: 0,
    status: 'pending',
    likedBy: [],
    comments: []
  }
  
  pendingPosts.push(newPost)
  return newPost
}

// Get all pending posts for admin review
export const getPendingPosts = (): BlogPost[] => {
  return [...pendingPosts]
}

// Approve a pending post
export const approvePost = (postId: string): boolean => {
  const postIndex = pendingPosts.findIndex(post => post.id === postId)
  
  if (postIndex === -1) {
    console.error(`Post with ID ${postId} not found in pending posts`)
    return false
  }
  
  const post = pendingPosts[postIndex]
  
  // Update status and move to published posts
  const approvedPost: BlogPost = {
    ...post,
    status: 'approved',
    published_at: new Date().toISOString()
  }
  
  console.log("Approving post:", approvedPost.title)
  console.log("Status before approval:", post.status)
  console.log("Status after approval:", approvedPost.status)
  
  // Add to published posts array
  blogPosts.push(approvedPost)
  
  // Remove from pending posts array
  pendingPosts.splice(postIndex, 1)
  
  console.log(`Post approved: ${approvedPost.title} (ID: ${approvedPost.id})`)
  console.log(`Total approved posts: ${blogPosts.filter(p => p.status === 'approved').length}`)
  console.log(`Approved posts: ${blogPosts.filter(p => p.status === 'approved').map(p => p.title).join(', ')}`)
  
  // Trigger data refresh to notify components
  triggerDataRefresh()
  
  return true
}

// Reject a pending post
export const rejectPost = (postId: string): boolean => {
  const postIndex = pendingPosts.findIndex(post => post.id === postId)
  
  if (postIndex === -1) {
    return false
  }
  
  const post = pendingPosts[postIndex]
  
  // Update status and move to rejected posts
  const rejectedPost: BlogPost = {
    ...post,
    status: 'rejected'
  }
  
  rejectedPosts.push(rejectedPost)
  pendingPosts.splice(postIndex, 1)
  
  return true
}

// Get user's submitted posts (pending, approved, and rejected)
export const getUserSubmittedPosts = (userId: string): BlogPost[] => {
  const userPosts = [
    ...pendingPosts.filter(post => post.author.id === userId),
    ...blogPosts.filter(post => post.author.id === userId),
    ...rejectedPosts.filter(post => post.author.id === userId)
  ]
  
  return userPosts.sort((a, b) => 
    new Date(b.submission_date || b.published_at).getTime() - 
    new Date(a.submission_date || a.published_at).getTime()
  )
}

// Get all reviewed posts (both approved and rejected) for admin dashboard
export const getReviewedPosts = (): BlogPost[] => {
  // Get approved posts from blogPosts and rejected posts from rejectedPosts
  const reviewedPosts = [
    ...blogPosts.filter(post => post.status === 'approved'),
    ...rejectedPosts
  ];
  
  // Sort by most recent review date
  return reviewedPosts.sort((a, b) => 
    new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
  );
}
