'use client'

import { logout } from '@/actions'

interface IButtonBackProps {
  className?: string
}

export const ButtonLogout = ({ className }: IButtonBackProps) => {

  const handleOnClik = async () => {
    await logout()
    window.location.replace('/')
  }


  return (
    <div className={`${className}`}>
      <button
        onClick={() => handleOnClik()}
        className='p-2 text-primary hover:cursor-pointer hover:underline rounded-md'
      >
        Cerrar sesión
      </button>
    </div>
  )
}