'use server'

import { IMemberShipType, IResponseMemberShipType } from "@/interfaces/memberShipType.interface";
import { getUserSessionServer } from "../auth/get-user-server-session";
import { IPaymentTypeIds, IPaymentTypeInfo } from "@/interfaces/payment.interface";

export const getMemberShipTypes = async () => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/memberships`,
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
        message: 'No hay membresías disponibles',
        membershipTypes: null
      }
    }

    const data: IResponseMemberShipType = await response.json()

    // should be a array of IMemberShipType but is not so we need to cast it
    const responseData = data.date as IMemberShipType[]

    return {
      ok: true,
      message: 'Membresías obtenidas correctamente',
      membershipTypes: responseData
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las membresías',
      membershipTypes: null
    }
  }
}

export const getOneMemberShipTypes = async (id:string) => {
  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/v1/memberships/one/${id}`,
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
        message: 'No hay membresías disponibles',
        membershipTypes: null
      }
    }

    const responseData = await response.json()

    const memberShipTypeDataIdPayment: IPaymentTypeIds = {
      idMembership: responseData.data.id,
      idPlanProvider: responseData.data.idPlanProvider,
    }

    const memberShipTypeDataInfoPayment: IPaymentTypeInfo = {
      name: responseData.data.name,
      price: responseData.data.price,
      paymentFrequency: responseData.data.paymentFrequency,
    }

    return {
      ok: true,
      message: 'Membresías obtenidas correctamente',
      membershipDataIds: memberShipTypeDataIdPayment,
      membershipDataInfo: memberShipTypeDataInfoPayment
    }
  } catch (error) {
    return {
      ok: false,
      message: 'Error al obtener las membresías',
      membershipTypes: null
    }
  }
}