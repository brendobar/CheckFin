'use client'

import React, {useEffect, useState} from 'react';
import {Button, Empty, message, Popconfirm, Table} from 'antd';
import type {ColumnsType} from 'antd/es/table';
import styles from './tableOperations.module.css';
import {Operation} from "@/entities/operation";
import classNames from "classnames";
import {DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined} from "@ant-design/icons";
import OperationPopup from "@/widgets/tables/ui/addOperationPopup/operationPopup";
import {useRouter} from "next/navigation";
import {
    useDeleteOperationMutation,
    useGetOperationsByTypeQuery,
    useGetOperationsQuery
} from "@/entities/operation/api/operationSlice";
import {useGetTableQuery} from "@/widgets/tables/api/tablesSlice";
import {BalanceChart, CategoryChart} from "@/widgets/tables";

type TableProps = {
    tableId: string
};

const TableOperations = ({tableId}: TableProps) => {
    const {data: table, error: tableError, isLoading: isTableLoading } = useGetTableQuery(tableId)
    const {data: operations, error, isLoading: isOperationsLoading} = useGetOperationsQuery(tableId)

    const {data: incomeOperations, error: incomeOperationsError, isLoading: isIncomeOperationsLoading} = useGetOperationsByTypeQuery({
        tableId,
        type: 'доход',
    })
    const {data: expenseOperations, error: expenseOperationsError, isLoading: isExpenseOperationsLoading} = useGetOperationsByTypeQuery({
        tableId,
        type: 'расход',
    })

    const router = useRouter()
    const [messageApi, contextHolder] = message.useMessage()


    const [openPopup, setOpenPopup] = useState(false)
    const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null)


    useEffect(() => {
        if (error) {
            messageApi.error('Ошибка при загрузке таблиц');
            console.error(error);
        }
    }, [error, messageApi]);


    const columns: ColumnsType<Operation> = [
        {
            title: 'Дата',
            dataIndex: 'date',
            key: 'date',
            width: '100px',
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Название',
            dataIndex: 'name',
            key: 'name',
            width: '200px',
        },
        {
            title: 'Тип',
            dataIndex: 'type',
            key: 'type',
            width: '80px',
        },
        {
            title: 'Значение',
            dataIndex: 'value',
            key: 'value',
            width: '100px',
        },
        {
            title: 'Категории',
            dataIndex: 'categories',
            key: 'categories',
            width: '200px',
            render: (categories: { category: { id: string; name: string } }[], record: Operation) => (
                <ul className={styles.categories}>
                    {categories.map(cat => (
                        <li key={cat.category.id}>
                            {cat.category.name}
                        </li>
                    ))
                    }

                </ul>
            ),
        },
        {
            title: 'Комментарий',
            dataIndex: 'comment',
            key: 'comment',
            width: '250px',
        },
        {
            dataIndex: 'Действия',
            key: 'delete',
            width: '100px',
            render: (text: string, record: Operation) =>
                <>
                    <Popconfirm
                        title='Удалить таблицу?'
                        okText='Удалить'
                        cancelText='Отменить'
                        onConfirm={() => onDelete(record.id)}>
                        <DeleteOutlined/>
                    </Popconfirm>
                    <button className={styles.editBTN} onClick={() => {
                        onEdit(record)
                    }}><EditOutlined/></button>
                </>
        },
    ];


    const [deleteOperation] = useDeleteOperationMutation();


    const onDelete = async (id: number) => {
        try {
            await deleteOperation(id).unwrap()
            messageApi.success('Операция успешно удалена')
        } catch (e: any) {
            if (e?.status === 500) {
                console.error('Ошибка сервера:', e.data?.message);
            } else if (e?.status === 400) {
                console.error('Неверный запрос:', e.data?.message);
            }
            messageApi.error(e?.data?.message || 'Ошибка при удалении операции');
        }
    }

    const onEdit = (operation: Operation) => {
        setSelectedOperation(operation)
        setOpenPopup(true)
    };


    return (
        <div className={classNames(styles.table, 'py-96 main-container')}>
            {table && !isTableLoading && !tableError && <h1 className={styles.title}>{table.name}</h1>}

            <div className={styles.head}>
                <Button onClick={() => router.push('/tables')}><LeftOutlined/>Назад</Button>


                <Button onClick={() => {
                    setSelectedOperation(null)
                    setOpenPopup(true)
                }}><PlusOutlined/>Добавить операцию</Button>
            </div>


            <div className={styles.balanceChart}>
                <BalanceChart operations={operations} loading={isOperationsLoading}/>
            </div>

            <div className={styles.categories}>
                <CategoryChart
                    data={incomeOperations}
                    title={'Категории по доходам'}
                    customClass={styles.incomeCategories}
                    loading={isIncomeOperationsLoading}
                />
                <CategoryChart
                    data={expenseOperations}
                    title={'Категории по расходам'}
                    customClass={styles.expenseOperations}
                    loading={isExpenseOperationsLoading}
                />
            </div>


            <Table
                rowKey="id"
                loading={isOperationsLoading}
                columns={columns}
                dataSource={operations}
                className={styles.tableWrapper}
                tableLayout="fixed"
                pagination={
                    !isOperationsLoading && !error && operations.length > 1 ? {
                        pageSize: 30,
                        position: ['bottomRight'],
                        showSizeChanger: true,
                    } : false}
                locale={{emptyText: <Empty description="Нет операций" image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty>}}
            />


            <OperationPopup
                tableId={tableId}
                visible={openPopup}
                onCancel={() => {
                    setOpenPopup(false)
                    setSelectedOperation(null)
                }}
                initialValues={selectedOperation}
            />
            {contextHolder}
        </div>
    );
};

export default TableOperations;
