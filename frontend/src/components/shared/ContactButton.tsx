import React from 'react';

interface ContactButtonProps {
  icon: React.ReactNode;
  text: string;
  onContactClick?: () => void;
  line?: boolean;
}

export const SideBarNavButton = ({
  onContactClick,
  line,
  icon,
  text,
}: ContactButtonProps) => {
  return (
    <div
      className={'flex flex-col group hover:cursor-pointer'}
      onClick={onContactClick}
    >
      <div className='flex flex-row gap-1 items-start text-base group-hover:text-yellow-400'>
        {icon}
        <span>{text}</span>
      </div>

      {/* Linha animada */}
      {line && (
        <div className='h-[2px] bg-yellow-500 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300'></div>
      )}
    </div>
  );
};
