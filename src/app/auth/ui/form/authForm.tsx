'use client'

import styles from './authForm.module.css'
import {Button, Form, Input, message} from 'antd';
import {useRouter, useSearchParams} from 'next/navigation'
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import { signIn } from 'next-auth/react';
import {useState} from "react";


type AuthFormProps = {
    type: 'login' | 'register'
}

type LoginFormFields = {
    email: string
    password: string
}
type RegisterFormFields = {
    name: string
    email: string
    password: string
}


const AuthForm = ({type}: AuthFormProps) => {
    const [userInfoForm] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage()

    const isRegister = type === 'register'

    const router = useRouter()

    const [isAction, setIsAction] = useState(false)

    const searchParams = useSearchParams()
    const urlError = searchParams?.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use' : ''



    const login = async (data: LoginFormFields) => {
        setIsAction(true)
        const {email, password} = data

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                switch (result.error) {
                    case "CredentialsSignin":
                        messageApi.error('Invalid Credentials');
                        break;
                    default:
                        messageApi.error('Login failed');
                        break;
                }
                console.error(result.error)
                setIsAction(false)
            } else {
                router.push(DEFAULT_LOGIN_REDIRECT);
            }
        } catch (err) {
            messageApi.error('Something went wrong');
            console.error(err)
        }
        setIsAction(false)
    }
    const register = async (data: RegisterFormFields) => {
        setIsAction(true)
        const { name, email, password } = data;

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            if (response.ok) {
                messageApi.success('Registration successful!');
                router.push('/');
            } else {
                const errorData = await response.json();
                messageApi.error(errorData.message || 'Registration failed');
            }
        } catch (err) {
            messageApi.error('Registration failed');
            console.error(err);
        }
        setIsAction(false)
    };



    const signInWithSocial = (provider: 'google') => {
        signIn(provider, {
            redirectTo: DEFAULT_LOGIN_REDIRECT
        }).catch((err) => {
            console.error(err)
        })
    }

    return (
        <div className={styles.authForm}>
            <h1>{isRegister ? 'Register' : 'Login'}</h1>

            <Form
                form={userInfoForm}
                onFinish={isRegister ? register : login}
                layout='vertical'
                className={styles.form}
            >
                {isRegister &&
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                            {required: true, message: 'Please input your name!'},
                            {min: 3, message: 'Name must be at least 3 characters.'},
                            {max: 50, message: 'Name cannot exceed 50 characters.'},
                        ]}
                    >
                        <Input
                            placeholder='Your Name'
                        />
                    </Form.Item>
                }
                <Form.Item
                    label='Email'
                    name='email'
                    rules={[
                        {required: true, message: 'Please input your email!'},
                        {
                            type: 'email',
                            message: 'The input is not a valid email!',
                        },
                    ]}
                >
                    <Input
                        placeholder='Your Email'
                        required/>
                </Form.Item>
                <Form.Item
                    label='Password'
                    name='password'
                    rules={[
                        {required: true, message: 'Please input your password!'},
                        {min: 6, message: 'Password must be at least 6 characters.'},
                        {
                            pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                            message:
                                'Password must contain at least one uppercase letter and one number.',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder='Your Password'
                    />
                </Form.Item>
                {urlError && (
                    <p style={{color: 'red'}}>{urlError}</p>
                )}
                <Button onClick={() => {signInWithSocial('google')}}>
                    Sign in with Google
                </Button>
                <Button type="primary" htmlType="submit" loading={isAction}>
                    {isRegister ? 'Register' : 'Login'}
                </Button>
            </Form>
            <button onClick={() => router.push(isRegister ? '/auth/login' : '/auth/register')}>
                {isRegister ? 'Already have an account?' : 'Create an account'}
            </button>
            {contextHolder}
        </div>
    );
};

export default AuthForm;