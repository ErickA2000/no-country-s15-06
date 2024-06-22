import { getSubscription } from "@/actions";
import { Badge } from "@nextui-org/react";

export const UserStatus = async () => {
  const { subscription } = await getSubscription()

  const subscriptionNextPayment = () => {
    if (subscription?.nextPayment) {
      return new Date(subscription?.nextPayment).toLocaleDateString('es-CL')
    }
    return 'Vencida'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 mt-8">
      <div className="flex flex-col items-center p-4 border-2 rounded-lg border-[#1F7F95]">
        <p className="text-sm font-semibold text-[#175F70]">Estado de membresía</p>
        <Badge variant="flat" color={subscription?.state === "active" ? "success" : "default"}>
          <span className={`font-semibold text-[28px] ${subscription?.state === "active" ? "text-[#0BBC12]" : "text-red-600"}`}>
            {subscription?.state === "active" ? "Activo" : "Inactivo"}
          </span>
        </Badge>
      </div>
      <div className="flex flex-col items-center p-4 border-2 rounded-lg  border-[#1F7F95]">
        <p className="text-sm font-semibold text-[#175F70]">Valor de la cuota</p>
        <p className="font-semibold text-[28px] text-[#175F70]">$ {subscription?.price.toLocaleString('es-CL')}</p>
      </div>
      <div className="flex flex-col items-center p-4 border-2 rounded-lg  border-[#1F7F95]">
        <p className="text-sm font-semibold text-[#175F70]">Vencimiento de la cuota</p>
        <p className={`font-semibold text-[28px] ${subscription?.state === "active" ? "text-[#175F70]" : "text-red-600"}`}>
          {subscriptionNextPayment()}
        </p>
      </div>
      <div className="flex flex-col items-center p-4 border-2 rounded-lg  border-[#1F7F95]">
        <p className="text-sm font-semibold text-[#175F70]">Número de socio</p>
        <p className="font-semibold text-[28px] text-[#175F70]">850</p>
      </div>
    </div>
  )
}
