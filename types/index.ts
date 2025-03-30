export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  image?: string;
  likedPosts?: string[]; // Array of post IDs that the user has liked
}

export interface Comment {
  id: string;
  content: string;
  post_id: string;
  author: User;
  created_at: string;
}

// Approval status for blog posts
export type PostStatus = 'draft' | 'pending' | 'approved' | 'rejected';

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  cover_image: string;
  author: User;
  category: Category;
  published_at: string;
  likes: number;
  views: number;
  likedBy?: string[]; // Array of user IDs who liked this post
  comments?: Comment[]; // Array of comments on this post
  status: PostStatus; // Approval status
  submission_date?: string; // Date when post was submitted for review
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
