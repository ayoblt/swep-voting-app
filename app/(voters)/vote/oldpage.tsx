import { getVotersCollection } from '@/lib/dal';
import Dashboard from './_components/dashboard';
import {notFound} from "next/navigation";

export default async function VotePage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const collection_id = searchParams['collection-id']?.toString();

  if (!collection_id) {
    return (
      <div className="grid place-content-center h-screen w-full">
        <h1>Collection id is required</h1>
      </div>
    );
  }

  const data = await getVotersCollection(collection_id);
  // console.log('data', data);

  if (!data || !data.polls) {
    return (
      notFound()
    );
  }
  return <Dashboard data={data} />;
}
