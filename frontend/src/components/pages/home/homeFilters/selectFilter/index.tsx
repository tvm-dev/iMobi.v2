import React from 'react';

interface SelectFilterProps {
  icon: React.ReactNode;
  label: string;
  initOptionText: string;
}

export const SelectFilter = ({
  icon,
  label,
  initOptionText = 'Todos',
}: SelectFilterProps) => {
  return (
    <div className='flex flex-col gap-2 flex-grow basis-[200px] max-w-full text-blue-900'>
      <div className='flex flex-row gap-2 items-center justify-items-start'>
        {icon} <span>{label}</span>
      </div>
      <select className='w-full text-black border border-zinc-200 p-3 pr-10 rounded-xl text-init outline-none focus:border-blue-400 transition-all'>
        <option value=''>{initOptionText}</option>
      </select>
    </div>
  );
};
