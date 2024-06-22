// import { getUserSessionServer, loginGoogle } from "@/actions";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

interface LoginGoogleProps {
  searchParams: {
    code: string | null
    scope: string | null
    authuser: string | null
    prompt: string | null
  }
}

export default async function CheckRegisterPage({ searchParams }: LoginGoogleProps) {
  const { code, scope, authuser, prompt } = searchParams

  if (code && scope && authuser && prompt && code !== '' && scope !== '' && authuser !== '' && prompt !== '') {

    // const response = await loginGoogle({ code, scope, authuser, prompt });
    // console.log('response client:', response)

  }


  return (
    <div className="text-[#175F70]">
      <div className="w-[250px] h-[93px] mx-auto py-6">
        <Image
          src="/images/logoBanner.svg"
          alt="Santa Ana Club Logo"
          width={800}
          height={284}
        />
      </div>

      <h1 className="font-semibold text-2xl mt-9 mb-6 text-center">
        ¡Cuenta creada!
      </h1>

      <p className="font-normal text-sm px-8 mb-16 text-center">
        ¡Felicidades! Has completado tu registro en Santa Ana Club Deportivo.
      </p>

      <div className="w-full flex justify-center">
        <IoMdCheckmarkCircleOutline className="w-32 h-32 mb-11 text-[#17C964] text-center" />
      </div>

      <h2 className="font-semibold text-2xl text-center mb-14">
        ¡Muchas gracias!
      </h2>

      {/* buttons */}
      <div className="flex flex-col  items-center gap-3 mb-8">
        <Button
          as={Link}
          href="/dashboard/selectMembershipType"
          className="text-[#CC6600] rounded-lg bg-white w-72 border-2 border-[#CC6600]"
        >
          Seleccionar membresia
        </Button>

        <Button
          as={Link}
          href="/dashboard"
          className="text-[#CC6600] rounded-lg bg-white w-72 border-2 border-[#CC6600]"
        >
          Continuar sin membresia
        </Button>
      </div>
    </div>
  );
}

