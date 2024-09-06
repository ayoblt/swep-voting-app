'use client';

import { Logo } from '@/components/logo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  CardStackIcon,
  DotsVerticalIcon,
  FileTextIcon,
  GearIcon,
  HamburgerMenuIcon,
  HomeIcon,
  MagnifyingGlassIcon,
} from '@radix-ui/react-icons';
import { redirect, usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutBtn from '@/components/logout-btn';
import { logout } from '@/lib/session';
import LogoutDropdown from './logout-dropdown';

interface DashBoardNavItemsProps {
  label: string;
  href: string;
  icon: React.ReactElement;
  subRoutes?: {
    label: string;
    href: string;
  }[];
}

const DashBoardNavItems: DashBoardNavItemsProps[] = [
  // {
  //   label: 'Home',
  //   href: '/admin/dashboard',
  //   icon: <HomeIcon className="h-5 w-5" />,
  // },
  // {
  //   label: 'Voters',
  //   href: '/admin/dashboard/voters',
  //   icon: <FileTextIcon className="h-5 w-5" />,
  // },
  {
    label: 'Elections',
    href: '/admin/dashboard/elections',
    icon: <CardStackIcon className="h-5 w-5" />,
    subRoutes: [
      {
        label: 'View Election',
        href: '/admin/dashboard/elections',
      },
      {
        label: 'Create Election',
        href: '/admin/dashboard/elections/create',
      },

      {
        label: 'Reports',
        href: '/admin/dashboard/elections/reports',
      },
    ],
  },
  // {
  //   label: 'Analytics',
  //   href: '/admin/dashboard/analytics',
  //   icon: <CardStackIcon className="h-5 w-5" />,
  // },
  // {
  //   label: 'Settings',
  //   href: '/admin/dashboard/settings',
  //   icon: <GearIcon className="h-5 w-5" />,
  // },
];
export const SideBar = ({handleSheetOpen}: {handleSheetOpen?: () => void}) => {
  const pathName = usePathname();
  return (
    <>
      <div className="">
        <Logo className="w-24 h-24" />
      </div>
      <nav className="space-y-14 md:text-lg font-medium mt-8">
        <div className="">
          <ul className="flex flex-col justify-center gap-y-7">
            {DashBoardNavItems.map((item, i) => (
              <li
                key={item.href}
                className={cn(
                  'rounded-md has-[.nav-item]:hover:bg-primary/30 transition duration-300',
                  !item.subRoutes && pathName === item.href && 'bg-primary/30'
                )}
              >
                {item.subRoutes ? (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger

                        className={cn(
                          'hover:no-underline px-6 py-2.5 hover:bg-primary/30 rounded-md group hover:text-white text-card-foreground ',
                          pathName.startsWith('/admin/dashboard/elections') &&
                            'bg-primary/30'
                        )}
                      >
                        <div
                          className={cn(
                            'flex gap-x-4 items-center text-lg lg:text-xl',
                            pathName === item.href
                              ? 'text-primary before:opacity-100'
                              : 'text-card-foreground hover:text- group-hover:text-white'
                          )}
                        >
                          {item.icon}
                          {item.label}
                        </div>
                      </AccordionTrigger>

                      <AccordionContent className="w-3/4 ml-auto flex flex-col space-y-3 p-3">
                        {item.subRoutes?.map((route) => (
                          <Link
                            key={route.href}
                            href={route.href}
                            onClick={handleSheetOpen}
                            className={cn(
                              'py-1 md:text-base hover:text-primary',
                              pathName === route.href && 'text-primary'
                            )}
                          >
                            {route.label}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <Link
                    onClick={handleSheetOpen}
                    href={item.href}
                    className={cn(
                      'flex gap-x-4 items-center nav-item text-lg lg:text-xl before:absolute px-6 py-2.5 ',
                      pathName === item.href
                        ? 'text-primary before:opacity-100'
                        : 'text-card-foreground hover:text-white'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="bg-primary rounded-md p-4 max-lg:md:p-2 flex items-center gap-x-2 text-white overflow-hidden relative mt-auto">
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <DotsVerticalIcon className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="hover:bg-none">
                <LogoutBtn />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
          <h4 className="text-xs font-semibold">Lateef Taiwo</h4>
          <p className="text-[10px] font-medium">
            lateeftaiwo@student.oauife.edu.ng
          </p>
        </div>
      </div>
    </>
  );
};

// before:absolute before:inset-y-0 before:bg-primary before:w-[6px] before:rounded-tr before:rounded-br relative before:-left-7 before:opacity-0

//before:inset-y-0 before:bg-primary before:w-[6px] before:rounded-tr before:rounded-br relative before:-left-7 before:opacity-0*