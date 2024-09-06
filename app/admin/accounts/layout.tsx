import AccountsLayout from '@/components/accounts-layout';

export default function AdminAccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AccountsLayout>{children}</AccountsLayout>;
}
