import NextAuth from "next-auth"
import authConfig from "@/shared/auth/auth.config"
import {NextResponse} from "next/server";
import {DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes} from "@/routes";


const { auth } = NextAuth(authConfig)

export default auth(async function middleware(request) {
    const { nextUrl } = request;

    const isLogginedIn = !!request.auth;

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
    const isAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        return undefined
    }

    if (isAuthRoute) {
        if (isLogginedIn){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined
    }

    if (!isLogginedIn && !isPublicRoute){
        return NextResponse.redirect(new URL("/auth/login", nextUrl));
    }

    return undefined
})




export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}