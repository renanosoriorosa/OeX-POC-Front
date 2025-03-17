/* eslint-disable @typescript-eslint/no-explicit-any */
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { JSX } from "react";

export default async function withAuth(render: (session: any) => JSX.Element) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return render(session);
}
