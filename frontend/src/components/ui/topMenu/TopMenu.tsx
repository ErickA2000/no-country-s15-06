import Link from 'next/link'
import { BiCategory } from 'react-icons/bi'
import { DiAptana } from 'react-icons/di'
import { FiServer } from 'react-icons/fi'

export const TopMenu = () => {
  const navLinks = [
    {
      name: 'Home',
      icon: <BiCategory />,
      url: '/dashboard'
    },
    {
      name: 'Actividades',
      icon: <FiServer />,
      url: '/dashboard/activities'
    },
    {
      name: 'Configuración',
      icon: <DiAptana />,
      url: '/dashboard/account'
    }
  ]

  return (
    <nav className="px-5 justify-start items-center w-full hidden rounded-lg">
      {/* center menu */}
      <div className='flex mt-10 gap-4'>
        {
          navLinks.map((link, index) => (
            <Link key={index} href={link.url} className='flex items-center gap-2 text-sm font-medium text-[#175F70] hover:underline rounded-xl bg-[#F6F6F6] py-2 px-4'>
              <p>{link.name}</p>
            </Link>
          ))
        }
      </div>
    </nav>
  )
}