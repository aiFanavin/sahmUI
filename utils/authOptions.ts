import {AuthOptions, TokenSet} from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import {JWT} from "next-auth/jwt";

function requestRefreshOfAccessToken() {
    return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            "client_id": `${process.env.KEYCLOAK_CLIENT_ID}`,
            "client_secret": `${process.env.KEYCLOAK_CLIENT_SECRET}`,
            "grant_type": "refresh_token"
        }),
        method: "POST",
        cache: "no-store"
    });
}
export const authOptions: AuthOptions = {
    providers: [
        KeycloakProvider({
            clientId: process.env.KEYCLOAK_CLIENT_ID!,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
            issuer: process.env.KEYCLOAK_ISSUER
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.idToken = account.id_token
                token.accessToken = account.access_token
                token.refreshToken = account.refresh_token
                token.expiresAt = account.expires_at
                return token
            }
            // we take a buffer of one minute(60 * 1000 ms)


            if (Date.now() < ((token.expiresAt as number) * 1000 - 60 * 1000)) {
                return token
            } else {
                try {
                    const response = await requestRefreshOfAccessToken()

                    const tokens: TokenSet = await response.json()

                    if (!response.ok) throw tokens

                    const updatedToken: JWT = {
                        ...token, // Keep the previous token properties
                        idToken: tokens.id_token,
                        accessToken: tokens.access_token,
                        expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
                        refreshToken: tokens.refresh_token ?? token.refreshToken,
                    }
                    return updatedToken
                } catch (error) {
                    console.error("Error refreshing access token", error)
                    return { ...token, error: "RefreshAccessTokenError" }
                }
            }
        },
// ...
    }
}