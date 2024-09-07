import {ColumnDef} from "@tanstack/react-table";
import {CandidatePosition} from "@/app/admin/dashboard/elections/_components/candidates-form";
import {DataTable} from "@/components/ui/data-table";
import {Option} from "@/app/admin/dashboard/elections/[slug]/page";


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

export const CandidateTable = ({candidates}: {candidates: Option[]}) => {
    return <div className="h-56 overflow-auto relative">
        <DataTable columns={candidatesColumns} data={candidates}/>
    </div>
}