import { getAllCollection } from '@/lib/dal';
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ElectionListTable} from "@/app/admin/dashboard/elections/election-list-table";


export default async function Election() {
  const collectionData = await getAllCollection();
  // console.log('Collection Data', collectionData);

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
          <ElectionListTable collectionData={collectionData} />
        {/*<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">*/}

          {/*<ul className="list-disc space-y-3 mt-5">*/}
          {/*  <h2>Elections</h2>*/}
          {/*  <Separator />*/}
          {/*</ul>*/}
        {/*</div>*/}
      </div>
    </div>
  );
}
//   <li key={collection.id} className="ml-5">
              //     <p className="flex h-5 items-center space-x-4 text-sm">
              //
              //     <Link href={`/admin/dashboard/elections/${collection.id}`} className="underline hover:no-underline">
              //       {collection.title}
              //     </Link>
              //     <Separator orientation="vertical" />
              //     <Link href={`${NEXT_DOMAIN_NAME}/login/${collection.id}`} className="text-primary underline hover:no-underline text-sm">
              //       {`${NEXT_DOMAIN_NAME}/login/${collection.id}`}
              //     </Link>
              //     </p>
              //   </li>