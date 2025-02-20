import DefaultSession from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id: string;
      email: string;
    } & DefaultSession["user"];
  }
}
