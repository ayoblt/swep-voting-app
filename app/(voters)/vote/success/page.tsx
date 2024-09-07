import Image from "next/image";

export default function VoteSuccessPage() {
    return (
        <div className="min-h-screen grid place-content-center items-center text-center p-10">
            <div className="relative">

            <Image src="/images/success.gif" alt="success" width={300} height={300} className="object-cover object-center mx-auto" />
            </div>
            <p className="text-lg font-semibold">Your Vote has been Casted successfully. Results will be displayed after Election ends</p>
        </div>
    )
}