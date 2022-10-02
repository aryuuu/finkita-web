import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "../../../configs"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    // ...add more providers here
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: `openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email`
        }
      }
    }),
  ],
    secret: JWT_SECRET,
    callbacks: {
      async jwt({ token, account, profile }) {
        // Persist the OAuth access_token to the token right after signin
        if (account) {
          token.accessToken = account.access_token
          token.idToken = account.id_token
        }
        return token
      },
      async session({ session, token, user }) {
        session.accessToken = token.accessToken
        session.idToken = token.idToken
        return session
      },
      async signIn({ user, account, profile }) {
        if (account.provider === 'google') {
            return true
          }

          return false; // Do different verification for other providers that don't have `email_verified`
      },
    }
}

export default NextAuth(authOptions)
