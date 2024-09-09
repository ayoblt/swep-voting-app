'use client';

import {useFormState, useFormStatus} from 'react-dom';
import { logout } from '@/app/actions/admin/auth';
import { Button } from './ui/button';
import { ExitIcon } from '@radix-ui/react-icons';
import Spinner from "@/components/icons/spinner";
import {useEffect} from "react";

const LogoutPending = () => {
    const {pending} = useFormStatus()
    return (
        <Button
          disabled={pending}
        type="submit"
        className="py-1 cursor-pointe"
        variant="destructive"
      >
          {pending ? <Spinner className="h-4 w-4 mr-2" /> : <ExitIcon className="h-4 w-4 mr-2" />}

        Logout
      </Button>
    )
}


const LogoutBtn = () => {
  const [state, formAction] = useFormState(logout, null);

  return (
    <form action={formAction}>
      <LogoutPending />
    </form>
  );
};

export default LogoutBtn;
