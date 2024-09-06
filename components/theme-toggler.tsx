'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  return (
    <span
      className="inline-flex items-center justify-center h-12 w-12 bg-gradient-to-br from-primary to-[#011627] rounded-full cursor-pointer text-white shadow-md"
      onClick={toggleTheme}
    >
        <MoonIcon className="w-5 h-5 hidden dark:inline" />
        <SunIcon className="w-5 h-5 dark:hidden" />

    </span>
  );
};

export default ThemeToggler;
