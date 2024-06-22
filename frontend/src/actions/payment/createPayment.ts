'use server'

import { getUserSessionServer } from "../auth/get-user-server-session"

interface Idata {
    service: string
    idMembership: string
    idPlanProvider: string
}


export async function createPayment(data: Idata){

    const user = await getUserSessionServer()
    if (!user) return { ok: false, message: 'Error de usuario'};

    try{
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/payments`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.accessToken}`
                },
                body: JSON.stringify({
                    "service": data.service,
                    "idMembership": data.idMembership,
                    "idPlanProvider": data.idPlanProvider,
                }),
            }
        );

        if(!response.status){
            return{
                ok: false,
                message: 'Error en al realizar el pago'
            }
        }

        const rta = await response.json();
        if(!rta.success){
            return{
                ok: false,
                message: 'Error en la solicitud'
            }
        }


        return{
            ok: rta.success,
            message: 'Transaccion exitosa',
            url: rta.data.pay_link,
        }
    }catch{
        return{
            ok:false,
            message: 'Error al realizar la solicitud'
        }
    }
}