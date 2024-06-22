import React from 'react';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-white/50 p-4 py-20 w-full h-full mb-24"
    >
      <div className="flex flex-col items-center gap-3">

        <Image
          src="/images/logoBanner.svg"
          alt="Santa Ana Club Logo"
          width={800}
          height={284}
        />

        <Button as={Link} href="/auth/register"
          variant="ghost"
          className="flex justify-center items-center px-3 w-full h-[70px] bg-white border-2 border-solid border-[#CC6600] text-[#CC6600] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-2xl text-xl font-semibold max-w-72"
        >
          Únete Ahora
        </Button>
      </div>
    </div>
  );
};

export default Banner;