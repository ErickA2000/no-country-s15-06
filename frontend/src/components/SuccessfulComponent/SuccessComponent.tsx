import React from "react";
import SuccessLogo from "./assets/SuccessLogo";
import Image from "next/image";
import { Button, Link } from "@nextui-org/react";

type Props = {
  success: boolean;
  message?: string | null;
};

export function SuccessComponent({ success, message }: Props) {
  return (
    <section className="flex flex-col justify-center w-full items-center gap-3">
      <article>
        <Image
          src="/images/logoBanner.svg"
          alt="Santa Ana Club Logo"
          width={400}
          height={150}
        />
      </article>
      <article className="flex flex-col justify-center w-full items-center gap-5">
        <h2 className="text-primary-400-D lg:text-5xl font-poppins font-semibold">
          {success ? "¡Pago exitoso!" : "¡Error en el pago!"}
        </h2>
        <p className="text-primary-400-D lg:text-lg font-inter font-normal">
          {success
            ? "¡Felicidades! Has completado la creación de tu cuenta y la compra de tu membresía en Santa Ana Club deportivo."
            : message}
        </p>
        <SuccessLogo />

        <h2 className="text-primary-400-D lg:text-4xl font-poppins font-semibold">
          {success && "¡Muchas Gracias!"}
        </h2>
      </article>
      <article className="mt-6">
        <Button
          as={Link}
          href={"/dashboard"}
          size="lg"
          variant="bordered"
          color={"primary"}
          radius="lg"
          className="bg-white border-primary-400 text-[#175F70]"
        >
          Acceder al dashboard
        </Button>
      </article>
    </section>
  );
}
