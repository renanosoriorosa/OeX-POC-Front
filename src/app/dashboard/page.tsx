import withAuth from "@/utils/withAuth";

function Dashboard() {
  return <h1>Bem-vindo ao painel</h1>;
}

export default withAuth(Dashboard);
