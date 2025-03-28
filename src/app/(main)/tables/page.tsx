'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import Tables from '@/widgets/tables/ui/tables/tables';
import CreateTablePopup from '@/widgets/tables/ui/createTablePopup/createTablePopup';
import {PlusOutlined} from "@ant-design/icons";
import {useActiveUser} from "@/shared/hooks/useActiveUser";

const Page = () => {
    const { user, isLoading } = useActiveUser()
    const [openPopup, setOpenPopup] = useState(false);

    if (user) {
        return (
            <div className='py-96'>
                <div className='main-container'>
                    <h1 style={{marginBottom: '32px'}}>Ваши Таблицы</h1>
                    <Button onClick={() => setOpenPopup(true)} style={{margin: '0 0 32px auto'}}><PlusOutlined />Создать новую таблицу</Button>
                    <Tables userId={user.id}/>
                    <CreateTablePopup
                        visible={openPopup}
                        onCancel={() => setOpenPopup(false)}
                    />

                </div>
            </div>
        );
    }

    return null;
};

export default Page;
