import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default function withAuth(Component: React.FC) {
  return async function ProtectedPage() {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      redirect("/login");
    }

    return <Component />;
  };
}
