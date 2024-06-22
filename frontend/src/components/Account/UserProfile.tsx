import React from 'react'
import { Search } from "@/components"
import { Avatar } from "@nextui-org/avatar"
import { FaChevronLeft } from "react-icons/fa"

interface UserProfileProps {
  name: string;
  email: string;
  password: string;
  userName: string;
  tel: string;
  partner: string;
}

export const UserProfile: React.FC<UserProfileProps> = () => {
  return (
    <div className="border shadow-xl p-10 h-full">

    <Search/>        

    <div className="flex justify-between lg:my-16">
        <h2 className="lg:text-2xl flex items-center gap-2">
          <span className='lg:hidden'><FaChevronLeft/></span>
        Configurar cuenta
        </h2>
    </div>

    <div className="grid lg:grid-cols-[300px_2fr] lg:gap-8">
    <div className="mt-10">
        <div className="flex flex-col lg:items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" className="w-20 h-20 shadow-grey m-auto" />
        <p className="mt-2 text-center">Cambiar Imagen</p>
        </div>

    </div>
    <div className="grid lg:grid-cols-2 gap-5">
    <div className="space-y-5 lg:space-y-10 mt-10">
            <div className="flex flex-col justify-between">
            <label htmlFor="name" className="text-lg text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enrique G."
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
            <div className="flex flex-col justify-between">
            <label htmlFor="email" className="text-lg text-gray-700">
              Correo
            </label>
            <input
              type="email"
              name="email"
              placeholder="correo@correo.com.ar"
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
            <div className="flex flex-col justify-between">
            <label htmlFor="tel" className="text-lg text-gray-700">
              Telefono
            </label>
            <input
              type="tel"
              name="tel"
              placeholder="11-11111111"
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
        </div>
    <div className="space-y-5 lg:space-y-10 lg:mt-10">
    <div className="flex flex-col justify-between">
            <label htmlFor="usuario" className="text-lg text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              name="usuario"
              placeholder="enrique82"
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
            <div className="flex flex-col justify-between">
            <label htmlFor="password" className="text-lg text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              placeholder="***********"
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
            <div className="flex flex-col justify-between">
            <label htmlFor="partner" className="text-lg text-gray-700">
              Nro. Socio
            </label>
            <input
              type="number"
              name="partner"
              placeholder="240022"
              className='flex py-1 px-1 border rounded-md'
            />
            </div>
        </div>
    </div>
    </div>
        <div className="mt-10 lg:flex lg:justify-end lg:py-16">
            <button className="w-full lg:w-auto text-white rounded-lg bg-black border-2 border-black lg:px-10 py-1 hover:border-black hover:bg-transparent hover:text-black transition duration-400 shadow-xl">
                Guardar Cambios
            </button>
        </div>
</div>
  )
}

