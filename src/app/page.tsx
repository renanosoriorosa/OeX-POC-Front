import withAuth from "@/utils/withAuth";
import { Dashboard } from "@mui/icons-material";

function Home() {
  return (
      <Dashboard/>
  );
}

export default withAuth(Home);