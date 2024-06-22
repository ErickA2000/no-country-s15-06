import { getUserSessionServer } from "@/actions";
import { RegisterForm } from "@/components";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RegisterUserPage() {
  const user = await getUserSessionServer()

  if (user) {
    redirect('/dashboard')
  }
  return (
    <main className="flex w-full items-center justify-center bg-gradient-to-b from-[#FFFFFF] via-[#CDEDF5] to-[#C1E9F2] ">
      <div className="grid grid-cols-1 md:grid-cols-2 py-10 overflow-hidden gap-6 xl:gap-12 w-full">
        <RegisterForm />

        {/*  circle */}
        <div className="hidden md:block md:w-[793px] md:h-[724px] overflow-hidden">

          <div className="w-[920px] h-[920px] rounded-full relative lg:-top-5 md:left-10 lg:left-20 xl:left-40 overflow-hidden">
            <div className="w-[960px] h-[791px] absolute -top-12 right-80 2xl:right-64">
              <Image src="/imgFormLogin.jpg" alt="form-login" layout="fill" className="h-full" />
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}
