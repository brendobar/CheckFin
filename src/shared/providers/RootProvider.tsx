import {AntdRegistry} from '@ant-design/nextjs-registry'
import StoreProvider from "@/shared/providers/StoreProvider";
import UserProvider from "@/shared/providers/UserProvider";
import {SessionProvider} from "next-auth/react";
import {ConfigProvider} from "antd";


export default function RootProvider({ children,}: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AntdRegistry>
                <SessionProvider>
                    <ConfigProvider
                        theme={{
                            token: {
                                colorPrimary: 'var(--text)',
                                colorText: 'var(--text)',
                                colorBgContainer: 'var(--bgBlock)',
                                colorBgElevated: 'var(--bgBlock)',
                            },
                            components: {
                                Button: {
                                    defaultColor: 'var(--text)',
                                    defaultHoverColor: 'var(--text)',
                                    defaultBg: 'var(--bgBlock)',
                                    defaultHoverBg: 'var(--bgBlock)',
                                    defaultBorderColor: 'var(--border)',
                                    defaultHoverBorderColor: 'var(--text)',
                                },
                                Form: {

                                },
                                Modal: {
                                    contentBg: 'var(--bgBlock)',
                                },
                                Dropdown: {

                                }
                            }
                        }}
                    >
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </ConfigProvider>
                </SessionProvider>
            </AntdRegistry>
        </StoreProvider>
    )
}
