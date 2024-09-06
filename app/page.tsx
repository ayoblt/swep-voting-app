import Link from 'next/link';

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center p-24 space-y-5">
      <h1 className="font-bold text-xl">SWEP 200 Student Voting App</h1>
      <Link
        href="/admin/accounts/login"
        className="underline hover:no-underline"
      >
        Login to Create an Election
      </Link>
    </section>
  );
}
