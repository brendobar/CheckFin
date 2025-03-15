'use client'

import React, {useEffect, useState} from 'react';
import {Button, message} from 'antd';
import styles from './tableOperations.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import {Operation} from "@/entities/operation";
import classNames from "classnames";
import {DeleteOutlined, EditOutlined, LeftOutlined, PlusOutlined} from "@ant-design/icons";
import OperationPopup from "@/widgets/tables/ui/addOperationPopup/operationPopup";
import {useRouter} from "next/navigation";
import {
    useGetOperationsByTypeQuery,
    useGetOperationsQuery
} from "@/entities/operation/api/operationSlice";
import {useGetTableQuery} from "@/widgets/tables/api/tablesSlice";
import {BalanceChart, CategoryChart, Operations} from "@/widgets/tables";
import {Swiper, SwiperSlide} from "swiper/react";
import {Pagination} from "swiper/modules";

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










    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1152);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);



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
                <BalanceChart
                    operations={operations}
                    loading={isOperationsLoading}
                />
            </div>

            <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                breakpoints={{
                    1152: {
                        slidesPerView: 2,
                    }
                }}
                className={styles.categoriesCharts}
            >
                <SwiperSlide>
                    <CategoryChart
                        data={incomeOperations}
                        title={'Категории по доходам'}
                        customClass={styles.incomeCategories}
                        loading={isIncomeOperationsLoading}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <CategoryChart
                        data={expenseOperations}
                        title={'Категории по расходам'}
                        customClass={styles.expenseOperations}
                        loading={isExpenseOperationsLoading}
                    />
                </SwiperSlide>
            </Swiper>


            <Operations
                operations={operations}
                loading={isOperationsLoading}
                setOpenPopup={setOpenPopup}
                setSelectedOperation={setSelectedOperation}
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
