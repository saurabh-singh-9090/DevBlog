# DevBlog - Technical Content Platform

# Live website - https://dev-blog-by-saurabh.netlify.app/

# Website snapshots:
<img width="1378" alt="image" src="https://github.com/user-attachments/assets/da8978db-1682-479e-880a-0a9def10aa7b" />
<img width="1367" alt="image" src="https://github.com/user-attachments/assets/5df1247e-bab6-463d-b1e7-1e6527b17213" />

## Project Overview
DevBlog is a modern, feature-rich technical blog platform built for developers to share insights, tutorials, and best practices in software development. The application provides a rich reading experience with features like article categorization, likes, comments, and user authentication.

## Tech Stack

### Core Technologies
- **Next.js 15**: App Router for file-based routing and server/client component architecture
- **React 19**: For building the user interface components
- **TypeScript**: For type-safe code and better developer experience
- **Tailwind CSS**: For styling and responsive design

### UI Components and Styling
- **Radix UI**: Accessible UI primitives for building the component system
- **shadcn/ui**: Component library built on top of Radix UI and Tailwind
- **class-variance-authority**: For creating variant-based components
- **tailwind-merge**: For conditional class name merging
- **clsx**: For conditionally joining class names
- **next-themes**: For theme switching (light/dark mode)
- **Lucide React**: SVG icon library
- **React Icons**: Additional icon set

### Form Handling and Validation
- **React Hook Form**: For form management
- **Zod**: For schema validation

### Notifications
- **Sonner**: For toast notifications

## Folder Structure

```
├── app/                   # Next.js App Router routes and layouts
│   ├── about/             # About page route
│   ├── admin/             # Admin dashboard routes
│   ├── api/               # API routes
│   ├── auth/              # Authentication routes (login, register)
│   ├── blog/              # Blog related routes
│   │   └── [slug]/        # Dynamic route for individual blog posts
│   ├── category/          # Category pages for filtering blog posts
│   ├── contact/           # Contact page route
│   ├── contribute/        # Contribution page routes
│   ├── interview-experiences/ # Interview experiences section
│   ├── legal/             # Legal pages (privacy, terms)
│   ├── premium/           # Premium content routes
│   ├── profile/           # User profile routes
│   ├── roadmap/           # Roadmap pages
│   ├── search/            # Search functionality
│   ├── globals.css        # Global CSS styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Homepage component
├── components/            # Reusable React components
│   ├── auth/              # Authentication-related components
│   ├── blog/              # Blog-specific components
│   ├── layout/            # Layout components (Navbar, Footer, etc.)
│   ├── ui/                # UI components from shadcn/ui
│   └── ThemeProvider.tsx  # Theme context provider
├── context/               # React context providers
│   └── AuthContext.tsx    # Authentication context
├── lib/                   # Utility functions and helpers
│   ├── auth/              # Authentication utilities
│   ├── data/              # Data fetching and mock data
│   ├── hooks/             # Custom React hooks
│   └── utils.ts           # General utility functions
├── public/                # Static assets
└── types/                 # TypeScript type definitions
```

## Architecture

DevBlog follows a modern, component-based architecture with clean separation of concerns:

### Client-Server Model
- **App Router**: Uses Next.js App Router for advanced routing capabilities
- **Hybrid Rendering**: Combines client and server components for optimal performance

### State Management
- **React Context**: Leverages React Context API for global state management (Auth, Theme)
- **Local State**: Uses React's useState and useEffect for component-level state

### Data Flow
1. **Data Fetching**: Currently uses mock data from lib/data/mockData.ts (can be replaced with real API calls)
2. **State Management**: Context providers manage global application state
3. **UI Rendering**: Components consume state and render accordingly
4. **Interactions**: User actions trigger state updates which re-render relevant components

## Routing Pattern

The application uses Next.js 15's App Router for file-based routing:

- **Static Routes**: Direct folder-to-route mapping (e.g., `/about` maps to `app/about/`)
- **Dynamic Routes**: Using square brackets for dynamic segments (e.g., `/blog/[slug]`)
- **Route Grouping**: Logical organization of related routes
- **Layouts**: Shared layouts using layout.tsx files

## Rendering Approach

DevBlog uses Next.js hybrid rendering model:

### Server Components (Default)
- Most page components default to server rendering
- Benefits include SEO optimization, reduced client-side JavaScript

### Client Components
- Components marked with `'use client'` directive are rendered on the client
- Used for components that:
  - Need interactivity (forms, buttons)
  - Use browser-only APIs
  - Maintain local state
  - Use React hooks

The blog posts use client-side rendering with the `'use client'` directive, allowing for interactive features like comments and likes while still having good SEO through metadata optimization.

## Design Patterns

### Component Composition
- Small, reusable components are composed to build larger UI elements
- Example: Blog cards, comment sections, form elements

### Provider Pattern
- Context providers (AuthProvider, ThemeProvider) make global state available throughout the component tree

### Container/Presentational Pattern
- Separation between data-fetching logic and UI rendering
- Page components handle data fetching while smaller components focus on presentation

### Custom Hooks Pattern
- Extraction of reusable logic into custom hooks
- Example: Authentication logic in useAuth hook

## Getting Started

1. **Install dependencies**:
   ```
   npm install
   ```

2. **Run development server**:
   ```
   npm run dev
   ```

3. **Build for production**:
   ```
   npm run build
   ```

4. **Start production server**:
   ```
   npm start
   ```

## Development

The application is built with developer experience in mind:

- **TypeScript** for static type checking
- **ESLint** for code linting
- **Tailwind CSS** for easy styling
- **shadcn/ui** for rapid component development

## Future Enhancements

- Replace mock data with real API integration
- Add full authentication with JWT or OAuth
- Implement server-side data fetching for better SEO
- Add pagination for blog listing pages
- Implement search functionality with filters
