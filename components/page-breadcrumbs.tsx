'use client';

import { ChevronDownIcon, SlashIcon } from '@radix-ui/react-icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { RadioItem } from '@radix-ui/react-dropdown-menu';
import React from 'react';

// import { CurrentStepDisplay } from './apply/multi-step-form/current-step-display';

export const PageBreadCrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  //   console.log(paths);
  const activePath = paths.pop();
  const parentRoute = paths.slice(1);

  const cumulativePaths = parentRoute.map((item, index) => {
    return {
      label: item,
      href: '/admin/' + parentRoute.slice(0, index + 1).join('/'),
    };
  });

  // console.log({ pathname, paths, activePath, parentRoute });
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/admin/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem> */}

        {cumulativePaths && (
          <>
            {cumulativePaths.map((route, idx) => (
              <React.Fragment key={route.href}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={route.href} className="capitalize">
                      {route.label}
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                  <SlashIcon />
                </BreadcrumbSeparator>
              </React.Fragment>
            ))}
          </>
        )}

        {activePath && (
          <>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold capitalize">
                {activePath}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
