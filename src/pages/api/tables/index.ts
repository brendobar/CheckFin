import { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/shared/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { userId, tableName, primary } = req.body;
        if (!userId || !tableName) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            const newTable = await db.table.create({
                data: {
                    userId,
                    name: tableName,
                    primary: primary || false
                },
            });

            return res.status(201).json(newTable);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error });
        }
    } else if (req.method === 'GET') {
        const { userId, tableId } = req.query;

        if(tableId){
            if (!tableId || typeof tableId !== 'string') {
                return res.status(400).json({ message: 'Некорректные данные' });
            }
            try {
                const table = await db.table.findUnique({
                    where: { id: tableId },
                    include: {
                        user: true,
                        operations: true
                    }
                });

                return res.status(200).json(table);
            } catch (error) {
                return res.status(500).json({ message: 'Ошибка сервера', error: error });
            }

        }else if(userId){
            if (!userId || typeof userId !== 'string') {
                return res.status(400).json({ message: 'Некорректные данные' });
            }

            try {
                const tables = await db.table.findMany({
                    where: { userId },
                    orderBy: {
                        primary: 'desc'
                    }
                });

                return res.status(200).json(tables);
            } catch (error) {
                return res.status(500).json({ message: 'Ошибка сервера', error: error });
            }
        }

    }else if (req.method === 'PATCH') {
        const { tableId, name, primary, userId } = req.body

        if (!tableId) {
            return res.status(400).json({ message: 'tableId обязателен' });
        }

        try {
            let updateData: any = {}
            if (name) updateData.name = name;

            if (primary && userId) {
                await db.table.updateMany({
                    where: { userId: userId, primary: true },
                    data: { primary: false }
                })

                updateData.primary = true
            }

            const updatedTable = await db.table.update({
                where: { id: tableId },
                data: updateData
            })

            if (primary && userId) {
                await updateUserBalance(userId)
            }

            return res.status(200).json(updatedTable);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error });
        }

    }else {
        res.setHeader('Allow', ['POST', 'GET', 'PATCH']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}


async function updateUserBalance(userId: string) {
    const primaryTable = await db.table.findFirst({
        where: { userId, primary: true },
        select: { balance: true }
    });

    await db.user.update({
        where: { id: userId },
        data: { balance: primaryTable?.balance ?? 0 } // Если primary-таблицы нет, ставим 0
    });
}