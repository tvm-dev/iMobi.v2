'use client';
import { useState } from 'react';
import { HomeFilters } from './homeFilters';
import { HomeTable } from './homeTable';
import FileUploader from '../fileUploader';

export const HomeBottom = () => {
  const [reload, setReload] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    uf: '',
    cidade: '',
    bairro: '',
    modalidade: '',
    tipo: '',
  });
  const [order, setOrder] = useState<
    | 'Padrão'
    | 'Preço (menor para maior)'
    | 'Desconto (menor para maior)'
    | 'Preço (maior para menor)'
    | 'Desconto (maior para menor)'
  >('Padrão');
  return (
    <div>
      {/* Input para carregar um arquivo CSV */}
      <FileUploader reload={reload} setReload={setReload} />

      {/* Card com os filtros  */}
      <HomeFilters
        reload={reload}
        filters={filters}
        setFilters={setFilters}
        order={order}
        setOrder={setOrder}
      />

      {/* Tabela com os processos */}
      <HomeTable filters={filters} order={order} reload={reload} />
    </div>
  );
};
