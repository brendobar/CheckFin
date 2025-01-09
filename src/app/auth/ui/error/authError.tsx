'use client'

import styles from './authError.module.css'
import {Button} from "antd";
import {useRouter} from "next/navigation";

const AuthError = () => {
    const router = useRouter()
    return (
        <div>
            <h1>Oops. Something went wrong!</h1>
            <Button onClick={() => {router.push('/auth/login')}}>Back To Login</Button>
        </div>
    );
};

export default AuthError;