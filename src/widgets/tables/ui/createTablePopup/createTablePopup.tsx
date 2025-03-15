'use client'

import styles from './createTablePopup.module.css'
import {Button, Form, Input, message, Modal} from "antd";
import {useState} from "react";
import {useCreateTableMutation} from "@/widgets/tables/api/tablesSlice";
import {useActiveUser} from "@/shared/hooks/useActiveUser";

type Props = {
    visible: boolean
    onCancel: () => void
}


type FormFields = {
    tableName: string
}

const CreateTablePopup = ({ visible, onCancel }: Props) => {
    const { user, isLoading } = useActiveUser()
    const [messageApi, contextHolder] = message.useMessage()

    const [createTableForm] = Form.useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [createTable] = useCreateTableMutation();


    const onSubmit = async (data: FormFields) => {
        setIsSubmitting(true)
        console.log(user!.tables.length <= 0)
        try {
            await createTable({
                userId: user!.id,
                tableName: data.tableName,
                primary: user!.tables.length <= 0
            }).unwrap();
            onCancel()
            messageApi.success('Таблица успешно создана')
            createTableForm.resetFields()
        } catch (e: any) {
            message.error(e?.data?.message || 'Ошибка при создании таблицы');
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
                form={createTableForm}
                onFinish={onSubmit}
                className={styles.email}
                layout='vertical'
            >
                <h2 className={styles.title}>Создать новую таблицу</h2>
                <Form.Item
                    label='Название'
                    name='tableName'
                    rules={[
                        {required: true, message: 'Пожалуйста введите название таблицы'},
                        {min: 2, message: 'Название таблицы должно состоять минимум из 2 символов'}
                    ]}
                >
                    <Input
                        placeholder='Название таблицы'
                    />
                </Form.Item>
                <Button
                    htmlType={'submit'}
                    className={styles.button}
                    loading={isSubmitting}
                >
                    Создать
                </Button>
            </Form>
            {contextHolder}
        </Modal>
    );
};

export default CreateTablePopup;