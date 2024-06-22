'use server'

import { IResponseActivity } from "@/interfaces/activities.interface";

export const getOneActivity = async (id: string): Promise<IResponseActivity> => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/activities/one/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }
    );

    if (response.status !== 200) {
      return {
        ok: false,
        message: 'Error al obtener las actividades',
        activity: null
      }
    }

    const rta = await response.json()

    if (rta.data.length === 0) {
      return {
        ok: false,
        message: 'No hay actividades',
        activity: null
      }
    }

    const activity = rta.data

    return {
      ok: true,
      message: 'Actividades obtenidas correctamente',
      activity
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las actividades',
      activity: null
    }
  }
}