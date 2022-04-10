import styles from "../styles/login.module.css"
import { useState } from "react"
import { useDispatch } from "react-redux"
import {login} from '../store/actions/authActions'
import { useRouter } from "next/router"

export default function Login() {
    const [loginForm, setLoginForm] = useState({username: "", password: ""})
    const dispatch = useDispatch()
    const router = useRouter()

    const formHandler = (e) => {
        setLoginForm({...loginForm, [e.target.name]: e.target.value})
    }

    const loginHandler = async () => {
        const req  = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: loginForm.username, password: loginForm.password
            })
        }) 
        const res = await req.json()

        if (res.status) {
            dispatch(login({userId: res.user.id}))
            router.push("/", null, {replace: true})
        }

        console.log(res)
    }
    console.count("LOGIN RENDERED")
    return <main className={styles.page}>
        <h1 className={styles.heading}>Login</h1>
        <div className={styles.loginForm}>
            <input type="text" name="username" onChange={formHandler} value={loginForm.username} />
            <input type="text" name="password" onChange={formHandler} value={loginForm.password} />
            <button onClick={loginHandler}>Login</button>
        </div>
    </main>

}