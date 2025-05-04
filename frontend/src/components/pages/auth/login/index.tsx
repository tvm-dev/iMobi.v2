'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock } from 'lucide-react'; // ícones minimalistas
import { api } from '@/shared/utils/api';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { checkApiError } from '@/shared/utils/checkApiError';
import { isAxiosError } from 'axios';

export const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de login
    try {
      const response = await api.post('/signIn', { email, password });
      checkApiError(response);
      router.push('/home');
      toast.success('Login efetuado com sucesso');
    } catch (error) {
      console.error(error);

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
    <div className='min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-blue-50 p-6'>
      {/* Branding */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='mb-8 text-center'
      >
        <h1 className='text-4xl font-extrabold text-blue-700'>iMobi</h1>
        <p className='text-gray-600 mt-2 text-sm'>
          Controle total dos seus leilões
        </p>
      </motion.div>

      {/* Card de Login */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className='bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md'
      >
        <h2 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
          Acesse sua conta
        </h2>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div className='relative'>
            <Mail
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='email'
              placeholder='E-mail'
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <div className='relative'>
            <Lock
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='password'
              placeholder='Senha'
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
          </div>

          <button
            type='submit'
            className='w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-2 rounded-lg transition-colors'
          >
            Entrar
          </button>
        </form>

        <div className='text-center mt-6 text-sm text-gray-600'>
          Ainda não tem acesso?{' '}
          <a
            href='/signup'
            className='text-blue-600 hover:underline font-medium'
          >
            Crie sua conta
          </a>
        </div>
      </motion.div>

      {/* Rodapé */}
      <div className='mt-8 text-xs text-gray-400 text-center'>iMobi © 2025</div>
    </div>
  );
};
