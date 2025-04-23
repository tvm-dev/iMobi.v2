// src/components/shared/Logo.tsx
'use client';

import { sizeClasses } from '@/shared/constants/textSize';
import { getIcon } from '@/shared/utils/getIcon';
import { getRouteName } from '@/shared/utils/getRouteName';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LogoProps {
  textSize: '1' | '2' | '3' | '4';
  iconSize: number;
  versatileTitle?: boolean;
}

export function Logo({ iconSize, textSize, versatileTitle }: LogoProps) {
  const pathname = usePathname();

  return (
    <Link href='/home' className='flex items-center gap-2'>
      {getIcon(pathname, iconSize)}
      <h1 className={`font-bold ${sizeClasses[textSize]}`}>
        {versatileTitle ? `iMobi ${getRouteName(pathname)}` : 'iMobi'}
      </h1>
    </Link>
  );
}
