'use client'

import {ColumnDef} from "@tanstack/react-table";
import Link from "next/link";
import {DataTable} from "@/components/ui/data-table";
import {Collection, NEXT_DOMAIN_NAME} from "@/lib/definitions";
import CopyToClipboard from "@/components/copy-to-clipboard";

const columns: ColumnDef<Collection>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
    const collection = row.original;
    // console.log(candidate);

    return <Link href={`/admin/dashboard/elections/${collection.id}`} className="hover:underline">{collection.title}</Link>
  },
  },
  {
  id: 'votingLink',
  header: "Voting Link",
  cell: ({ row }) => {
      const collection = row.original;
      // console.log(candidate);

      return (
          <div className="flex items-center gap-x-2">
              <Link target="_blank" rel="noopener noreferrer" href={`/login/${collection.id}`} className="text-primary hover:underline">{`${NEXT_DOMAIN_NAME}/login/${collection.id.slice(0, 5)}...`}
              </Link>
              <CopyToClipboard textToCopy={`${NEXT_DOMAIN_NAME}/login/${collection.id}`}/>
          </div>
      )

  },
  },
];

export const ElectionListTable = ({collectionData}: { collectionData: Collection[] }) => {
    return (
        <div className="overflow-auto relative">
            <DataTable columns={columns} data={collectionData}/>
        </div>
    )
}