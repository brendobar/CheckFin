'use client'

import styles from './operationPopup.module.css'
import {Button, DatePicker, Form, Input, InputNumber, message, Modal, SelectProps} from "antd"
import {useEffect, useState} from "react"
import {useCreateOperationMutation, useUpdateOperationMutation} from "@/entities/operation/api/operationSlice"
import dayjs from "dayjs"
import {Operation} from "@/entities/operation"
import {useGetCategorysQuery} from "@/entities/сategory/api/categorySlice";
import CategorySelect from "@/widgets/tables/ui/addOperationPopup/CategorySelect";
import {Category} from "@/entities/сategory";
import {OperationCreateRequest} from "@/entities/operation/model/types";

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
    categories: string[]
    comment?: string
    tableId: string
    date: Date
}

const OperationPopup = ({tableId, visible, onCancel, initialValues}: Props) => {
    const [messageApi, contextHolder] = message.useMessage()
    const [addOperationForm] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [addOperation] = useCreateOperationMutation()
    const [updateOperation] = useUpdateOperationMutation()

    const {data: categories, error, isLoading, refetch} = useGetCategorysQuery(undefined)

    const categoriesOptions: SelectProps['options'] = [];
    if (categories && !isLoading && !error) {
        categories.forEach((category: Category) => {
            categoriesOptions.push({
                label: category.name,
                value: category.id
            })
        })
    }


    const getFormInitialValues = () => ({
        name: initialValues?.name || '',
        value: initialValues?.value || '',
        type: initialValues?.type || '',
        categories: initialValues?.categories?.map(cat => cat.category.id) || [],
        comment: initialValues?.comment || '',
        date: initialValues ? dayjs(initialValues.date) : dayjs(),
    })

    useEffect(() => {
        if (visible) {
            if (!initialValues) {
                addOperationForm.resetFields()
            }
            addOperationForm.setFieldsValue(getFormInitialValues())
        }
    }, [visible, initialValues])


    const onSubmit = async (data: FormFields) => {
        setIsSubmitting(true)
        try {
            const formattedData: OperationCreateRequest = {
                ...data,
                value: Number(data.value),
                date: dayjs(data.date).toISOString(),
                tableId,
                categories: data.categories?.map((cat) => cat) || [],
            };

            if (initialValues) {
                await updateOperation({
                    id: initialValues.id,
                    ...formattedData,
                }).unwrap();
                messageApi.success("Операция обновлена");
            } else {
                await addOperation(formattedData).unwrap();
                messageApi.success("Операция внесена");
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
                    rules={[{required: true, message: "Пожалуйста, введите название операции"}]}
                >
                    <Input placeholder="Название операции"/>
                </Form.Item>
                <Form.Item
                    label="Сумма"
                    name="value"
                    rules={[{required: true, message: "Пожалуйста, введите сумму операции"}]}
                >
                    <InputNumber style={{width: '100%'}} placeholder="Сумма"/>
                </Form.Item>
                <Form.Item
                    label="Тип"
                    name="type"
                    rules={[{required: true, message: "Пожалуйста, выберите тип операции"}]}
                >
                    <Input placeholder="Тип (например, доход/расход)"/>
                </Form.Item>
                <CategorySelect
                    label='Категории'
                    name='categories'
                    placeholder=''

                    categoriesOptions={categoriesOptions}
                    onCategoryAdded={() => refetch()}
                />
                <Form.Item label="Комментарий" name="comment">
                    <Input.TextArea placeholder="Комментарий"/>
                </Form.Item>
                <Form.Item
                    label="Дата"
                    name="date"
                    rules={[{required: true, message: "Пожалуйста, выберите дату операции"}]}
                >
                    <DatePicker style={{width: "100%"}}/>
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