import { SignUp } from '@/components/pages/auth/register';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iMobi - Registro',
  description: 'Agende seus leilões',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function SignUpPage() {
  return <SignUp />;
}
