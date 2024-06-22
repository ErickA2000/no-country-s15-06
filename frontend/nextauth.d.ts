import { type DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user: {
      username: string
      fistName: string
      lastName: string
      email: string
      role: { name: string }
      accessToken: string
      image?: string
    } & DefaultSession['user']
  }
}