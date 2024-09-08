import Spinner from "@/components/icons/spinner";

export default function Loading ({className}: {className?: string}): JSX.Element {
    return <div className="h-screen w-full flex items-center justify-center">

        <Spinner className="w-10 h-10 " />
    </div>
}