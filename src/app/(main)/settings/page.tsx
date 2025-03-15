'use client';

import {Settings} from "@/widgets/settings";
import {useActiveUser} from "@/shared/hooks/useActiveUser";
import styles from './page.module.css'

const Page = () => {
    const { user, isLoading } = useActiveUser()

    if (user) {
        return (
            <div className='py-96'>
                <div className='main-container'>
                    <h1 className={styles.title}>Настройки профиля</h1>
                    <h2 className={styles.name}>{user.name}</h2>
                    <h3 className={styles.balance}>Баланс: {user.balance}₽</h3>
                    <Settings userId={user.id}/>
                </div>
            </div>
        );
    }

    return null;
};

export default Page;
