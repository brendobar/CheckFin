'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import { useAppSelector } from '@/shared/redux/appStore';
import Tables from '@/widgets/tables/ui/tables/tables';
import CreateTablePopup from '@/widgets/tables/ui/createTablePopup/createTablePopup';

const Page = () => {
    const user = useAppSelector((state) => state.user.user);
    const [openPopup, setOpenPopup] = useState(false);

    if (user) {
        return (
            <div>
                <Button onClick={() => setOpenPopup(true)}>Создать новую таблицу</Button>
                <Tables userId={user.id} />
                <CreateTablePopup
                    visible={openPopup}
                    onCancel={() => setOpenPopup(false)}
                />
            </div>
        );
    }

    return null;
};

export default Page;
