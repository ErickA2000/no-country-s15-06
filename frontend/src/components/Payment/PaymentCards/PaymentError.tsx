"use client";

import React from "react";
import { Button, Image, Link } from "@nextui-org/react";

type Props = {};

function PaymentError({}: Props) {
  return (
    <section className="bg-white rounded-2xl px-4 py-8 w-[343px] md:w-full border-1 border-solid-gray mb-0">
      <article className="mx-auto">
        <Image
          src="/images/logoBanner.svg"
          alt="Santa Ana Club Logo"
          width={250}
          height={93}
          className="block mb-8"
        />
        <div className="flex flex-col items-center justify-center gap-5 mb-12">
          <h1 className="text-xl md:text-5xl lg:text-7xl text-primary-400-D font-medium lg:p-12">
            Membresias inexistentes
          </h1>
          <Button as={Link} href="/" color="success" variant="flat">
            Volver al Inicio
          </Button>
        </div>
      </article>
    </section>
  );
}

export default PaymentError;
