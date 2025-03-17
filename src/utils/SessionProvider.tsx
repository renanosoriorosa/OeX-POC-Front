// SessionProvider.tsx
import { getServerSession } from "next-auth";
import MiniDrawer from "@/components/MiniDrawer";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <MiniDrawer userName={session?.user?.name ?? "Usuário"}>
      {children}
    </MiniDrawer>
  );
}
