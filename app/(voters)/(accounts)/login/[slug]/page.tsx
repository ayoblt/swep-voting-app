import {VoterLoginForm} from "@/components/voters/login-form";

export default function Page({ params }: { params: { slug: string } }) {
  const collection_id = params.slug
  return <VoterLoginForm collection_id={collection_id} />;
}