'use server';

import { getUserSessionServer } from "../auth/get-user-server-session";

export const getUserStatus = async (id: string) => {
  const user = await getUserSessionServer()

  if (!user) return null

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/users/one/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`
        },
      }
    );

    if (!response.ok) {
      return {
        ok: false,
        message: 'No se puede obtener el estatus del usuario'
      }
    }

    const data = await response.json()

    return {
      ok: true,
      message: 'Estatus del usuario obtenido correctamente',
      userStatus: data
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener el estatus del usuario'
    }
  }
}