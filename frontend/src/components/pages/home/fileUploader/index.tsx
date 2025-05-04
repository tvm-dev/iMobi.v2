'use client';
import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import { useRef } from 'react';
import { FaFileImport } from 'react-icons/fa';
import { toast } from 'sonner';

interface FileUploaderProps {
  reload: boolean;
  setReload: (e: boolean) => void;
}

export default function FileUploader({ reload, setReload }: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      await api.post('/property/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Imoveis lançados com sucesso');
      setReload(reload);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);

      let message = 'Erro desconhecido. Tente novamente.';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    }
  };

  return (
    <div
      className='text-left max-w-[400px] mb-5 hover:cursor-pointer bg-white shadow-xl'
      onClick={handleDivClick}
    >
      <input
        type='file'
        accept='.csv'
        ref={fileInputRef}
        className='hidden'
        onChange={handleFileChange}
      />
      <div className='flex gap-2 items-center justify-center w-full h-14 border-2 border-dashed rounded-lg hover:cursor-pointer transition-colors'>
        <FaFileImport className='text-blue-500' />
        <span className='text-blue-950'>Carregar Arquivo CSV</span>
      </div>
    </div>
  );
}
