'use server'

import { signIn } from '@/auth.config'

interface ILogin {
  username: string
  password: string
}

export const login = async (data: ILogin) => {
  const username = data.username
  const password = data.password
  try {
    await signIn('credentials', {
      username, password,
      redirect: false
    })

    return {
      ok: true
    }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo iniciar sesión'
    }
  }
}