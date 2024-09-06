import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PageBreadCrumbs } from '@/components/page-breadcrumbs';
import ThemeToggler from '@/components/theme-toggler';
import { SideBar } from './_components/sidebar';
import { cn } from '@/lib/utils';

export default function VoteDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[300px_1fr] lg:grid-cols-[320px_1fr] relative">
      <div
        className={cn(
          'max-md:hidden shadow-md border-r flex-col justify-between bg-card relative'
        )}
      >
        <div className="fixed inset-y-0 py-10 px-7  flex flex-col justify-between">
          <SideBar />
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b px-4 md:h-20 lg:px-6">
          {/* <MobileHeader /> */}

          <ThemeToggler />
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
