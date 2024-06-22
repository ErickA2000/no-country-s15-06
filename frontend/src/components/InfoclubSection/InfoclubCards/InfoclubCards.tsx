"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/react";
import {
  AddressIcon,
  AddressIconDesktop,
  PhoneIcon,
  PhoneIconDesktop,
  TimeIcon,
} from "./assets";
import TimeIconDesktop from "./assets/TimeIconDesktop";

type Props = {
  data: {
    address: string;
    phone: string;
    schedule: string;
    user: string;
  };
};

export function InfoclubCards({ data }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const horaActual = new Date().getHours();
    if (horaActual >= 9 && horaActual < 23) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, []);

  return (
    <Card className="p-3 font-normal text-sm md:text-lg w-full bg-transparent md:bg-white/80 md:shadow-lg border-none shadow-none md:shadow-boxs radius-none font-monserrat">
      <CardBody className="flex flex-row gap-5 items-center">
        <div className="hidden md:block">
          <AddressIconDesktop />
        </div>
        <div className="md:hidden">
          <AddressIcon />
        </div>
        <div className="flex flex-col">
          <p className="text-perfect-blue hidden md:block">Dirección</p>
          <p className="text-black md:text-primary-400-D">{data.address}</p>
        </div>
      </CardBody>
      <CardBody className="flex flex-row gap-5 items-center">
        <div className="hidden md:block">
          <PhoneIconDesktop />
        </div>
        <div className="md:hidden">
          <PhoneIcon />
        </div>
        <div className="flex flex-col">
          <p className="hidden md:block text-perfect-blue">Teléfono</p>
          <p className="text-black md:text-primary-400-D">{data.phone}</p>
        </div>
      </CardBody>
      <CardBody className="flex flex-row gap-5 items-center">
        <div className="hidden md:block">
          <TimeIconDesktop />
        </div>
        <div className="md:hidden">
          <TimeIcon />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="text-perfect-blue me-5 hidden md:block">Horario</p>
            <p
              className={`md:ms-5 font-semibold ${
                open ? " text-[#25C849]" : " text-red-500"
              }`}
            >
              {open ? "Abierto" : "Cerrado"}
            </p>
          </div>
          <p className="text-black md:text-primary-400-D">
            Cierra a las {data.schedule}hs
          </p>
        </div>
      </CardBody>
    </Card>
  );
}
