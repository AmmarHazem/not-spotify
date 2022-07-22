import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyAPI.setAccessToken(token.accessToken);
    spotifyAPI.setRefreshToken(token.refreshAccessToken);
    const { body: refreshToken } = await spotifyAPI.refreshAccessToken();
    console.log("--- refreshToken ", refreshToken);
    return {
      ...token,
      accessToken: refreshToken.access_token,
      refreshToken: refreshToken.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + refreshToken.expires_in * 1000,
    };
  } catch (e) {
    console.log("--- refreshAccessToken error");
    console.log(e);
    return {
      ...token,
      error: "refreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        console.log("--- first sign in");
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }
      if (Date.now() < token.accessTokenExpires) {
        console.log("--- valid access token");
        return token;
      }
      // refresh expired accesst token
      console.log("--- refresh expired access token");
      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;
      return session;
    },
  },
});
