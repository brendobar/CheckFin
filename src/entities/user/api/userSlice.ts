import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {User} from "@/entities/user";

export interface UserState {
    user: User | null | undefined
}

const initialState: UserState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setActiveUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload
        },
        reset: (state) => {
            state.user = null;
        },
    }
})

export const { setActiveUser, reset } = userSlice.actions

export default userSlice.reducer