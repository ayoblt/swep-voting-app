import {unstable_noStore as noStore} from "next/cache";
import * as React from "react";
import {getCollectionResult} from "@/lib/dal";
import {CandidateTable} from "@/components/candidates-table";
import {Collection} from "@/lib/definitions";
import ThemeToggler from "@/components/theme-toggler";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";

export default async function Page({params}: {params: {slug: string}}) {
    noStore()
    const collection_id = params.slug
    const response = await getCollectionResult(collection_id)
    console.log(response)

    if (!response.success) {
        return <div className="min-h-screen grid place-content-center items-center text-center p-10">
            <div className="">
                <Image src="/images/waiting.gif" alt="waiting" width={300} height={300} className="object-cover object-center mx-auto" />
            </div>
            <p className="text-lg font-semibold text-center">Election in progress. Come back later</p>
        </div>
    }

    const collection: Collection = response.data

    return <div className="max-w-screen-xl pt-16 px-10 mx-auto min-h-screen w-full space-y-6">
        <div className="flex max-sm:flex-col-reverse gap-y-4 justify-between items-center">

        <h1 className="text-lg sm:text-xl md:text-2xl font-bold">Voting Results for {collection.title}</h1>
        <ThemeToggler />
        </div>
        <div className="border p-5 rounded-md space-y-12">

        {
              collection.polls.map((poll) => (
                  <React.Fragment key={poll.id}>
                      <div className="space-y-4 w-full">
                          <div className="">

                            <h3 className="text-lg font-semibold">{poll.title} <span className="font-normal">|</span> ({poll.no_of_votes} votes)</h3>
                              {/*<p className="font-medium">{poll.no_of_votes} total votes</p>*/}
                          </div>
                          <CandidateTable className="h-fit" candidates={poll.options}/>
                      </div>
                      <Separator />
                  </React.Fragment>
              ))
              }
    </div>
    </div>
}