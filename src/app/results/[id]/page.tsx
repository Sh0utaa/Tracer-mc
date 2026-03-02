import ResultComponent from "@/components/results/ResultComponent";

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id: sessionID } = await params;
  return <ResultComponent sessionID={sessionID} />;
}
