import React from "react";
import { Button, Card, CardHeader, CardBody, Image } from "@nextui-org/react";
const promotions = [
  {
    src: "/icons/shopping-cartcartMart.svg",
    name: "Precios exclusivos en la tienda",
  },
  {
    src: "/icons/Iconpercent.svg",
    name: "20% Off restaurante del club",
  },
  {
    src: "/icons/globeonline.svg",
    name: "Descuentos en tienda online del club",
  },
  {
    src: "/icons/dribbbleball.svg",
    name: "Descuento en las actividades del club",
  },

  {
    src: "/icons/tvtv.svg",
    name: "Accede a eventos exclusivos",
  },
];

export function BenefitsPromotionsSection() {
  return (
    <section className="flex sm:bg-transparent rounded-lg p-4 pb-0 md:pt-4 md:p-0 border-1 border-slate-500 sm:border-none border-solid bg-white flex-col gap-5 mt-6 w-11/12 max-w-7xl">
      <h1 className="w-full text-black md:text-primary-400 font-poppins font-semibold md:font-medium sm:text-2xl text-base leading-8">
        Beneficios y Promociones Exclusivas
      </h1>
      <div
        className=" flex sm:flex-row flex-col   gap-2 w-full  overflow-x-scroll"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {promotions.map((promotion, index) => {
          return (
            <Card
              key={index}
              className="sm:w-1/5 w-full flex min-w-52 sm:flex-col flex-row justify-center shadow-none items-center sm:border-solid border-none border-1 border-orange-400  "
            >
              <CardHeader className="flex   justify-center items-center sm:w-full max-w-8 p-1 me-4 mb-1">
                <Image
                  className=" rounded-none"
                  width={25}
                  height={25}
                  alt="Image with Zoom"
                  src={promotion.src}
                />
              </CardHeader>
              <CardBody className="flex w-full p-0">
                <span className=" md:text-center sm:text-sm md:text-lg text-black md:text-primary-400 font-inter md:font-poppins font-medium text-base-color font-base leading-5 p-1">
                  {promotion.name}
                </span>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

