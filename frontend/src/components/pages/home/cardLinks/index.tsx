import { Card } from '@/components/ui/card';
import { FaCalculator, FaDownload } from 'react-icons/fa';
import { CardLink } from './cardLink';

export const CardLinks = () => {
  return (
    //  Links para outros sites
    <Card className='flex flex-col justify-between overflow-hidden items-start min-h-28 px-7 mb-8  w-full border-b-0 border-t-0 border-r-0 border-l-4 border-l-blue-500 '>
      {/* Link para site da caixa */}
      <CardLink
        href='https://venda-imoveis.caixa.gov.br/sistema/download-lista.asp'
        icon={<FaDownload className='text-blue-500' />}
        label=' Para baixar a lista de imóveis da caixa, acesse'
      />

      {/* Link para mais de 200 calculadoras e ferramentas */}
      <CardLink
        href='https://icontrolweb.com.br/'
        icon={<FaCalculator className='text-blue-500' />}
        label=' Para acessar + de 200 calculadoras e ferramentas online, acesse'
      />
    </Card>
  );
};
