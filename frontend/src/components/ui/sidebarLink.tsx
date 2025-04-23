import Link from 'next/link';

interface CustomLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const SidebarLink = ({ href, icon, label }: CustomLinkProps) => {
  return (
    <Link href={href} className='flex flex-col group'>
      <div className='flex flex-row gap-1 items-start text-base group-hover:text-yellow-400 '>
        {icon}
        <span>{label}</span>
      </div>

      {/* Linha animada */}
      <div className='h-[2px] bg-yellow-500 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
    </Link>
  );
};
