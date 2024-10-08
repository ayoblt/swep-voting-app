import {unstable_noStore as noStore} from "next/cache";

import {getCollection} from "@/lib/dal";
import {formatDate, formatTime} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {CollectionMiniCard} from "@/app/admin/dashboard/elections/[slug]/_components/collection-mini-card";
import {CandidateTable} from "@/components/candidates-table";
import {Collection, NEXT_DOMAIN_NAME} from "@/lib/definitions";
import CopyToClipboard from "@/components/copy-to-clipboard";


export default async function Page({ params }: { params: { slug: string } }) {
    noStore()
    const collection_id = params.slug
    const collection: Collection  = await getCollection(collection_id);

    let totalCandidates = 0;


    collection.polls.forEach((poll: any) => {
    totalCandidates += poll.no_of_options;
    });

  return (
      <div className="p-6 w-full space-y-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center">
              <CollectionMiniCard label="Title">
                <h3 className="text-xl font-semibold">{collection.title}</h3>
              </CollectionMiniCard>
              <CollectionMiniCard label="Created">
                <h3 className="text-xl font-semibold">{formatDate(collection.created, "short")}</h3>
                <h3 className="text-xl font-semibold">{formatTime(collection.created)}</h3>
              </CollectionMiniCard>
              <CollectionMiniCard label="Start Time">
                  <h3 className="text-xl font-semibold">{formatDate(collection.start_time, "short")}</h3>
                  <h3 className="text-xl font-semibold">{formatTime(collection.start_time)}</h3>
              </CollectionMiniCard>
              <CollectionMiniCard label="End Time">
                  <h3 className="text-xl font-semibold">{formatDate(collection.end_time, "short")}</h3>
                  <h3 className="text-xl font-semibold">{formatTime(collection.end_time)}</h3>
              </CollectionMiniCard>
              {/*<CollectionMiniCard label="Total Eligible Voters">*/}
              {/*      <h3 className="text-xl font-semibold">{collection.no_of_eligible_voters}</h3>*/}
              {/*</CollectionMiniCard>*/}
              <CollectionMiniCard label="Total Positions">
                <h3 className="text-xl font-semibold">{collection.no_of_polls}</h3>
              </CollectionMiniCard>
              <CollectionMiniCard label="Total Candidates">
                <h3 className="text-xl font-semibold">{totalCandidates}</h3>
              </CollectionMiniCard>
              <CollectionMiniCard label="Total Votes">
                <h3 className="text-xl font-semibold">{collection.no_of_votes}</h3>
              </CollectionMiniCard>
          </div>
          <Separator />
          <div className="flex max-lg:flex-col gap-x-4 lg:items-end">
              <h3 className="md:text-lg lg:text-xl font-semibold">Voters Link :</h3>
              <div className="flex items-center gap-x-2">
                  <Link target="_blank" rel="noopener noreferrer" href={`/login/${collection_id}`} className="border-b text-primary">{`${NEXT_DOMAIN_NAME}/login/${collection_id.slice(0, 5)}...`}
                  </Link>
                  <CopyToClipboard textToCopy={`${NEXT_DOMAIN_NAME}/login/${collection_id}`} />
              </div>
          </div>
          <Separator />
          <div className="space-y-16">
              {
                  collection.polls.map((poll) => (
                      <div key={poll.id} className="space-y-4">
                          <div className="">

                            <h3 className="text-lg font-semibold">{poll.title} <span className="font-normal">|</span> ({poll.no_of_votes} votes)</h3>
                              {/*<p className="font-medium">{poll.no_of_votes} total votes</p>*/}
                          </div>
                          <CandidateTable className="h-fit" candidates={poll.options}/>
                      </div>
                  ))
              }
          </div>
      </div>
  );
}