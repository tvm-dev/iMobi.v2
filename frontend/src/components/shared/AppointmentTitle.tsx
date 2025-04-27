import { Title } from '@/components/shared/Title';
import React from 'react';

interface ScheduleTitleProps {
  icon: React.ReactNode;
  label: string;
  color: string;
}

export const AppointmentTitle = ({
  color,
  icon,
  label,
}: ScheduleTitleProps) => {
  return (
    <div>
      <div className='flex flex-row items-center justify-items-start w-full gap-2 mb-3'>
        {icon}
        <Title label={label} size='3' className={`${color} mb-0`} />
      </div>
      <hr className='h-0.5 border-none bg-yellow-400' />
    </div>
  );
};
