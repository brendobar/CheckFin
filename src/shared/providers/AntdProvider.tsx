import {ConfigProvider} from "antd";


export default function AntdProvider({children,}: { children: React.ReactNode }) {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorText: 'var(--text)',
                    colorBgContainer: 'var(--bgBlock)',
                    colorBgElevated: 'var(--bgBlock)',
                    colorTextPlaceholder: 'var(--white50)',
                    boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08),0 3px 6px -4px rgba(0, 0, 0, 0.12),0 9px 28px 8px rgba(0, 0, 0, 0.05)',
                    boxShadowSecondary: '0 0 0 1px var(--border)',
                    boxShadowTertiary: '0 0 0 2px blue',
                    colorLink: 'var(--linkHover)',
                    colorLinkHover: 'var(--linkHover)',

                },
                components: {
                    Button: {
                        defaultColor: 'var(--text)',
                        defaultHoverColor: 'var(--text)',
                        defaultBg: 'var(--bgBlock)',
                        defaultHoverBg: 'var(--bgBlock)',
                        defaultBorderColor: 'var(--border)',
                        defaultHoverBorderColor: 'var(--text)',
                        defaultActiveBorderColor: 'var(--text)',
                        defaultActiveColor: 'var(--text)',


                        primaryColor: 'var(--black)',
                        primaryShadow: 'unset',
                        colorPrimary: 'var(--background)',
                        colorPrimaryActive: 'var(--bgBlock)',
                        colorPrimaryHover: 'var(--bgBlock)',


                    },
                    Input: {
                        hoverBorderColor: 'var(--borderHover)',
                        activeBorderColor: 'var(--borderHover)',
                        activeShadow: 'unset'
                    },
                    InputNumber: {
                        handleBorderColor: 'var(--borderHover)',
                        hoverBorderColor: 'var(--borderHover)',
                        activeBorderColor: 'var(--borderHover)',
                        handleHoverColor: 'var(--text)',
                        activeShadow: 'unset',
                        colorTextDescription: 'var(--text)'
                    },
                    Select: {
                        hoverBorderColor: 'var(--borderHover)',
                        activeBorderColor: 'var(--borderHover)',
                        optionSelectedColor: 'var(--text)',
                        optionSelectedBg: 'var(--background)',
                        optionActiveBg: 'var(--background)',
                        colorIcon: 'var(--text)',
                        colorTextQuaternary: 'var(--text)'
                    },
                    DatePicker: {
                        hoverBorderColor: 'var(--borderHover)',
                        activeBorderColor: 'var(--borderHover)',
                        cellHoverBg: 'var(--background)',
                        multipleItemColorDisabled: 'red',
                        colorTextDisabled: 'var(--white50)',
                        colorTextDescription: 'var(--black)',
                        colorPrimary: 'var(--accent)',
                        colorIcon: 'var(--text)',
                        colorIconHover: 'var(--black)',
                        activeShadow: 'unset'
                    },
                    Modal: {
                        contentBg: 'var(--bgBlock)',
                        colorIcon: 'var(--black)',
                    },
                    Dropdown: {},
                    Table: {
                        headerBg: 'var(--bgBlock)',
                        headerColor: 'var(--text)',
                        headerSortActiveBg: 'var(--border)',
                        headerSortHoverBg: 'var(--border)',
                        rowHoverBg: 'var(--border)',
                        borderColor: 'var(--border)',
                        headerBorderRadius: 16,
                        headerSplitColor: 'transparent',
                    },
                    Pagination: {
                        itemBg: 'var(--bgBlock)',
                        itemActiveBg: 'var(--bgBlock)',
                        colorTextDisabled: 'var(--white50)',
                        colorPrimary: 'var(--black)',
                        colorPrimaryHover: 'var(--black)',
                        colorBgTextHover: 'var(--bgBlock)',
                    },
                    Empty: {
                        colorTextDescription: 'var(--text)',
                    },
                    Spin: {
                        colorPrimary: 'var(--accent)',
                    }
                }
            }}
        >
            {children}
        </ConfigProvider>
    )
}
