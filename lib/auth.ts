import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: "1",
            email: adminEmail,
            name: "Admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 horas
    updateAge: 0,
  },

  cookies: {
    sessionToken: {
      name: "fn.session-token",
      options: {
        httpOnly: true,     // não acessível via JavaScript
        sameSite: "lax",    // proteção CSRF
        path: "/",
        secure: process.env.NODE_ENV === "production", // HTTPS em produção
        maxAge: undefined, // cookie de sessão (expira quando o navegador é fechado)
      },
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
