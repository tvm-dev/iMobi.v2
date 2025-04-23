import { HiHome } from 'react-icons/hi';
import { FaCalendarCheck, FaGavel } from 'react-icons/fa';
import { AiOutlineMail } from 'react-icons/ai';

export const NAV_SIDEBAR = [
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
    icon: <FaCalendarCheck size={22} />,
  },
  {
    href: 'contact',
    label: 'Contato',
    icon: <AiOutlineMail size={22} />,
  },
];
