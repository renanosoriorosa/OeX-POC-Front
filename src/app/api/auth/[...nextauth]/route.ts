/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions : AuthOptions  = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "seu@email.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        try {
          const res = await fetch("https://localhost:7121/api/v1/autenticacao/login", {
            method: "POST",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            }),
          });
          if (!res.ok) {
            return null;
          }
          
          const responseJson = await res.json();

          if(!responseJson.success){
            return null;
          }

          return {
            id: responseJson.data.userToken.id || responseJson.data.userToken.email, // Pode ser o ID real ou o email como fallback
            email: responseJson.data.userToken.email,
            name: responseJson.data.userToken.email,
            token: responseJson.data.accessToken,
          };
        } catch (error) {
          console.error("Erro ao autenticar:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.accessToken = user.token;
        token.id = user.id;
        token.email = user.email;
        token.tenantId = ''
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: "sua-chave-secreta",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
