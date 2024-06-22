"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Avatar } from '@nextui-org/react'
import { CiHome, CiSearch, CiBellOn, CiBookmark, CiUser } from 'react-icons/ci';

export const UserSidebar: React.FC = () => {
  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleSetActiveLink = (index: number) => {
    setActiveLink(index);
  };

  return (
    <div className='border shadow-xl h-full bg-gray-100'>
      <div className='pt-16 hidden lg:flex'>
        <h2 className='text-3xl lg:m-auto'>Club Social X</h2>
      </div>
      <div className='flex flex-col justify-between'>
        <div className='flex flex-row justify-around py-2 lg:m-0 lg:py-0 lg:space-y-4 lg:pl-3 lg:pt-16 lg:flex-col'>
          <Link href="/" legacyBehavior>
            <a
              className={`flex items-center ${activeLink === 0 ? 'text-sky-500' : 'hover:text-sky-500'}`}
              onClick={() => handleSetActiveLink(0)}
            >
              <span className="mx-5 lg:mr-2">
                <CiHome />
              </span>
              <p className='hidden lg:flex'>Inicio</p>
            </a>
          </Link>
          <Link href="#" legacyBehavior>
            <a
              className={`flex items-center ${activeLink === 1 ? 'text-sky-500' : 'hover:text-sky-500'}`}
              onClick={() => handleSetActiveLink(1)}
            >
              <span className="mx-5 lg:mr-2">
                <CiSearch />
              </span>
              <p className='hidden lg:flex'>Actividades</p>
            </a>
          </Link>
          <Link href="#" legacyBehavior>
            <a
              className={`flex items-center ${activeLink === 2 ? 'text-sky-500' : 'hover:text-sky-500'}`}
              onClick={() => handleSetActiveLink(2)}
            >
              <span className="mx-5 lg:mr-2">
                <CiBellOn />
              </span>
              <p className='hidden lg:flex'>Notificaciones</p>
            </a>
          </Link>
          <Link href="#" legacyBehavior>
            <a
              className={`flex items-center ${activeLink === 3 ? 'text-sky-500' : 'hover:text-sky-500'}`}
              onClick={() => handleSetActiveLink(3)}
            >
              <span className="mx-5 lg:mr-2">
                <CiBookmark />
              </span>
              <p className='hidden lg:flex'>Membresia</p>
            </a>
          </Link>
          <Link href="/account" legacyBehavior>
            <a
              className={`items-center ${activeLink === 4 ? 'text-sky-500' : 'hover:text-sky-500'} hidden lg:flex`}
              onClick={() => handleSetActiveLink(4)}
            >
              <span className="mx-5 lg:mr-2">
                <CiUser />
              </span>
              <p className='hidden lg:flex'>Perfil</p>
            </a>
          </Link>
          <Link href="/account" legacyBehavior>
            <a>
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026302d"
                size="sm"
                className='shadow-grey lg:hidden'
              />
            </a>
          </Link>
        </div>
        <div className='mt-[24rem] px-5 pb-5 hidden lg:flex'>
          <button className="text-white rounded-lg bg-black border-2 border-black px-10 py-1 hover:border-black hover:bg-transparent hover:text-black transition duration-400 shadow-xl w-full">
            Cerrar Sesión
          </button>
        </div>

      </div>
    </div>
  );
};

