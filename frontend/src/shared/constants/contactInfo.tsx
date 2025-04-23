import { FaPhone, FaTimes, FaUserAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export const CONTACT_INFO = [
  {
    label: 'senadorx@gmail.com',
    icon: <MdEmail size={20} className='text-yellow-400' />,
  },
  {
    label: '(11) 96131-2020',
    icon: <FaPhone size={20} className='text-yellow-400' />,
  },
  {
    label: 'Tiago',
    icon: <FaUserAlt size={20} className='text-yellow-400' />,
  },
  {
    label: 'Seg-Sex: 9h às 18h',
    icon: <FaTimes size={20} className='text-yellow-400' />,
  },
];
