import withAuth from "@/utils/withAuth";
import MotivoManutencaoContent from "./MotivoManutencaoContent";

export default async function MotivoManutencao() {
  return withAuth(() => (
    <MotivoManutencaoContent />
  ));
}