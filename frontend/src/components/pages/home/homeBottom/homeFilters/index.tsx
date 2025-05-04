import { Card } from '@/components/ui/card';
import { SelectFilter } from './selectFilter';
import { homeFilter } from '@/shared/constants/homeFilter';
import { Dispatch, SetStateAction } from 'react';
import { usePropertyFilters } from '@/shared/hooks/propertyFilters';
import { FaSort } from 'react-icons/fa';

interface HomeFiltersProps {
  setFilters: Dispatch<
    SetStateAction<{
      uf: string;
      cidade: string;
      bairro: string;
      modalidade: string;
      tipo: string;
    }>
  >;

  filters: {
    uf: string;
    cidade: string;
    bairro: string;
    modalidade: string;
    tipo: string;
  };

  order:
    | 'Padrão'
    | 'Preço (menor para maior)'
    | 'Desconto (menor para maior)'
    | 'Preço (maior para menor)'
    | 'Desconto (maior para menor)';
  setOrder: Dispatch<
    SetStateAction<
      | 'Padrão'
      | 'Preço (menor para maior)'
      | 'Desconto (menor para maior)'
      | 'Preço (maior para menor)'
      | 'Desconto (maior para menor)'
    >
  >;
}

export const HomeFilters = ({
  setFilters,
  filters,
  order,
  setOrder,
}: HomeFiltersProps) => {
  const { filterOptions } = usePropertyFilters();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOrder(e.target.value as HomeFiltersProps['order']);
  };

  return (
    <Card className='flex flex-col justify-between p-7 mb-8 w-full border-none'>
      <section className='flex flex-wrap gap-4'>
        {homeFilter.map((filter, i) => {
          const option =
            filter.label.toLowerCase() as keyof typeof filterOptions;
          return (
            <SelectFilter
              key={i}
              icon={filter.icon}
              initOptionText={filter.initOptionText}
              label={filter.label as 'UF' | 'Cidade' | 'Bairro' | 'Modalidade'}
              options={filterOptions[option] ?? []}
              filters={filters}
              setFilters={setFilters}
            />
          );
        })}

        <div className='flex flex-col gap-2 flex-grow basis-[200px] max-w-full text-blue-900'>
          <div className='flex flex-row gap-2 items-center'>
            <FaSort />
            <span>Ordenar por</span>
          </div>
          <select
            className='w-full text-black border border-zinc-200 p-3 pr-10 rounded-xl text-init outline-none focus:border-blue-400 transition-all duration-300'
            onChange={handleChange}
            value={order}
          >
            <option value='Padrão'>Padrão</option>
            <option value='Preço (menor para maior)'>
              Preço (menor para maior)
            </option>
            <option value='Preço (maior para menor)'>
              Preço (maior para menor)
            </option>
            <option value='Desconto (menor para maior)'>
              Desconto (menor para maior)
            </option>
            <option value='Desconto (maior para menor)'>
              Desconto (maior para menor)
            </option>
          </select>
        </div>
      </section>
    </Card>
  );
};
