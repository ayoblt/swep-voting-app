import { getVotersCollection } from '@/lib/dal';
import {notFound} from "next/navigation";
import Dashboard from "@/app/(voters)/vote/_components/dashboard";

export default async function VotePage({ params }: { params: { slug: string } }) {
  const collection_id = params.slug

  const data = await getVotersCollection(collection_id);
  // console.log('data', data);

  // if (!data || !data.polls) {
  //   return (
  //     notFound()
  //   );
  // }
  return <Dashboard data={data} />;
}
