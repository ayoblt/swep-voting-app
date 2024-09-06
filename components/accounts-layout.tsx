import ThemeToggler from '@/components/theme-toggler';
import Image from 'next/image';

export default function AccountsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-screen grid lg:grid-cols-2 relative">
      <div className="h-full flex flex-col items-center justify-center space-y-5">
        <div className="lg:hidden bg-white rounded-full">
          <Image
            src="/images/oau-logo.png"
            alt="oau-logo"
            width={150}
            height={150}
          />
        </div>
        {children}
      </div>
      <div className="h-full max-lg:hidden rounded-bl-[5.4em] overflow-hidden relative">
        <Image
          src="/images/signin-bg-dark.png"
          alt="login"
          // layout="fill"
          width={900}
          height={650}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute z-50 left-1/2 -translate-x-1/2 top-20 rounded-full">
          <Image
            src="/images/oau-logo.png"
            alt="oau-logo"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className="fixed max-lg:top-7 lg:bottom-7 max-lg:right-7 lg:left-7">
        <ThemeToggler />
      </div>
    </main>
  );
}
