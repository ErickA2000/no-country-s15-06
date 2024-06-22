'use server'

// import { auth } from "@/auth.config"
// import { encode } from 'next-auth/jwt'
// import { cookies } from 'next/headers'

interface ILoginGoogle {
  code: string
  scope: string
  authuser: string
  prompt: string
}

export const loginGoogle = async (data: ILoginGoogle) => {
  const { code, scope, authuser, prompt } = data

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/google/callback?code=${code}&scope=${scope}&authuser=${authuser}&prompt=${prompt}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }
    );

    const responseData = await response.json()

    if (!responseData.success) {
      return {
        ok: false,
        message: responseData.message
      }
    }

    const user = responseData.data

    if (user === null) {
      return {
        ok: false,
        message: responseData.message
      }
    }

    // encrypt token
    // const encodedToken = await encode({
    //   token: user.accessToken,
    //   secret: process.env.NEXTAUTH_SECRET || '',
    //   salt: process.env.NEXTAUTH_SALT || ''
    // })

    // cookies().set('token', encodedToken)

    return {
      ok: true,
      message: 'Sesión iniciada correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Server error client'
    }
  }
}