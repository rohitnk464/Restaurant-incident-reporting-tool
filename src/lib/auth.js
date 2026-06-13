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
        
        // 1. Regional Director (Admin) - Sees all stores
        if (
          credentials?.email === 'admin@californiaburrito.com' &&
          credentials?.password === 'admin123'
        ) {
          return {
            id: '1',
            name: 'Regional Director',
            email: 'admin@californiaburrito.com',
            role: 'admin',
            storeLocation: 'All',
          };
        }

        // 2. Store Manager - DTLA
        if (
          credentials?.email === 'dtla@californiaburrito.com' &&
          credentials?.password === 'manager123'
        ) {
          return {
            id: '2',
            name: 'Store Manager',
            email: 'dtla@californiaburrito.com',
            role: 'manager',
            storeLocation: 'California Burrito — Downtown LA',
          };
        }

        // 3. Store Manager - Santa Monica
        if (
          credentials?.email === 'sm@californiaburrito.com' &&
          credentials?.password === 'manager123'
        ) {
          return {
            id: '3',
            name: 'Store Manager',
            email: 'sm@californiaburrito.com',
            role: 'manager',
            storeLocation: 'California Burrito — Santa Monica',
          };
        }

        // 4. Store Manager - San Diego
        if (
          credentials?.email === 'sd@californiaburrito.com' &&
          credentials?.password === 'manager123'
        ) {
          return {
            id: '4',
            name: 'Store Manager',
            email: 'sd@californiaburrito.com',
            role: 'manager',
            storeLocation: 'California Burrito — San Diego',
          };
        }

        // 5. Store Manager - San Francisco
        if (
          credentials?.email === 'sf@californiaburrito.com' &&
          credentials?.password === 'manager123'
        ) {
          return {
            id: '5',
            name: 'Store Manager',
            email: 'sf@californiaburrito.com',
            role: 'manager',
            storeLocation: 'California Burrito — San Francisco',
          };
        }

        // 6. Store Manager - Oakland
        if (
          credentials?.email === 'oakland@californiaburrito.com' &&
          credentials?.password === 'manager123'
        ) {
          return {
            id: '6',
            name: 'Store Manager',
            email: 'oakland@californiaburrito.com',
            role: 'manager',
            storeLocation: 'California Burrito — Oakland',
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
        token.storeLocation = user.storeLocation;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.storeLocation = token.storeLocation;
      }
      return session;
    }
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};
