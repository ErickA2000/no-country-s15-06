'use client'

import { login, registerUser } from "@/actions";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IFormRegisterUser {
  email: string
  username: string,
  password: string,
  firstName: string,
  lastName: string,
  dni: number,
  address: string
}

export const RegisterForm = () => {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { handleSubmit, register, formState: { errors } } = useForm<IFormRegisterUser>()

  const onSubmit = async (data: IFormRegisterUser) => {
    setErrorMessage('')
    setIsSubmitting(true)

    // server action
    const rta = await registerUser(data)

    if (!rta.ok) {
      setErrorMessage(rta.message)
      setIsSubmitting(false)
      return
    }

    await login({ username: data.username, password: data.password })

    const redirectTo = searchParams.get('redirectTo') || '/auth/check-register'

    window.location.replace(redirectTo)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 md:pl-10 lg:pl-36">

      <div className="flex flex-col w-full max-w-[600px]">
        <header className="flex flex-col items-start mb-14">
          <h1 className="font-semibold text-2xl text-[#1F7F95]">
            ¡Bienvenido al Club Santa Ana!
          </h1>
          <h2 className="font-semibold text-2xl text-[#1F7F95]" >Paso 1</h2>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {
            errorMessage && (
              <span className="text-red-500 mt-1">
                * {errorMessage}
              </span>
            )
          }

          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
            {/* firstname */}
            <div className="flex flex-col">
              <Input
                type="text"
                label="Nombre"
                placeholder="Charlene"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register('firstName', { required: true })}
              />
              {errors.firstName?.type === "required" && (
                <span className="text-red-500 mt-1">
                  * El nombre es requerido
                </span>
              )}
            </div>

            {/* lastname */}
            <div className="flex flex-col text-[#1F7F95] font-medium">
              <Input
                type="text"
                label="Apellido"
                placeholder="Reed"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register("lastName", { required: true })}
              />
              {errors.lastName?.type === 'required' && (
                <span className='text-red-500 mt-1'>* El apellido es requerido</span>
              )}
            </div>

            {/* username */}
            <div className="flex flex-col">
              <Input
                type="text"
                label="Nombre de usuario"
                placeholder="Charlene"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register('username', { required: true, minLength: 4, maxLength: 10 })}
              />
              {errors.username?.type === "required" && (
                <span className="text-red-500 mt-1">
                  * El nombre de usuario es requerido
                </span>
              )}
              {errors.username?.type === "minLength" && (
                <span className="text-red-500 mt-1">
                  * El username debe tener al menos 4 caracteres
                </span>
              )}
              {errors.username?.type === "maxLength" && (
                <span className="text-red-500 mt-1">
                  * El username no debe tener más de 10 caracteres
                </span>
              )}
            </div>

            {/* email */}
            <div className="flex flex-col">
              <Input
                type="email"
                label="Email"
                placeholder="charlenereed@gmail.com"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register('email', { required: true, pattern: /^\S+@\S+$/ })}
              />
              {errors.email?.type === "required" && (
                <span className="text-red-500 mt-1">
                  * El correo es requerido
                </span>
              )}
            </div>

            {/* password */}
            <div className="flex flex-col">
              <Input
                type="password"
                label="Contraseña"
                placeholder="******"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@;:._/-]).+$/ })}
              />
              {errors.password?.type === "required" && (
                <span className="text-red-500 mt-1">
                  * La contraseña es requerida
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-500 mt-1">
                  * La contraseña no cumple con ninguno de estos requisitos: al menos una letra mayúscula, al menos una letra minúscula, al menos un número o al menos uno de los siguientes caracteres especiales @; :-_/
                </span>
              )}
            </div>

            {/* dni */}
            <div className="flex flex-col text-[#1F7F95] font-medium">
              <Input
                type="text"
                label="DNI"
                placeholder="45962"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register('dni', { required: true, minLength: 7, maxLength: 9 })}
              />
              {errors.dni?.type === "required" && (
                <span className="text-red-500 mt-1">
                  * El DNI es requerido
                </span>
              )}
              {
                errors.dni?.type === "minLength" && (
                  <span className="text-red-500 mt-1">
                    * El DNI debe tener al menos 7 caracteres
                  </span>
                )
              }
              {
                errors.dni?.type === "maxLength" && (
                  <span className="text-red-500 mt-1">
                    * El DNI no debe tener más de 9 caracteres
                  </span>
                )
              }
            </div>

            {/* address */}
            <div className="flex flex-col text-[#1F7F95] font-medium">
              <Input
                type="text"
                label="Dirección"
                placeholder="San José, California, USA"
                labelPlacement='outside'
                className="text-[#1F7F95] font-medium"
                {...register("address", { required: true })}
              />
              {errors.address?.type === 'required' && (
                <span className='text-red-500 mt-1'>* La dirección es requerido</span>
              )}
            </div>

          </div>

          {/*  terms & conditions */}
          <div className="mt-[30px] flex justify-center items-center text-center px-5 text-[#2AAECC] font-normal" >
            <p>Al hacer clic en Continuar, acepta nuestros <Link href={'/terms-policy'} className="font-semibold text-[#103F4B]">Términos de servicio y Política de privacidad</Link> </p>
          </div>

          {/* login & google button*/}
          <div className="flex flex-col gap-4 pt-5 mt-10 pb-5">
            <Button
              type="submit"
              isDisabled={isSubmitting}
              className="w-full bg-white text-[#CC6600] border-2 border-[#CC6600]  text-xl h-[55px]"
              variant="solid"
            >
              Continuar
            </Button>
          </div>

        </form>
      </div >

    </div >
  )
}