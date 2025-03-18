import withAuth from "@/utils/withAuth";
import DashboardContent from "./DashboardContent";

export default async function Dashboard() {
  return withAuth(() => (
    <DashboardContent />
  ));
}