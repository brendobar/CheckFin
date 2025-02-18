import {PlusOutlined} from '@ant-design/icons'
import {Button, Divider, Form, Input, InputRef, message, Select, SelectProps, Space} from 'antd'
import {useRef, useState} from 'react'
import {useCreateCategoryMutation} from "@/entities/category/api/categorySlice"
import {useAppSelector} from "@/shared/redux/appStore";

type CategorySelectProps = {
    categoriesOptions: SelectProps['options'],
    onCategoryAdded: () => void
    label: string
    name: string
    placeholder?: string
}

const CategorySelect = ({
                            categoriesOptions,
                            onCategoryAdded,
                            label,
                            name,
                            placeholder
                        }: CategorySelectProps) => {
    const user = useAppSelector(state => state.user.user)

    const [items, setItems] = useState<SelectProps['options']>(categoriesOptions || []);
    const [categoryName, setCategoryName] = useState('');
    const inputRef = useRef<InputRef>(null);
    const [createCategory, {isLoading}] = useCreateCategoryMutation();

    const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCategoryName(event.target.value);
    };

    const addCategory = async (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault()
        if (!categoryName.trim()) return

        try {
            const newCategory = await createCategory({userId: user?.id, name: categoryName}).unwrap()
            // @ts-ignore
            setItems([...items, {
                    label: newCategory.name,
                    value: newCategory.id
                }]
            )
            setCategoryName('')
            onCategoryAdded()
        } catch (error) {
            message.error('Ошибка при создании категории')
            console.error("Ошибка при создании категории:", error)
        }

        setTimeout(() => {
            inputRef.current?.focus()
        }, 0)
    }

    return (

        <Form.Item label={label || ''} name={name}>
            <Select
                mode="tags"
                placeholder={placeholder}
                options={items}
                dropdownRender={(menu) => (
                    <>
                        {menu}
                        <Divider style={{margin: '8px 0'}}/>
                        <Space style={{padding: '0 8px 4px'}}>
                            <Input
                                placeholder="Введите категорию"
                                ref={inputRef}
                                value={categoryName}
                                onChange={onNameChange}
                                onKeyDown={(e) => e.stopPropagation()}
                            />
                            <Button type="text" icon={<PlusOutlined/>} onClick={addCategory} loading={isLoading}>
                                Добавить
                            </Button>
                        </Space>
                    </>
                )}
            />
        </Form.Item>
    )
}

export default CategorySelect