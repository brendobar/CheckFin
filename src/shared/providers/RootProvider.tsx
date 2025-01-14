import {AntdRegistry} from '@ant-design/nextjs-registry'
import StoreProvider from "@/shared/providers/StoreProvider";
import UserProvider from "@/shared/providers/UserProvider";
import {SessionProvider} from "next-auth/react";
import AntdProvider from "@/shared/providers/AntdProvider";


export default function RootProvider({ children,}: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <AntdRegistry>
                <SessionProvider>
                    <AntdProvider>
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </AntdProvider>
                </SessionProvider>
            </AntdRegistry>
        </StoreProvider>
    )
}
