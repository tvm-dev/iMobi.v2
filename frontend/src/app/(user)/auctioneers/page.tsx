import { FormDivLinks } from '@/components/pages/auctioneers/formDivLinks';
import { AlertMessage } from '@/components/shared/AlertMessage';
import { Card } from '@/components/ui/card';
import {
  auctioneersLinksJudicialAuctions,
  auctioneersLinksBanks,
  auctioneersLinksAuctionPortals,
} from '@/shared/constants/auctioneersLinks';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'iMobi - Leilões',
  description: 'Agende seus leilões',
  // icons: {
  //   icon: '/favicon.ico',
  // },
};

export default function AuctioneersPage() {
  return (
    <Card className='w-full max-w-7xl px-9 py-9 mx-auto border-none shadow-2xl'>
      <h1 className='text-3xl text-center font-bold'>
        Leilões de Imóveis - Links Verificados
      </h1>
      <hr className='h-0.5  bg-black border-none' />
      <AlertMessage
        strong='Atualizado: '
        label='Todos os links abaixo foram verificados manualmente e estão ativos.'
      />
      <FormDivLinks
        title='🏛️ Leilões Judiciais'
        inputInfo={auctioneersLinksJudicialAuctions}
      />
      <FormDivLinks title='🏦 Bancos' inputInfo={auctioneersLinksBanks} />
      <FormDivLinks
        title='🌐 Portais de Leilões'
        inputInfo={auctioneersLinksAuctionPortals}
      />

      <AlertMessage
        strong='Dica: '
        label='Sempre verifique a procedência dos imóveis e a reputação do
        leiloeiro antes de participar de qualquer leilão.'
      />
    </Card>
  );
}
