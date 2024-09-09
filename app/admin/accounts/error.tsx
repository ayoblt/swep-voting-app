'use client'

import { useEffect } from 'react'
import {Button} from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="h-full w-full grid place-content-center items-center text-center p-10">
      <h2>Something went wrong!</h2>
      <Button variant="link"
        onClick={

          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}