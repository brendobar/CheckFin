import Google from "@auth/core/providers/google";
import Credentials from "next-auth/providers/credentials";
import type {NextAuthConfig} from "next-auth"
import * as bcrypt from 'bcryptjs';
import {getUserByEmail} from "@/entities/user/api/userApi";



export default {
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            async authorize(credentials) {
                const { email, password } = credentials as { email: string; password: string };

                const user = await getUserByEmail(email)
                if (!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(password, user.password);
                if (passwordMatch) {
                    return { id: user.id, email: user.email, name: user.name };
                }
                return null;
            },
        })
    ]
} satisfies NextAuthConfig