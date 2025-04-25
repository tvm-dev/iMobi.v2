'use client';
import { useRef } from 'react';
import { FaFileImport } from 'react-icons/fa';

export default function FileUploader() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click(); // o "?" evita o erro de null
  };

  return (
    <div
      className='text-left max-w-[400px] mb-5 hover:cursor-pointer bg-white shadow-xl '
      onClick={handleDivClick}
    >
      <input type='file' accept='.csv' ref={fileInputRef} className='hidden' />
      <div
        className={`flex gap-2 items-center justify-center w-full h-14 border-2 border-dashed rounded-lg hover:cursor-pointer transition-colors`}
      >
        <FaFileImport className='text-blue-500' />
        <span className='text-blue-950'>Carregar Arquivo CSV</span>
      </div>
    </div>
  );
}
