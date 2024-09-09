'use client' // Error boundaries must be Client Components

import { useEffect } from 'react'
import {Button} from "@/components/ui/button";
import Image from "next/image";

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
        <div className="relative mb-8">

            <Image src="/images/something-went-wrong.gif" alt="something went wrong" width={300} height={300}
                   className="object-cover object-center mx-auto"/>
        </div>
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