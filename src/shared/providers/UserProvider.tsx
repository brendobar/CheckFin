'use client'

import React, {useEffect} from 'react';
import {useSession} from "next-auth/react";
import {useAppDispatch} from "@/shared/redux/appStore";
import {User} from "@/entities/user";

export default function UserProvider({ children,}: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const dispatch = useAppDispatch()



    // useEffect(() => {
    //     if (status === 'unauthenticated') {
    //         dispatch(setActiveUser(null))
    //     }
    //
    //     if (session?.user) {
    //         dispatch(setActiveUser(session.user as User));
    //     }
    // }, [session, dispatch])


    return children
};
