import { cn } from '@/shared/lib/cn';
import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  line?: boolean;
  className?: string;
  _blank?: boolean;
}

export const CustomLink = ({
  href,
  icon,
  label,
  line,
  className,
  _blank,
}: CustomLinkProps) => {
  return (
    <Link
      href={href}
      className={cn('flex flex-col group')}
      target={_blank ? '_blank' : ''}
    >
      <div
        className={cn(
          'flex flex-row gap-1 items-start text-base',
          'group-hover:text-yellow-400',
          className // <- prioridade aqui
        )}
      >
        {icon}
        <span>{label}</span>
      </div>

      {/* Linha animada */}
      {line && (
        <div className='h-[2px] bg-yellow-500 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
      )}
    </Link>
  );
};
