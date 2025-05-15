export interface SignUpForm {
  name: string;
  email: string;
  password: string;
  isVendor: boolean;
  company_name?: string;
  location?: string;
  social_links?: Record<string, string>;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  user_id: string;
  name: string;
  role: 'customer' | 'vendor' | 'admin';
  is_vendor: boolean;
  is_approved: boolean;
  social_links?: Record<string, string>;
  company_name?: string;
  location?: string;
  profile_image?: string;
  created_at: string;
  updated_at: string;
}
