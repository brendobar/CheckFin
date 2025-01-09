import { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/shared/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, tableName } = req.body;
        if (!userId || !tableName) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            const newTable = await db.table.create({
                data: {
                    userId,
                    name: tableName,
                },
            });

            return res.status(201).json(newTable);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error });
        }
    } else if (req.method === 'GET') {
        const { userId } = req.query;

        if (!userId || typeof userId !== 'string') {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            const tables = await db.table.findMany({
                where: { userId },
            });

            return res.status(200).json(tables);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error });
        }
    } else if(req.method === ''){}else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}
