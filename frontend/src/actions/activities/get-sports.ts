'use server'

import { IResponseSports } from "@/interfaces/activities.interface";
import { getUserSessionServer } from "../auth/get-user-server-session";

export const getSports = async (): Promise<IResponseSports> => {
  const user = await getUserSessionServer()
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/activities/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.accessToken}`,
        },
      }
    );

    if (response.status !== 200) {
      return {
        ok: false,
        message: 'Error al obtener las actividades',
        sports: null
      }
    }

    const rta = await response.json()

    //! fix type any
    const sports = rta.data.map((sport: any) => {
      return {
        ...sport.activity,
      }
    })

    if (rta.data.length === 0) {
      return {
        ok: false,
        message: 'No hay actividades',
        sports: null
      }
    }

    return {
      ok: true,
      message: 'Actividades obtenidas correctamente',
      sports,
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las actividades',
      sports: null
    }
  }
}