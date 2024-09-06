import { getAllCollection, getCollection } from '@/lib/dal';
import CreateElectionStepCard from './_components/create-election-step-card';
import ElectionInfoForm from './_components/election-info-form';
import ElectionCard from './_components/election-card';
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function Election() {
  const collectionData = await getAllCollection();
  console.log('Collection Data', collectionData);

  if (!collectionData) return null;

  return (
    <div className="w-full py-8 md:p-8">
      <div className="h-full w-full md:w-11/12 lg:w-5/6 mx-auto space-y-6">
        <h1 className="text-xl font-bold">View Elections</h1>
        {collectionData.length === 0 && (
            <div className="flex flex-col ga-y-5 items-center justify-center h-full w-full">
              <h1>No Election Found!</h1>

        <Button asChild variant="link">

            <Link href="/admin/dashboard/elections/create">Create new Election</Link>
          </Button>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">


          {collectionData.map((collection: any) => (
            <ElectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </div>
    </div>
  );
}
