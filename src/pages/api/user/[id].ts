import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/shared/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (typeof id !== 'string') return res.status(400).json({ message: 'Некорректные данные' });

    if (req.method === 'GET') {
        try {
            const user = await db.user.findUnique({
                where: { id },
                include: { accounts: true, categories: true, tables: true },
            });

            if (!user) return res.status(404).json({ message: 'Пользователь не найден' });

            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    }

    if (req.method === 'PUT') {
        const data = req.body;
        try {
            const updated = await db.user.update({
                where: { id },
                data,
            });

            return res.status(200).json(updated);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    }

    return res.status(405).json({ message: `Метод ${req.method} не поддерживается` });
}
