import { useSession } from 'next-auth/react'
import {useGetUserByIdQuery} from "@/entities/user/api/userSlice"

export const useActiveUser = () => {
    const { data: session } = useSession()
    const { data: user, ...rest } = useGetUserByIdQuery(session?.user?.id || '', { skip: !session?.user?.id })

    return { user, ...rest }
};
