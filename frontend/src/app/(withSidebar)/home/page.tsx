import { CardLinks } from '@/components/pages/home/cardLinks';
import FileUploader from '@/components/pages/home/fileUploader';
import { HomeFilters } from '@/components/pages/home/homeFilters';
import { HomeTable } from '@/components/pages/home/homeTable';
import { Title } from '@/components/shared/Title';

export default function DashboardPage() {
  return (
    <div className='flex flex-col justify-between items-center'>
      {/* Titulo da pagina */}
      <Title
        label='Imóveis de Leilão'
        size='1'
        line='center'
        className='text-blue-950 mt-3 py-1.5'
      />

      {/* Div com os links para outros sites e o input para Carregar arquivos CSV */}
      <div className='w-full'>
        {/* Links  */}
        <CardLinks />
        {/* Input para carregar um arquivo CSV */}
        <FileUploader />
      </div>

      {/* Card com os filtros  */}
      <HomeFilters />

      {/* Tabela com os processos */}
      <HomeTable />
    </div>
  );
}
