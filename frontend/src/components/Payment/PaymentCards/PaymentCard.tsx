import React from "react";
import { Divider } from "@nextui-org/react";
import { IconBill } from "../assets";

type Props = {
  membershipData: {
    name: string;
    price: number;
    paymentFrequency: string;
  };
};

export function PaymentCard({ membershipData }: Props) {
  const total = membershipData.price + membershipData.price * 0.2;

  return (
    <>
      <div className="rounded-lg mb-8 font-inter mx-auto min-h-[300px]">
        <div className="p-5 lg:h-[392px] border-[#CECACA] border-1 rounded-lg bg-[#E6F1FE] ">
          <h2 className="mb-4 lg:mb-6 font-poppins text-primary-400-D text-2xl font-semibold lg:text-black">
            {membershipData.name}
          </h2>
          <div className="flex p-3 lg:p-6 bg-[#92D8E8] rounded-lg justify-between lg:flex-auto lg:min-w-[350px] lg:max-w-[386px] lg:content-between lg:flex-wrap">
            <ul className="text-dashed-gray font-medium text-sm lg:text-lg">
              <li>Numero de socio</li>
              <li>Tipo de Membresia</li>
              <li>Impuestos</li>
              <li>Costo del servicio</li>
            </ul>
            <ul className="font-medium text-sm lg:text-lg lg:font-semibold">
              <li>11458523</li>
              <li>{membershipData.paymentFrequency}</li>
              <li>%20</li>
              <li>US${membershipData.price}</li>
            </ul>
          </div>
        </div>
        <div className="px-2">
          <Divider className="border-dashed border-1 border-dashed-gray" />
        </div>
        <div className="flex w-full items-center justify-between px-6 py-5 lg:h-[146px] border-[#CECACA] border-1 rounded-lg bg-[#E6F1FE] ">
          <div className="text-primary-400-D lg:text-black">
            <p className="text-sm font-normal lg:text-3xl lg:font-semibold">
              Total
            </p>
            <p className="text-2xl font-semibold lg:text-3xl">US${total}</p>
          </div>
          <IconBill />
        </div>
      </div>
    </>
  );
}
