'use server'

import { IResponseActivities } from "@/interfaces/activities.interface";

export const getActivities = async (): Promise<IResponseActivities> => {

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/activities`,
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
        activities: null
      }
    }

    const rta = await response.json()

    if (rta.data.length === 0) {
      return {
        ok: false,
        message: 'No hay actividades',
        activities: null
      }
    }

    const activities = rta.data

    return {
      ok: true,
      message: 'Actividades obtenidas correctamente',
      activities,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las actividades',
      activities: null
    }
  }
}