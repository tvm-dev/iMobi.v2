import { FaCity, FaHotel, FaMapPin, FaSort, FaTag } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';

export const homeFilter = [
  {
    icon: <FaHotel />,
    label: 'Tipo',
    initOptionText: 'Todos',
  },
  {
    icon: <FaLocationDot />,
    label: 'UF',
    initOptionText: 'Todos',
  },
  {
    icon: <FaCity />,
    label: 'Cidade',
    initOptionText: 'Todas',
  },
  {
    icon: <FaMapPin />,
    label: 'Bairro',
    initOptionText: 'Todos',
  },
  {
    icon: <FaTag />,
    label: 'Modalidade',
    initOptionText: 'Todas',
  },
  // {
  //   icon: <FaSort />,
  //   label: 'Ordenar por',
  //   initOptionText: 'Padrão',
  // },
];
