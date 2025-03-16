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
                            id: response.data.id,
                            token: response.data.token,
                            user: {
                                id: response.data.id,
                                isAdmin: response.data.isAdmin,
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
    session: {
        strategy: "jwt",
        maxAge: 60 * 60, // 1 hour in seconds
    },
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.token = user.token;
                token.user = user.user;
            }
            // ตรวจสอบว่า token ใกล้หมดอายุหรือไม่
            const tokenExpirationTime = token.exp;
            const currentTime = Math.floor(Date.now() / 1000);
            
            // ถ้า token จะหมดอายุใน 5 นาที ให้ refresh
            if (tokenExpirationTime && (tokenExpirationTime - currentTime) < 300) {
                try {
                    // เรียก API เพื่อ refresh token
                    const response = await axios.post(`${baseUrl}/refresh-token`, {}, {
                        headers: {
                            Authorization: `Bearer ${token.token}`
                        }
                    });
                    
                    if (response.status === 200 && response.data) {
                        token.token = response.data.token;
                    }
                } catch (error) {
                    console.error("Error refreshing token:", error);
                    // ถ้า refresh ไม่สำเร็จ ให้ใช้ token เดิมต่อไป
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            session.id = token.id;
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
