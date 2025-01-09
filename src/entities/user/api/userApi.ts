import {db} from "@/shared/prisma/prisma";

export const getUserByEmail = async (email: string) => {
    try{
        return await db.user.findUnique({where: {email}});
    }catch(err){
        console.error('Error while getting user by Id: ', err);
        return null
    }
}

export const getUserById = async (id: string) => {
    try{
        const user = await db.user.findUnique({ where: { id } });
        return user ? user : undefined;
    }catch(err){
        console.error('Error while getting user by Id: ', err);
        return null
    }
}