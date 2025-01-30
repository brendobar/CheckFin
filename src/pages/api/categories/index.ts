import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '@/shared/prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { userId } = req.query;

        try {
            let whereCondition = {}

            if (userId) {
                if (userId === '') {
                    whereCondition = { userId: null };
                } else {
                    whereCondition = {
                        OR: [
                            { userId: String(userId) },  // Категории для конкретного пользователя
                            { userId: null },             // Дефолтные категории
                        ]
                    };
                }
            } else {
                whereCondition = { userId: null };
            }

            const categories = await db.category.findMany({
                where: whereCondition,
                include: { user: true }
            });

            return res.status(200).json(categories);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    } else if (req.method === 'POST') {
        const { userId, name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            const newCategory = await db.category.create({
                data: {
                    userId: userId || null,
                    name,
                },
            });

            return res.status(201).json(newCategory);
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error });
        }
    } else if (req.method === 'DELETE') {
        const { id } = req.query


        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        try {
            const deleteCategory = await db.category.delete({
                where: { id },
            })
            return res.status(200).json(deleteCategory)
        } catch (error) {
            return res.status(500).json({ message: 'Ошибка сервера', error: error })
        }

    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Метод ${req.method} не поддерживается`);
    }
}
