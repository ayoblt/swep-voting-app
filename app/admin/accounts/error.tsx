'use client' // Error boundaries must be Client Components

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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="h-full w-full grid place-content-center items-center text-center p-10">
      <h2>Something went wrong!</h2>
      <Button variant="link"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </div>
  )
}