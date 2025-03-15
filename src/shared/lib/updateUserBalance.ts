import { db } from "@/shared/prisma/prisma";

export const updateUserBalance = async (userId: string) => {
    try {
        const primaryTable = await db.table.findFirst({
            where: { userId, primary: true },
        });

        if (!primaryTable) return;

        console.log('primaryTable.balance' + primaryTable.balance)
        await db.user.update({
            where: { id: userId },
            data: {
                balance: primaryTable.balance
            }
        });
    } catch (e) {
        console.error("Ошибка при обновлении баланса пользователя:", e);
    }
};
