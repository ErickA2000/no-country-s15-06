'use server'

import { getUserSessionServer } from "@/actions/auth/get-user-server-session";

export const cancelSubscription = async () => {
  const user = await getUserSessionServer()

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/subscriptions/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`
        },
        body: JSON.stringify({
          reason: 'Cancelación por parte del usuario'
        })
      }
    );

    if (response.status !== 200) {
      return {
        ok: false,
        message: 'Membresía se encuentra cancelada'
      }
    }

    const rta = await response.json()

    if (rta.data.length === 0) {
      return {
        ok: false,
        message: 'No hay suscripción'
      }
    }

    return {
      ok: true,
      message: 'Cancelación exitosa'
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener la data'
    }
  }
}