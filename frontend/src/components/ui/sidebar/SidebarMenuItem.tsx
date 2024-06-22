'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface SideMenuItemProps {
  url: string
  icon: JSX.Element
  name: string
}

export const SidebarMenuItem = ({ url, icon, name }: SideMenuItemProps) => {
  const pathName = usePathname()

  return (
    <li className={`flex items-center justify-between rounded-2xl px-2 py-5 text-xl font-medium ${url === pathName ? "bg-[#92D8E8]" : "bg-[#175F70]"}`}>
      <Link href={url} className='flex items-center'>
        <span className='mr-5'>{icon}</span>
        <p>{name}</p>
      </Link>
    </li>
  )
}
