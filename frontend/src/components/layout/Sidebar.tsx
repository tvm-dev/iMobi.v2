'use client';
import { NAV_LINKS } from '@/shared/constants/navLinks';
import { CustomLink } from '@/components/ui/customLink';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Logo } from '../shared/Logo';
import { AiOutlineMail } from 'react-icons/ai';
import { ContactButton } from '../shared/ContactButton';

interface SidebarProps {
  onContactClick?: () => void;
}

export const Sidebar = ({ onContactClick }: SidebarProps) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <aside className='relative w-full bg-navy text-white py-4 px-4 md:px-16 '>
      <div className='flex items-center justify-between h-12'>
        {/* Título da sidebar */}
        <Logo iconSize={40} textSize='2' />

        {/* Navegação desktop */}
        <nav className='hidden md:flex gap-4'>
          {NAV_LINKS.map((nav, index) => (
            <CustomLink
              key={index}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
              line
            />
          ))}

          {/* Botão de contato */}
          <ContactButton onContactClick={onContactClick} line />
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
        <nav className='absolute left-0 right-0 top-full bg-navy w-full flex flex-col gap-4 p-4 md:hidden z-40'>
          {NAV_LINKS.map((nav, index) => (
            <CustomLink
              key={index}
              href={nav.href}
              icon={nav.icon}
              label={nav.label}
            />
          ))}
          {/* Botão de contato */}
          <ContactButton onContactClick={onContactClick} />
        </nav>
      )}
    </aside>
  );
};
