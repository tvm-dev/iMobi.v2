import Link from 'next/link';
import React from 'react';

interface CardLinkProps {
  icon: React.ReactNode;
  label: string;
  href: string;
}

export const CardLink = ({ href, icon, label }: CardLinkProps) => {
  return (
    <div className='flex flex-row gap-2 items-center'>
      {icon}
      <div>
        {label}{' '}
        <Link href={href} className='font-bold text-blue-950'>
          este link
        </Link>
      </div>
    </div>
  );
};
