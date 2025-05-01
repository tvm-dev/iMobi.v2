'use client';
import { cn } from '@/shared/lib/cn';
import { api } from '@/shared/utils/api';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

interface CustomLinkProps {
  line?: boolean;
  className?: string;
}

export const LogoutButton = ({ line, className }: CustomLinkProps) => {
  async function logout() {
    try {
      const response = await api.delete('/logout');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <Link href={'/signin'} className={cn('flex flex-col group')}>
      <div
        onClick={logout}
        className={cn(
          'flex flex-row gap-1 items-start text-base',
          'group-hover:text-yellow-400',
          className // <- prioridade aqui
        )}
      >
        <FaSignInAlt size={22} />
        <span>Sair</span>
      </div>

      {/* Linha animada */}
      {line && (
        <div className='h-[2px] bg-yellow-500 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
      )}
    </Link>
  );
};
