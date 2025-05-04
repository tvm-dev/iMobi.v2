import { CardLinks } from '@/components/pages/home/cardLinks';
import { HomeBottom } from '@/components/pages/home/homeBottom';
import { Title } from '@/components/shared/Title';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iMobi - Home',
  description: 'Agende seus leilões',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function HomePage() {
  return (
    <div className='flex flex-col justify-between items-center '>
      {/* Titulo da pagina */}
      <Title
        label='Imóveis de Leilão'
        size='1'
        line='center'
        className='text-blue-950 mt-3 py-1.5 '
      />

      {/* Div com os links para outros sites e o input para Carregar arquivos CSV */}
      <div className='w-full'>
        {/* Links  */}
        <CardLinks />

        <HomeBottom />
      </div>
    </div>
  );
}
