'use client'
import styles from "./header.module.css"
import {Button, Dropdown, MenuProps, Space} from "antd";
import {CaretDownOutlined, LogoutOutlined, SettingOutlined, TableOutlined} from '@ant-design/icons';
import {useRouter} from "next/navigation";
import {signOut} from "next-auth/react";
import Link from "next/link";
import ThemeToggle from "@/widgets/header/ui/themeToggle";
import {useActiveUser} from "@/shared/hooks/useActiveUser";



const Header = () => {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut();
    };

    const { user, isLoading } = useActiveUser()






    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <p className={styles.balance}>{user?.balance}₽</p>
            ),
            className: styles.balance
        },
        {
            key: '2',
            label: (
                <Link href="/tables">Таблицы</Link>
            ),
            icon: <TableOutlined />,
        },
        {
            key: '3',
            label: (
                <Link href="/settings">Настройки</Link>
            ),
            icon: <SettingOutlined />,
        },
        {
            key: '4',
            label: (
                <Button className={styles.logout} onClick={handleLogout}><LogoutOutlined />Выйти</Button>
            ),
            className: styles.logoutWrapper
        },
    ];


    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>CheckFin</Link>
                {!user &&
                    <Button onClick={() => {
                        router.push('/auth/login')
                    }}>Login</Button>
                }

                {user &&
                    <>
                        <Dropdown menu={{ items }} trigger={['click']} className={styles.userContainer} rootClassName={styles.userDropdown}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space className={styles.username}>
                                    {user.name}
                                    <CaretDownOutlined />
                                </Space>
                            </a>
                        </Dropdown>
                        <ThemeToggle/>
                    </>
                }


            </div>
        </header>
    );
};

export default Header;