import NextAuth, {type DefaultSession} from "next-auth"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/shared/prisma/prisma"
import authConfig from "./auth.config"
import {getUserById} from "@/entities/user/api/userApi";
import {User} from "@/entities/user";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface Session {

        user: User & DefaultSession['user'];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        balance: number
    }
}


export const {handlers, auth, signIn, signOut} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        // async signIn({ user }){
        //     const existingUser = await getUserById(user.id)
        //     if (!existingUser || !existingUser.emailVerified) return false
        //     return true
        // },
        async jwt({token}) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (existingUser) {
                token.balance = existingUser.balance
            }
            return token
        },
        async session({token, session}) {
            if (session.user) {
                if (token.sub) session.user.id = token.sub
                if (token.balance != null || token.balance != undefined) session.user.balance = token.balance
            }
            return session
        },
    },
    events: {
        async linkAccount({user}) {
            await db.user.update({where: {id: user.id}, data: {emailVerified: new Date()}})
        }
    },
    pages: {
        signIn: '/auth/login',
        error: 'auth/error',
    },
    ...authConfig
})