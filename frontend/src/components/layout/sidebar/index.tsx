'use client';
import { FaHome } from 'react-icons/fa';
import { NAV_SIDEBAR } from '@/constants/navSidebars';
import { SidebarLink } from '@/components/ui/sidebarLink';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import Link from 'next/link';

export const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);
  return (
    <aside className='w-full bg-navy text-white py-4 px-4 md:px-16'>
      <div className='flex items-center justify-between h-12'>
        {/* Título da sidebar */}
        <Link href={'/home'} className='flex items-center gap-2'>
          <FaHome size={40} className='text-yellow-400' />
          <h1 className='font-bold text-3xl'>iMobi</h1>
        </Link>

        {/* Navegação desktop */}
        <nav className='hidden md:flex gap-4'>
          {NAV_SIDEBAR.map((nav, index) => (
            <SidebarLink
              key={index}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
            />
          ))}
        </nav>

        {/* Ícone menu mobile */}
        <div className='flex md:hidden'>
          <GiHamburgerMenu
            size={35}
            className='hover:cursor-pointer'
            onClick={() => setOpenSidebar(!openSidebar)}
          />
        </div>
      </div>

      {/* Navegação mobile */}
      {openSidebar && (
        <nav className='flex flex-col gap-4 mt-4 md:hidden'>
          {NAV_SIDEBAR.map((nav, index) => (
            <SidebarLink
              key={index}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
            />
          ))}
        </nav>
      )}
    </aside>
  );
};
