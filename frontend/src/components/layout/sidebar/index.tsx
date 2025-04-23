import { SidebarDesktop } from './sidebarDesktop';
import { SidebarMobile } from './sidebarMobile';

export const Sidebar = () => {
  return (
    <div className='flex items-center h-12 py-8 px-16 bg-blue-200'>
      <SidebarDesktop />
      <SidebarMobile />
    </div>
  );
};
