'use client'

import {ColumnDef} from "@tanstack/react-table";
import {DataTable} from "@/components/ui/data-table";
import {cn} from "@/lib/utils";
import {Option} from "@/lib/definitions";


const candidatesColumns: ColumnDef<Option>[] = [
  {
    accessorKey: 'value',
    header: 'Name',
  },
  {
    accessorKey: 'no_of_votes',
    header: 'Total Votes',
  },
];

export const CandidateTable = ({candidates, className}: {candidates: Option[], className?: string}) => {
    const sortedCandidateList = candidates.sort((a, b) => b.no_of_votes - a.no_of_votes)
    console.log(sortedCandidateList)

    return <div className={cn("h-56 overflow-auto relative", className)}>
        <DataTable columns={candidatesColumns} data={sortedCandidateList}/>
    </div>
}