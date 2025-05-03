import { useEffect, useState } from 'react';
import { api } from '../utils/api';

export interface FilterOptions {
  uf: string[];
  cidade: string[];
  bairro: string[];
  modalidade: string[];
}

export const usePropertyFilters = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    uf: [],
    cidade: [],
    bairro: [],
    modalidade: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const response = await api.get('/property/filters'); // ou URL completa
        setFilterOptions(response.data);
      } catch (error) {
        console.error('Erro ao buscar filtros:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, []);

  return { filterOptions, loading };
};
