'use client'

import styles from "./Operations.module.css"
import { Operation } from "@/entities/operation"
import {Empty, message, Popconfirm, Popover, Spin} from "antd"
import {DeleteOutlined, EditOutlined, MoreOutlined} from "@ant-design/icons"
import {useDeleteOperationMutation, useGetOperationsQuery} from "@/entities/operation/api/operationSlice"

type OperationProps = {
    operations: any
    loading?: boolean
    setOpenPopup: (open: boolean) => void
    setSelectedOperation: (operation: Operation | null) => void
}

const groupOperationsByDate = (operations: Operation[]) => {
    const today = new Date()
    const yesterday = new Date()
    yesterday.setDate(today.getDate() - 1)

    const grouped: Record<string, Operation[]> = {}

    operations.forEach((operation) => {
        const operationDate = new Date(operation.date)
        let dateLabel

        if (operationDate.toDateString() === today.toDateString()) {
            dateLabel = "Сегодня"
        } else if (operationDate.toDateString() === yesterday.toDateString()) {
            dateLabel = "Вчера"
        } else {
            dateLabel = operationDate.toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
            })
        }

        if (!grouped[dateLabel]) {
            grouped[dateLabel] = []
        }
        grouped[dateLabel].push(operation)
    })

    return grouped
}



const Operations = ({ operations, loading, setOpenPopup, setSelectedOperation }:OperationProps) => {
    const [deleteOperation] = useDeleteOperationMutation()
    const [messageApi, contextHolder] = message.useMessage()
    const onDelete = async (id: number) => {
        try {
            await deleteOperation(id).unwrap()
            messageApi.success('Операция успешно удалена')
        } catch (e: any) {
            if (e?.status === 500) {
                console.error('Ошибка сервера:', e.data?.message)
            } else if (e?.status === 400) {
                console.error('Неверный запрос:', e.data?.message)
            }
            messageApi.error(e?.data?.message || 'Ошибка при удалении операции')
        }
    }

    const onEdit = (operation: Operation) => {
        setSelectedOperation(operation)
        setOpenPopup(true)
    }


    if(loading) return <Spin className={styles.loading}/>

    if(!operations || operations.length == 0) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description='Нет Данных' className={styles.empty}/>



    const groupedOperations = operations && !loading ? groupOperationsByDate(operations) : {}
    const sortedDates = Object.keys(groupedOperations).sort((a, b) => {
        if (a === "Сегодня") return -1
        if (b === "Сегодня") return 1
        if (a === "Вчера") return -1
        if (b === "Вчера") return 1

        const parseDate = (dateStr: string) => {
            const [day, month] = dateStr.split(' ')
            const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
            const monthIndex = monthNames.indexOf(month)

            return new Date(new Date().getFullYear(), monthIndex, parseInt(day))
        }

        const dateA = parseDate(a)
        const dateB = parseDate(b)

        return dateB.getTime() - dateA.getTime()
    })

    return (
        <div className={styles.operationsContainer}>
            {sortedDates.map((date) => (
                <div key={date} className={styles.operationGroup}>
                    <h2 className={styles.dateTitle}>{date}</h2>
                    <div className={styles.operations}>
                        {groupedOperations[date].map(operation => (
                            <div className={styles.operation} key={operation.id}>
                                <div className={styles.oLeft}>
                                    <p className={styles.oName}>{operation.name}</p>
                                    {operation.categories && (
                                        <ul className={styles.categories}>
                                            {operation.categories.map(cat => (
                                                <li className={styles.category}
                                                    key={cat.categoryId}>{cat.category.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className={styles.oRight}>
                                    <p className={styles.oValue}>
                                        {operation.type == 'расход' && '-'}{operation.value} ₽
                                    </p>

                                    <Popover content={
                                        <div className={styles.editPopover}>
                                            <button className={styles.editBTN} onClick={() => onEdit(operation)}>
                                                <EditOutlined/> Изменить
                                            </button>
                                            <Popconfirm
                                                title='Удалить операцию?'
                                                okText='Удалить'
                                                cancelText='Отменить'
                                                onConfirm={() => onDelete(operation.id)}>
                                                <span className={styles.deleteBTN}><DeleteOutlined/> Удалить</span>
                                            </Popconfirm>
                                        </div>
                                    } trigger="click">
                                        <MoreOutlined/>
                                    </Popover>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            {contextHolder}
        </div>
    )

}

export default Operations