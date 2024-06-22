"use client";

import React, { useState } from "react";
import { Button, Link } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  PayPalIcon,
  ShopPayIcon,
  GooglePayIcon,
  AmazonPayIcon,
  ApplePayIcon,
  CardIcon,
} from "../assets";
import { createPayment } from "@/actions";

type Props = {
  membershipData: {
    idMembership: string;
    idPlanProvider: string;
  };
};

export function PaymentButtons({ membershipData }: Props) {
  const router = useRouter();
  const [error, setError] = useState("");

  const handlePayPal = async () => {
    const { ok, message, url } = await createPayment({
      service: "paypal",
      ...membershipData,
    });

    if (!ok) {
      setError(message);
      return;
    }

    if (ok) {
      window.open(url, "_self");
    }
  };

  const handleClose = () => {
    setError("");
  };

  return (
    <>
      {error.length === 0 ? null : (
        <div className="bg-red-500/90 w-full rounded-b-lg absolute top-0 right-0 z-20 text-center text-white py-2">
          <Button color="primary" variant="light" onPress={() => handleClose()}>
            X
          </Button>
          {error}
          <Link
            href={"/"}
            className="right-10 top-0 bottom-0 absolute text-xs underline"
          >
            Volver al inicio
          </Link>
        </div>
      )}
      <div className="lg:w-[529px] font-inter hidden lg:block lg:ms-3">
        <div className="inline-flex items-center gap-4">
          <CardIcon />
          <h2 className="text-[#253058] font-semibold text-xl">
            Metodos de pago
          </h2>
        </div>
      </div>
      <div className="font-inter text-xs w-[300px] lg:w-[529px] mt-5 lg:ms-3">
        <Button
          isIconOnly
          className="bg-[#5A31F4] w-full text-white h-12 my-4 font-normal text-xs"
        >
          Buy with
          <ShopPayIcon />
        </Button>
        <Button
          isIconOnly
          className="bg-[#FFC43A] w-full h-12 mb-4 font-normal text-xs"
          onPress={() => handlePayPal()}
        >
          Buy with <PayPalIcon />
        </Button>
        <Button isIconOnly className="bg-black text-white w-full h-12 mb-4">
          <GooglePayIcon />
        </Button>
        <Button isIconOnly className="bg-button-gradient w-full h-12 mb-4">
          <AmazonPayIcon />
        </Button>
        <Button
          isIconOnly
          className="bg-black text-white w-full h-12 mb-4 font-normal text-xs"
        >
          Pay with <ApplePayIcon />
        </Button>
      </div>
    </>
  );
}
