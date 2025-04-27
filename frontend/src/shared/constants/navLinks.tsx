import { HiHome } from 'react-icons/hi';
import { FaCalendarAlt, FaGavel } from 'react-icons/fa';

export const NAV_LINKS = [
  {
    href: 'home',
    label: 'Home',
    icon: <HiHome size={22} />,
  },
  {
    href: 'auctioneers',
    label: 'Leiloeiros',
    icon: <FaGavel size={22} />,
  },
  {
    href: 'appointments',
    label: 'Agendamentos',
    icon: <FaCalendarAlt size={22} />,
  },
];
