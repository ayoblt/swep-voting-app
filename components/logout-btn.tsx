'use client';

import { useFormState } from 'react-dom';
import { logout } from '@/app/actions/admin/auth';
import { Button } from './ui/button';
import { ExitIcon } from '@radix-ui/react-icons';

const LogoutBtn = () => {
  const [state, formAction] = useFormState(logout, null);

  return (
    <form action={formAction}>
      <Button
        type="submit"
        className="py-1 cursor-pointe"
        variant="destructive"
      >
        <ExitIcon className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </form>
  );
};

export default LogoutBtn;
