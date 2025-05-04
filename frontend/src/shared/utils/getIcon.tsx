import { HiHome } from 'react-icons/hi';
import { FaCalendarCheck, FaGavel } from 'react-icons/fa';

export function getIcon(pathname: string, size: number) {
  switch (pathname) {
    case '/home':
      return <HiHome size={size} className='text-yellow-400' />;
    case '/auctioneers':
      return <FaGavel size={size} className='text-yellow-400' />;
    case '/appointments':
      return <FaCalendarCheck size={size} className='text-yellow-400' />;
    default:
      return <HiHome size={size} className='text-yellow-400' />;
  }
}
