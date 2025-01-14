'use client'

import styles from './operationPopup.module.css'
import {Button, Form, Input, InputNumber, message, Modal} from "antd"
import {useEffect, useState} from "react"
import {useCreateOperationMutation, useUpdateOperationMutation} from "@/entities/operation/api/operationSlice"
import { DatePicker } from "antd"
import dayjs from "dayjs"
import {Operation} from "@/entities/operation"

type Props = {
    tableId: string
    visible: boolean
    onCancel: () => void
    initialValues?: Operation | null
}


type FormFields = {
    name: string
    value: number
    type: string
    categories: string
    comment?: string
    tableId: string
    date: Date
}

const OperationPopup = ({ tableId, visible, onCancel, initialValues }: Props) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [addOperationForm] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [addOperation] = useCreateOperationMutation()
    const [updateOperation] = useUpdateOperationMutation()


    const getFormInitialValues = () => {
        return initialValues
            ? {
                name: initialValues.name,
                value: initialValues.value,
                type: initialValues.type,
                categories: initialValues.categories,
                comment: initialValues.comment || '',
                date: dayjs(initialValues.date),
            }
            : {
                name: '',
                value: '',
                type: '',
                categories: '',
                comment: '',
                date: dayjs(),
            }
    }


    useEffect(() => {
        addOperationForm.setFieldsValue(getFormInitialValues())

        if (!visible) {
            addOperationForm.resetFields()
        }
    }, [visible, initialValues])


    const onSubmit = async (data: FormFields) => {
        setIsSubmitting(true)
        try {
            if (initialValues) {
                await updateOperation({
                    id: initialValues.id,
                    body: {
                        ...data,
                    }
                }).unwrap()
                messageApi.success("Операция обновлена")
            }else{
                await addOperation({
                    ...data,
                    value: Number(data.value),
                    date: dayjs(data.date).toISOString(),
                    tableId: tableId
                }).unwrap()
                messageApi.success("Операция внесена")
            }
            onCancel()
            addOperationForm.resetFields()
        } catch (e: any) {
            message.error(e?.data?.message || "Ошибка при внесении операции")
            console.error(e)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal
            open={visible}
            onCancel={onCancel}
            className={styles.popup}
            footer={null}
            modalRender={(modal) => <>{modal}</>}
        >
            <Form
                form={addOperationForm}
                onFinish={onSubmit}
                className={styles.form}
                layout="vertical"
                initialValues={getFormInitialValues()}
            >
                <h2 className={styles.title}>{initialValues ? 'Обновить операцию' : 'Добавить новую операцию'}</h2>
                <Form.Item
                    label="Название операции"
                    name="name"
                    rules={[{ required: true, message: "Пожалуйста, введите название операции" }]}
                >
                    <Input placeholder="Название операции" />
                </Form.Item>
                <Form.Item
                    label="Сумма"
                    name="value"
                    rules={[{ required: true, message: "Пожалуйста, введите сумму операции" }]}
                >
                    <InputNumber style={{ width: '100%' }} placeholder="Сумма" />
                </Form.Item>
                <Form.Item
                    label="Тип"
                    name="type"
                    rules={[{ required: true, message: "Пожалуйста, выберите тип операции" }]}
                >
                    <Input placeholder="Тип (например, доход/расход)" />
                </Form.Item>
                <Form.Item label="Категории" name="categories">
                    <Input placeholder="Категории (через запятую)" />
                </Form.Item>
                <Form.Item label="Комментарий" name="comment">
                    <Input.TextArea placeholder="Комментарий" />
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{ required: true, message: "Пожалуйста, выберите дату операции" }]}
                >
                    <DatePicker style={{ width: "100%" }} />
                </Form.Item>
                <Button htmlType="submit" className={styles.button} loading={isSubmitting}>
                    {initialValues ? 'Обновить' : 'Создать'}
                </Button>
            </Form>
            {contextHolder}
        </Modal>
    )
}


export default OperationPopup