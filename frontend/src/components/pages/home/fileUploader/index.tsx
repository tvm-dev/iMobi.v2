'use client';
import { api } from '@/shared/utils/api';
import { isAxiosError } from 'axios';
import { useRef, useState } from 'react';
import { FaSpinner, FaFileImport } from 'react-icons/fa';
import { toast } from 'sonner';

interface FileUploaderProps {
  reload: boolean;
  setReload: (e: boolean) => void;
}

export default function FileUploader({ reload, setReload }: FileUploaderProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (!loading) fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) {
      toast.error('Arquivo invalido');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setLoading(true);
      await api.post('/property/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Imoveis lançados com sucesso');
      setReload(!reload);
    } catch (error) {
      console.error('Erro ao enviar arquivo:', error);

      let message = 'Erro desconhecido. Tente novamente.';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      toast.error(message);
    } finally {
      setLoading(false);
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
        {loading ? (
          <FaSpinner className='animate-spin text-blue-500' />
        ) : (
          <>
            <FaFileImport className='text-blue-500' />
            <span className='text-blue-950'>Carregar Arquivo CSV</span>
          </>
        )}
      </div>
    </div>
  );
}

// 'use client';
// import { api } from '@/shared/utils/api';
// import { isAxiosError } from 'axios';
// import { useRef } from 'react';
// import { FaFileImport } from 'react-icons/fa';
// import { toast } from 'sonner';

// interface FileUploaderProps {
//   reload: boolean;
//   setReload: (e: boolean) => void;
// }

// export default function FileUploader({ reload, setReload }: FileUploaderProps) {
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleDivClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileChange = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     const reader = new FileReader();

//     reader.onload = () => {
//       const fileContent = reader.result as string;

//       try {
//         // Salva o conteúdo do CSV no localStorage
//         localStorage.setItem('csvData', fileContent);
//         toast.success('Arquivo CSV salvo no navegador com sucesso');
//         setReload(!reload); // alterna o reload para forçar recarregamento se necessário
//       } catch (err) {
//         console.error('Erro ao salvar no localStorage:', err);
//         toast.error('Erro ao salvar o arquivo no navegador');
//       }
//     };

//     reader.onerror = () => {
//       console.error('Erro ao ler o arquivo:', reader.error);
//       toast.error('Erro ao ler o arquivo CSV');
//     };

//     reader.readAsText(file); // lê o conteúdo como texto
//   };

//   return (
//     <div
//       className='text-left max-w-[400px] mb-5 hover:cursor-pointer bg-white shadow-xl'
//       onClick={handleDivClick}
//     >
//       <input
//         type='file'
//         accept='.csv'
//         ref={fileInputRef}
//         className='hidden'
//         onChange={handleFileChange}
//       />
//       <div className='flex gap-2 items-center justify-center w-full h-14 border-2 border-dashed rounded-lg hover:cursor-pointer transition-colors'>
//         <FaFileImport className='text-blue-500' />
//         <span className='text-blue-950'>Carregar Arquivo CSV</span>
//       </div>
//     </div>
//   );
// }
