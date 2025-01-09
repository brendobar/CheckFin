import type { NextApiRequest, NextApiResponse } from 'next';
import * as bcrypt from 'bcryptjs';
import { db } from '@/shared/prisma/prisma';
import {getUserByEmail} from "@/entities/user/api/userApi";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, email, password } = req.body;

    try {
        const existingUser = await getUserByEmail(email)

        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await db.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });



        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
