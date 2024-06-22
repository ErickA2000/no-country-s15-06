import { Button, Link } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const HeroSection = (props: Props) => {
  return (
    <article className="relative flex items-center justify-center bg-slate-50 w-full h-screen" >
      <Image
        src="/images/HeroImage.svg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
      />
      <div className="absolute inset-0 z-10 bg-custom-gradient opacity-70"></div>
      <div className="relative z-20 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <h1 className="text-4xl font-bold text-santa-ana-blue">
          Bienvenido Santa Ana Club
        </h1>
        <p className="text-xl text-gray-medium">
          Donde las conexiones se convierten en amistades
        </p>
        <Button as={Link} href="/auth/register"
          className="text-base bg-transparent border-2 border-secondary-400 text-secondary-400"
          radius="lg"
          variant="bordered"
        >
          Únete Ahora
        </Button>
      </div>
    </article>
  );
};
