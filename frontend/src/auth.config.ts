//auth.config.ts
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/dashboard'
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.data = user
      }
      return token
    },
    session({ session, token }) {
      //! fix type any
      session.user = token.data as any
      return session
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { username, password } = parsedCredentials.data

        const response = await fetch(
          `${process.env.BACKEND_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              password,
            }),
          }
        );
        const responseData = await response.json()
        const userData = responseData.data

        const user = {
          email: userData.account.email,
          username: userData.account.username,
          firstName: userData.account.user.firstName,
          lastName: userData.account.user.lastName,
          role: userData.account.user.role.name,
          accessToken: userData.accessToken
        }

        if (!user) return null

        return user
      }
    })
  ]
}

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig)
