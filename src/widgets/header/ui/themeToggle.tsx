import styles from './themeToggle.module.css'
import {useEffect, useState} from "react";
import classNames from "classnames";

const ThemeToggle = () => {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light'
        setTheme(savedTheme)
        document.documentElement.setAttribute('data-theme', savedTheme)
    }, [])

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme)
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('theme', newTheme)
    }

    return (
        <div
            className={classNames(styles.toggleSwitch)}
            onClick={() => {
                toggleTheme(theme === 'light' ? 'dark' : 'light')
            }}
            onKeyDown={() => {
                toggleTheme(theme === 'light' ? 'dark' : 'light')
            }}
        >
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className={styles.light}
            >
                <title>light</title>
                <path
                    d='M9.99951 13.9982C12.2087 13.9982 13.9995 12.2078 13.9995 9.99911C13.9995 7.79046 12.2087 6 9.99951 6C7.79037 6 5.99951 7.79046 5.99951 9.99911C5.99951 12.2078 7.79037 13.9982 9.99951 13.9982Z'
                    stroke='var(--text)'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M10 2V3.77738M10 16.2226V18M3.77778 9.99822H2M18 9.99822H16.2222'
                    stroke='var(--text)'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
                <path
                    d='M4.34313 4.34315L5.59993 5.59995M14.4 14.4001L15.6568 15.6569M5.59896 14.3985L4.34188 15.6556M15.6556 4.34189L14.3985 5.59897'
                    stroke='var(--text)'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>

            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='none'
                className={styles.dark}
            >
                <title>dark</title>
                <path
                    d='M17.5 10.5987C17.1296 14.5595 13.1674 17.3692 9.27261 16.5122C1.88746 14.8892 2.79634 4.00672 10.1756 3.33337C6.68077 7.99718 12.7726 14.0462 17.5 10.5987Z'
                    stroke='var(--text)'
                    strokeWidth='1.5'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                />
            </svg>

            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='20'
                height='20'
                viewBox='0 0 20 20'
                fill='white'
                stroke='none'
                radius={10}
                className={styles.circle}
            >
                <title>circle</title>
                <rect width='20' height='20' rx='10' fill='current' />
            </svg>
        </div>
    )
};

export default ThemeToggle;