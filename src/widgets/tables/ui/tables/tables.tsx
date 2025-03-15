'use client';

import {message, Popconfirm, Switch, Table} from 'antd';
import styles from './tables.module.css';
import {useDeleteTableMutation, useGetTablesQuery, useUpdateTableMutation} from '@/widgets/tables/api/tablesSlice';
import {DeleteOutlined} from '@ant-design/icons';
import Link from "next/link";

interface TablesProps {
    userId: string;
}

interface TableRecord {
    id: string
    name: string
    balance: number
    primary: boolean
}

const Tables = ({userId}: TablesProps) => {
    const {data: tables, error, isLoading} = useGetTablesQuery(userId);

    if (error) {
        message.error('Ошибка при загрузке таблиц');
        console.error(error)
        return null;
    }



    const [messageApi, contextHolder] = message.useMessage()



    const columns = [
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: TableRecord) =>
                <Link className={styles.link} href={`/tables/${record.id}`} key={record.id}>{text}</Link>
        },
        {
            title: 'Баланс',
            dataIndex: 'balance',
            key: 'balance'
        },
        {
            dataIndex: 'operation',
            key: 'delete',
            width: '48px',
            render: (text:string, record: TableRecord) =>
                <Popconfirm 
                    title='Удалить таблицу?'
                    okText='Удалить'
                    cancelText='Отменить'
                    onConfirm={() => onDelete(record.id)}>
                    <DeleteOutlined/>
                </Popconfirm>
        },
    ];


    const [deleteTable] = useDeleteTableMutation();

    const onDelete = async (id: string) => {
        try {
            await deleteTable(id).unwrap();
            messageApi.success('Таблица успешно удалена')
        } catch (e: any) {
            message.error(e?.data?.message || 'Ошибка при удалении таблицы');
            console.error(e)
        }
    }


    return (
        <>
            <Table<TableRecord>
                className={styles.tables}
                columns={columns}
                dataSource={tables}
                loading={isLoading}
                rowKey='id'
                pagination={
                    !isLoading && tables.length > 10 ?{
                    pageSize: 10,
                    position: ['bottomCenter']
                } : false}
            />
            {contextHolder}
        </>
    );
};

export default Tables;
