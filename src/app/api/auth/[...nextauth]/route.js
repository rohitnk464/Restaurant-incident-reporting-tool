import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'admin@californiaburrito.com' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Hardcoded demo accounts for the assignment
        if (
          credentials?.email === 'admin@californiaburrito.com' &&
          credentials?.password === 'admin123'
        ) {
          return {
            id: '1',
            name: 'Store Manager',
            email: 'admin@californiaburrito.com',
            role: 'admin',
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET || 'california-burrito-super-secret-key-2026',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
