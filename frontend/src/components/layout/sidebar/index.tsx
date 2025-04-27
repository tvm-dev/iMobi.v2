'use client';
import { NAV_LINKS } from '@/shared/constants/navLinks';
import { CustomLink } from '@/components/ui/customLink';
import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Logo } from '../../shared/Logo';
import { SideBarNavButton } from '../../shared/ContactButton';
import { MdEmail } from 'react-icons/md';
import { FaSignInAlt } from 'react-icons/fa';
import { ExtraButton } from './extraButton';

interface SidebarProps {
  onContactClick?: () => void;
}

export const Sidebar = ({ onContactClick }: SidebarProps) => {
  const [openSidebar, setOpenSidebar] = useState<boolean>(false);

  return (
    <aside className='flex items-center justify-center relative w-full bg-navy text-white py-4 px-4'>
      <div className='flex items-center justify-between h-12 max-w-7xl w-full md:px-4'>
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

          {/* Botão de contato e adicionar Agendamento */}
          <ExtraButton onContactClick={onContactClick} />

          {/* Botão de login e sair */}
          <CustomLink
            href={'/signin'}
            icon={<FaSignInAlt size={22} />}
            label={'Login'}
            line
          />
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
          {/* Botão de contato e adicionar Agendamento */}
          <ExtraButton onContactClick={onContactClick} />
        </nav>
      )}
    </aside>
  );
};
