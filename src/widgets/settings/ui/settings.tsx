import styles from './settings.module.css'
import {message, Popover, Select} from "antd"
import React, {useEffect, useState} from "react"
import {useGetTablesQuery, useUpdateTableMutation} from "@/widgets/tables/api/tablesSlice"
import {Table} from "@/widgets/tables"
import {getSession} from "next-auth/react";
// import {setActiveUser} from "@/entities/user/api/userSlice";
import {useAppDispatch} from "@/shared/redux/appStore";

type SettingsProps = {
    userId: string
}

const Settings = ({userId}: SettingsProps) => {
    const {data: tables, error, isLoading} = useGetTablesQuery(userId)

    const [messageApi, contextHolder] = message.useMessage()



    const dispatch = useAppDispatch()
    const [updateTable] = useUpdateTableMutation()

    const [primaryUpdate, setPrimaryUpdate] = useState<boolean>(false)
    const [primaryTable, setPrimaryTable] = useState<string>('')

    const selectTableOptions: { value: string, label: string, primary: boolean }[] = []

    if (!isLoading && !error && tables) {
        tables.map((table: Table) => {
            selectTableOptions.push({value: table.id, label: table.name, primary: table.primary})
        })
    }

    useEffect(() => {
        if (tables) {
            const primary = tables.find((table: Table) => table.primary)
            if (primary) setPrimaryTable(primary.id)
        }
    }, [tables, primaryTable])

    const selectTable = async (tableId: string) => {
        setPrimaryUpdate(true)
        try {
            await updateTable({tableId, primary: true, userId}).unwrap()
            setPrimaryTable(tableId)

            messageApi.success('Приоритетная таблица обновлена')
        } catch (error: any) {
            messageApi.error(error?.data?.message || 'Ошибка при обновлении таблицы')
            console.error(error)
        }
        setPrimaryUpdate(false)
    }



    return (
        <div>
            {selectTableOptions &&
                <div className={styles.selectTable}>
                    <Popover
                        content={'На основе выбранной таблицы будет отображаться актуальный баланс'}
                        trigger="hover">
                        <span>Выберите основную таблицу</span>
                    </Popover>
                    <Select
                        value={primaryTable}
                        style={{width: 120}}
                        onChange={selectTable}
                        options={selectTableOptions}
                        loading={primaryUpdate}
                    />
                </div>
            }
            {contextHolder}
        </div>
    )
}

export default Settings