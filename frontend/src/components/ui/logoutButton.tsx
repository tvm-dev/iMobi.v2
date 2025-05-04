'use client';
import { cn } from '@/shared/lib/cn';
import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';
import { toast } from 'sonner';

interface CustomLinkProps {
  line?: boolean;
  className?: string;
}

export const LogoutButton = ({ line, className }: CustomLinkProps) => {
  async function logout() {
    try {
      await api.delete('/logout');
      toast.success('Logout realizado com sucesso');
    } catch (error) {
      console.error(error);
      let message = 'Erro desconhecido. Tente novamente.';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  }
  return (
    <Link href={'/login'} className={cn('flex flex-col group')}>
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
