import Image from "next/image";
import Link from "next/link";
import {Button} from "@/components/ui/button";

const NEXT_DOMAIN_NAME = process.env.NEXT_DOMAIN_NAME;

export default function VoteSuccessPage({params}: {params: {slug: string}}) {
    const collection_id = params.slug
    return (
        <div className="min-h-screen grid place-content-center items-center text-center p-10">
            <div className="relative">

            <Image src="/images/success.gif" alt="success" width={300} height={300} className="object-cover object-center mx-auto" />
            </div>
            <p className="text-lg font-semibold">Your Vote has been Casted successfully. Results will be displayed after Election ends</p>
            <Button variant="link" asChild className="w-fit mx-auto">
                <Link href={`${NEXT_DOMAIN_NAME}/vote/results/${collection_id}`}>View results</Link>
            </Button>
        </div>
    )
}