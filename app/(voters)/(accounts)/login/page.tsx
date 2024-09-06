import { VoterLoginForm } from '@/components/voters/login-form';

export default async function LoginPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collection_id = searchParams['collection-id'];
  console.log(collection_id);

  return <VoterLoginForm collection_id={collection_id?.toString()} />;
}
