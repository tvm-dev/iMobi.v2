'use client';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { tableTitles } from '@/shared/constants/tableTitlesHome';
import { Property } from '@/shared/types/Property';
import { api } from '@/shared/utils/api';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

interface HomeFiltersProps {
  filters: {
    uf: string;
    cidade: string;
    bairro: string;
    modalidade: string;
  };
  order:
    | 'Padrão'
    | 'Preço (menor para maior)'
    | 'Desconto (menor para maior)'
    | 'Preço (maior para menor)'
    | 'Desconto (maior para menor)';
}

export const HomeTable = ({ filters, order }: HomeFiltersProps) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(20);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      try {
        const params = new URLSearchParams({
          page: page.toString(),
          perPage: perPage.toString(),
          order,
          ...filters,
        });
        console.log(order);
        const response = await api.get(`/property?${params.toString()}`);
        const newData = response.data.data;
        // console.log(response.data);
        // console.log(response.data.data);
        setProperties(prev => [...prev, ...newData]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProperties();
  }, [page, filters, order]);

  useEffect(() => {
    setProperties([]);
    setPage(1);
  }, [filters, order]);

  const handleScroll = () => {
    if (!cardRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = cardRef.current;
    // Quando atinge o final do scroll, avança a página
    if (scrollTop + clientHeight >= scrollHeight - 30) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div
      className={`
      ${properties.length === 0 ? 'max-h-[600px]' : ' h-[600px]'}
    h-[600px]  w-[1250px] mb-20 rounded-md bg-navy`}
    >
      <div
        ref={cardRef}
        onScroll={handleScroll}
        className='bg-white rounded-md border shadow-xl w-full h-full overflow-auto'
      >
        {/* Scroll horizontal e vertical */}
        <div className='w-max min-w-full'>
          <Table>
            <TableHeader className='sticky top-0 z-10 bg-navy'>
              <TableRow>
                {tableTitles.map((title, i) => (
                  <TableCell
                    key={i}
                    className='py-6 text-white font-bold bg-navy'
                  >
                    <div className='flex flex-row gap-1 justify-center items-center text-[17px]'>
                      {title.label} {title.icon}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties.map((property, i) => (
                <TableRow
                  key={i}
                  className={`${
                    i % 2 === 0 ? 'bg-zinc-100' : 'bg-white'
                  } text-[16px]`}
                >
                  <TableCell className='py-5'>{property.UF}</TableCell>
                  <TableCell>{property.Cidade}</TableCell>
                  <TableCell>{property.Bairro}</TableCell>
                  <TableCell>{property.Endereço}</TableCell>
                  <TableCell className='text-green-600 font-bold'>
                    R$ {property.Preço}
                  </TableCell>
                  <TableCell>R$ {property.Avaliação}</TableCell>
                  <TableCell>
                    <div className='bg-green-600 mx-auto text-white w-[60%] p-1 rounded-2xl'>
                      {property.Desconto} %
                    </div>
                  </TableCell>
                  <TableCell>{property.Tipo}</TableCell>
                  <TableCell>{property.Modalidade}</TableCell>
                  <TableCell>
                    <Link
                      className='flex flex-row items-center justify-center gap-2 pr-2 text-blue-400'
                      href={property.link}
                      target='_blank'
                    >
                      <FaExternalLinkAlt />
                      Ver
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {properties.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10} className='text-center py-6'>
                    Nenhum Imovel de Leilão
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
