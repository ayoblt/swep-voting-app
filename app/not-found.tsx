import Image from 'next/image';
import Link from 'next/link';

export default function NotFound({ message }: { message: string }) {
  return (
    <div className="h-screen bg-background relative flex flex-col items-center justify-center py-36">
      <h2 className="mb-8 text-lg font-medium whitespace-nowrap">
        {message || "Oops! Couldn't find the page you're looking for"}
      </h2>
      <div className="w-fit mb-8">
        <Image
          src="/images/not-found.png"
          alt="not found"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <div>
        <Link
          href="/"
          className="hover:no-underline hover:font-medium underline"
        >
          Resend Link
        </Link>
      </div>
    </div>
  );
}
