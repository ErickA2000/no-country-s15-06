'use server'

import { getUserSessionServer } from "@/actions/auth/get-user-server-session";

export const getSubscription = async () => {
  const user = await getUserSessionServer()

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/subscriptions/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`
        }
      }
    );

    if (response.status !== 200) {
      return {
        ok: false,
        message: 'Error al hacer la petición',
        subscription: null
      }
    }

    const rta = await response.json()

    if (rta.data.length === 0) {
      return {
        ok: false,
        message: 'No hay suscripción',
        subscription: null
      }
    }


    const subscription = {
      state: rta.data.state,
      price: rta.data.membership.price,
      nextPayment: rta.data.state === "cancelled" ? null : rta.data.nextPayment,
      idUser: rta.data.idUser
    }

    return {
      ok: true,
      message: 'Actividades obtenidas correctamente',
      subscription,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener la data',
      subscription: null
    }
  }
}