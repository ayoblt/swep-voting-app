import MobileHeader from './_components/mobile-header';
import DesktopSideBar from './_components/desktop-sidebar';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageBreadCrumbs } from '@/components/page-breadcrumbs';
import ThemeToggler from '@/components/theme-toggler';

export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full relative">
      <div className="max-md:hidden fixed inset-y-0 py-10 px-7 flex flex-col justify-between border-r bg-card z-[9999]">

      <DesktopSideBar />
      </div>
      <div className="flex flex-col md:ml-[300px] lg:ml-[320px] h-screen">
        <header className="flex h-14 py-2 items-center justify-between gap-4 border-b px-4 md:h-20 lg:px-6">
          <MobileHeader />
          {/*<div className="w-full md:w-2/3 lg:w-1/3 mx-auto">*/}
          {/*  /!*<form>*!/*/}
          {/*  /!*  <div className="relative">*!/*/}
          {/*  /!*    <Input*!/*/}
          {/*  /!*      type="search"*!/*/}
          {/*  /!*      placeholder="Search anything here"*!/*/}
          {/*  /!*      className="w-full appearance-none bg-background pl-8 shadow-none rounded-xl md:h-12"*!/*/}
          {/*  /!*    />*!/*/}
          {/*  /!*    <MagnifyingGlassIcon className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />*!/*/}
          {/*  /!*  </div>*!/*/}
          {/*  /!*</form>*!/*/}
          {/*</div>*/}
          <ThemeToggler />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 h-full">
          <div className="flex items-center">
            <PageBreadCrumbs />
          </div>
          <div className="flex flex-1 rounded-lg border border-dashed shadow-sm h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
