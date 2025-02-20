import withAuth from "@/utils/withAuth";

function Usuario() {
  return <h1>usuários</h1>;
}

export default withAuth(Usuario);
