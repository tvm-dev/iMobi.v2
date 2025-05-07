import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';

export interface FilterOptions {
  uf: string[];
  cidade: string[];
  bairro: string[];
  modalidade: string[];
}

export const usePropertyFilters = () => {
  const [reload, setReload] = useState<boolean>(false);
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

        let message = 'Erro desconhecido. Tente novamente.';

        if (isAxiosError(error)) {
          message = error.response?.data?.message || error.message;
        } else if (error instanceof Error) {
          message = error.message;
        }

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchFilters();
  }, [reload]);

  return { filterOptions, loading, setReload };
};
