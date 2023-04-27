import Image from 'next/image'
import React, { useState } from 'react'
import Logo from '@/public/logo-realta.png'
import listMenu from './listMenu'
import { GoChevronRight } from 'react-icons/go'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'

export default function Sidebar({
  showSidebar,
  setShowSidebar,
  loginData,
}: any) {
  const router = useRouter()
  const [dropdown, setDropdown] = useState({
    status: false,
    index: 0,
  })

  const showDropdown = (index: number) => {
    setDropdown({
      status: dropdown.index === index ? !dropdown.status : true,
      index,
    })
  }

  return (
    <div
      className={`sm:none duration-175 ease-linear fixed !z-50 flex h-full overflow-auto flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:!bg-navy-800 dark:text-white md:!z-50 lg:!z-50 xl:!z-0 w-80 ${showSidebar ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      <span
        className='absolute top-4 right-4 block cursor-pointer xl:hidden'
        onClick={() => setShowSidebar(!showSidebar)}
      >
        <AiOutlineClose />
      </span>

      <div className={`mx-5 mt-[50px] flex items-center`}>
        <Link href='/'>
          <Image
            src={Logo}
            alt='Hotel Realta Logo'
            className='w-full object-cover'
          />
        </Link>
      </div>

      <hr className='mx-5 mt-4 border border-gray-300' />
      {/* Nav item */}

      <ul className='mb-auto pt-1 mx-5'>
        {listMenu.map((menu, index) => {
          const Icon = menu.icon

          return (
            <>
              {menu.role.includes(loginData.user_role_id) ? (
                <li key={index} onClick={() => showDropdown(index)}>
                  {menu.submenu ? (
                    <div
                      className={`flex items-center p-4 text-base text-primary rounded-lg  group hover:bg-primary hover:text-white justify-between mt-2 ${router.pathname.startsWith(menu.path)
                        ? 'bg-primary text-white'
                        : 'hover:bg-bg-primary hover:text-white'
                        }`}
                    >
                      <div className='flex items-center'>
                        <Icon className='text-xl' />
                        <span className='ml-3 text-md font-medium'>
                          {menu.name}
                        </span>
                      </div>

                      {menu.submenu && (
                        <GoChevronRight
                          className={`hover:bg-primary hover:text-white ${dropdown.status && dropdown.index === index
                            ? 'rotate-90'
                            : ''
                            }`}
                        />
                      )}
                    </div>
                  ) : (
                    <Link
                      href={menu.to}
                      className={`flex items-center p-4 text-base text-primary rounded-lg group dark:text-white justify-between my-2 ${router.pathname.startsWith(menu.path)
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary hover:text-white'
                        }`}
                    >
                      <div className='flex items-center'>
                        <Icon className='text-xl' />
                        <span className='ml-3 text-md font-medium'>
                          {menu.name}
                        </span>
                      </div>
                    </Link>
                  )}
                </li>
              ) : null}

              {menu.submenu && dropdown.status && dropdown.index === index && (
                <div className=''>
                  {menu.submenu.map((submenu, index) => (
                    <Link
                      href={submenu.to}
                      key={submenu.to}
                      className='flex items-center gap-3 my-2 py-2 pl-12 rounded-md hover:bg-primary hover:text-white'
                    >
                      <span>{submenu.title}</span>
                    </Link>
                  ))}
                </div>
              )}
            </>
          )
        })}
      </ul>

      {/* Free Horizon Card */}
      <div className='flex justify-center'>{/* <SidebarCard /> */}</div>

      {/* Nav item end */}
    </div>
  )
}
