'use server'

interface RegisterUser {
  email: string
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  dni: number,
  address: string
}

export const registerUser = async (data: RegisterUser) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          username: data.username,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          dni: data.dni,
          address: data.address
        }),
      }
    );

    const responseData = await response.json()

    if (!responseData.success) {
      return {
        ok: false,
        message: responseData.message
      }
    }

    return {
      ok: true,
      message: 'Usuario creado correctamente'
    }
  } catch (error) {
    return {
      ok: false,
      message: `server error: ${error}`
    }
  }
}
