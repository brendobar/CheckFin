'use client';

import { Table, message } from 'antd';
import styles from './tables.module.css';
import {useGetTablesQuery} from "@/widgets/tables/api/tablesSlice";
import {useRouter} from "next/navigation";

interface TablesProps {
    userId: string;
}

interface TableRecord {
    id: string;
    name: string;
    balance: number;
}

const Tables = ({ userId }: TablesProps) => {
    const router = useRouter();

    const { data: tables, error, isLoading } = useGetTablesQuery(userId);
    if (error) {
        message.error('Ошибка при загрузке таблиц');
        console.error(error)
        return null;
    }

    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Баланс',
            dataIndex: 'balance',
            key: 'balance'
        },
    ];



    return (
        <Table<TableRecord>
            className={styles.tables}
            columns={columns}
            dataSource={tables}
            loading={isLoading}
            rowKey="id"
            onRow={(record) => ({
                onClick: () => {
                    router.push(`/tables/${record.name}`)
                },
            })}
        />
    );
};

export default Tables;
