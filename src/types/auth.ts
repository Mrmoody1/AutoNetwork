// src/types/auth.ts

export interface AuthUser {
  id: string
  email: string
  created_at: string
}

export interface AuthSession {
  user: AuthUser
  access_token: string
  refresh_token: string
  expires_in: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  business_name: string
  contact_name: string
  phone: string
}

export interface AuthResponse {
  user: AuthUser | null
  session: AuthSession | null
  error: Error | null
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetConfirm {
  token: string
  new_password: string
}

export interface AuthError {
  message: string
  status: number
}