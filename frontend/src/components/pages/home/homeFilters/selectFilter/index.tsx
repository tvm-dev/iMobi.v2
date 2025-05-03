import { Dispatch, SetStateAction } from 'react';

interface SelectFilterProps {
  icon: React.ReactNode;
  label: 'UF' | 'Cidade' | 'Bairro' | 'Modalidade';
  initOptionText: string;
  options: string[]; // <- novo
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
}

export const SelectFilter = ({
  icon,
  label,
  initOptionText = 'Todos',
  options,
  setFilters,
  filters,
}: SelectFilterProps) => {
  const fieldMap = {
    UF: 'uf',
    Cidade: 'cidade',
    Bairro: 'bairro',
    Modalidade: 'modalidade',
    Tipo: 'tipo',
  } as const;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const field = fieldMap[label];
    const value = e.target.value;

    setFilters(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-2 flex-grow basis-[200px] max-w-full text-blue-900'>
      <div className='flex flex-row gap-2 items-center'>
        {icon} <span>{label}</span>
      </div>
      <select
        className='w-full text-black border border-zinc-200 p-3 pr-10 rounded-xl text-init outline-none focus:border-blue-400 transition-all duration-300'
        onChange={handleChange}
        value={filters[fieldMap[label]]}
      >
        <option value=''>{initOptionText}</option>
        {options.map(opt => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};
