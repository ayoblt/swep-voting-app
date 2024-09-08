import { unstable_noStore as noStore } from 'next/cache';
import {getCollection} from "@/lib/dal";
import {formatDate, formatTime} from "@/lib/utils";
import {Separator} from "@/components/ui/separator";
import Link from "next/link";
import {CollectionMiniCard} from "@/app/admin/dashboard/elections/[slug]/_components/collection-mini-card";
import {CandidateTable} from "@/app/admin/dashboard/elections/[slug]/_components/candidates-table";

export type Option = {
  id: string;
  value: string;
  created: string;
  no_of_votes: number;
};

type Poll = {
  id: string;
  title: string;
  required: boolean;
  no_of_options: number;
  created: string;
  no_of_votes: number;
  last_updated: string;
  options: Option[];
};

type Collection = {
  id: string;
  creator_id: string;
  title: string;
  start_time: string;
  end_time: string;
  eligible_voters: string;
  no_of_eligible_voters: number;
  no_of_polls: number;
  no_of_votes: number;
  created: string;
  last_updated: string;
  polls: Poll[];
};


const NEXT_DOMAIN_NAME = process.env.NEXT_DOMAIN_NAME || "http://localhost:8000";


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
              <Link href={`${NEXT_DOMAIN_NAME}/login/${collection_id}`} className="border-b text-primary">{`${NEXT_DOMAIN_NAME}/login/${collection_id}`}</Link>
          </div>
          <Separator />
          {/*<div>*/}
          {/*    {*/}
          {/*        collection.polls.map((poll) => (*/}
          {/*            <div key={poll.id}>*/}
          {/*                <h3>{poll.title}</h3>*/}
          {/*                <CandidateTable candidates={poll.options}/>*/}
          {/*            </div>*/}
          {/*        ))*/}
          {/*    }*/}
          {/*</div>*/}
      </div>
  );
}