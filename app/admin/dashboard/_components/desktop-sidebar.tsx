import { cn } from '@/lib/utils';
import { SideBar } from './sidebar';

const DesktopSideBar = () => {
  return (
      // <div
      //   className={cn(
      //     'max-md:hidden shadow-md border-r flex-col justify-between bg-card relative z-50'
      //   )}
      // >
      //
      // </div>
      <div className="h-full bg-card flex flex-col justify-between">
        <SideBar/>
      </div>
  );
};

export default DesktopSideBar;
