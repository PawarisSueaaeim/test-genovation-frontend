import axios from "axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const response = await axios.post(`${baseUrl}/login`, {
                        username: credentials?.username,
                        password: credentials?.password,
                    });
                    if (response.status === 200 && response.data) {
                        return {
                            id: response.data.username,
                            token: response.data.token,
                            user: {
                                username: response.data.username, 
                            },
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Login error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
                token.user = user.user;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = token.user;
            session.token = token.token;
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
    },
});

export { handler as GET, handler as POST };
