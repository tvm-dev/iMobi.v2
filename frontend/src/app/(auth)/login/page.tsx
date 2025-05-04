import { SignIn } from '@/components/pages/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iMobi - Login',
  description: 'Agende seus leilões',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function SignInPage() {
  return <SignIn />;
}
