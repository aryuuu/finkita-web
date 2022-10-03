import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, JWT_SECRET } from "../../../configs"

const GOOGLE_AUTHORIZATION_URL =
  "https://accounts.google.com/o/oauth2/v2/auth?" +
  new URLSearchParams({
    prompt: "consent",
    access_type: "offline",
    response_type: "code",
  })

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      idToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

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
      async jwt({ token, account, user }) {
        // Persist the OAuth access_token to the token right after signin
        if (account && user) {
          token.accessToken = account.access_token
          token.idToken = account.id_token

            return {
                accessToken: account.access_token,
                accessTokenExpires: Date.now() + account.expires_at * 1000,
                idToken: account.id_token,
                refreshToken: account.refresh_token,
                user,
            }
        }

        // Return previous token if the access token has not expired yet
        if (Date.now() < token.accessTokenExpires) {
            return token
        }

        // Access token has expired, try to update it
        return refreshAccessToken(token)
      },
      async session({ session, token, user }) {
        session.accessToken = token.accessToken
        session.idToken = token.idToken
        session.error = token.error

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
