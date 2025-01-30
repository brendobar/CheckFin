import { NextApiRequest, NextApiResponse } from 'next';
import {db} from "@/shared/prisma/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

    } else if (req.method === 'GET') {

    } else if (req.method === 'DELETE') {
        const { tableId } = req.query;

        if (!tableId || typeof tableId !== 'string') {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            await db.operationCategories.deleteMany({
                where: { operation: { tableId: tableId } },
            });

            const deleteTable = await db.table.delete({
                where: { id: tableId },
            });

            return res.status(200).json(deleteTable);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error });
        }

    } else if(req.method === ''){

    }else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}
