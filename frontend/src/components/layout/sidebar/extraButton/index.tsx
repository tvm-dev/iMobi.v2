'use client';
import { SideBarNavButton } from '@/components/shared/ContactButton';
import { usePathname } from 'next/navigation';
import { FaCirclePlus } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

interface ExtraButtonProps {
  onContactClick?: () => void;
}

export const ExtraButton = ({ onContactClick }: ExtraButtonProps) => {
  const pathname = usePathname();
  return (
    <div>
      {pathname !== '/appointments' ? (
        // Botão de contato
        <SideBarNavButton
          onContactClick={onContactClick}
          line
          icon={<MdEmail size={22} />}
          text='Contato'
        />
      ) : (
        // Botão para adicionar novo agendamento
        <SideBarNavButton
          onContactClick={() => {
            const element = document.getElementById('past-auctions');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}
          line
          icon={<FaCirclePlus size={22} />}
          text='Adicionar'
        />
      )}
    </div>
  );
};
