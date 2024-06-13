'use server'

import { IProfileData } from "@/interfaces/accountProfile";
import { getUserSessionServer } from "../auth/get-user-server-session"

export async function getProfile() {

  const user = await getUserSessionServer()
  if (!user) return { ok: false, message: 'Error de usuario' };

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/users/profile`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`
        },
      }
    );

    if (!response.status) {
      console.error("error response", response)
      return {
        ok: false,
        message: 'Error al obtener la respuesta'
      }
    }

    const rta = await response.json() as IProfileData;

    if (!rta.success) {
      console.error(rta)
      return {
        ok: false,
        message: 'Error en la solicitud'
      }
    }

    return {
      ok: rta.success,
      message: 'Transaccion exitosa',
      data: rta.data
    }
  } catch {
    return {
      ok: false,
      message: 'Error al realizar la solicitud'
    }
  }
}