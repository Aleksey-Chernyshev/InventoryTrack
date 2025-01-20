import axios from "axios"
import React, { ChangeEvent, FormEvent, Fragment, useState} from "react"
import { AuthPageProps } from "./LoginPage.interface"
import { Link } from "react-router-dom"
import styles from './LoginPage.module.css'
//import AuthURL from "../../configs/auth_urls"
import { UserService } from "../../services/user.service"
import InputFormAuth from "../../shared/InputFormAuth/InputFormAuth"

// import { toast } from "react-toastify"

function LoginPage({setAuth}:AuthPageProps){

    const [inputs, setInputs] = useState({
        email:"",
        password:""
    })

    const {email,password} = inputs

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputs({...inputs, [e.target.name] : e.target.value})
    }

    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const body = {email, password}
            // const response = await axios.post(AuthURL.LOGIN_URL, body);
            const response = await UserService.LoginUser(body)
            if (response.data.token){
                localStorage.setItem("token", response.data.token)
                setAuth(true)
                //toast.success("login successfully!")
            } else {
                setAuth(false)
                //toast.error(response.data)
            }
            
        } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(err.message);
              //toast.error("An error occurred during login. Please try again.")
            } else {
              console.error('An unknown error occurred', err);
            }
          }
    }
    return(
        <Fragment>
            <div className={styles.login_container}>
                <h1 className={styles.login_title}>Вход</h1>
                <form onSubmit={onSubmitForm} className={styles.login_form}>
                    <InputFormAuth 
                        type ="email"
                        name="email"
                        placeholder="Email"
                        value= {email}
                        onChange={(e) => onChange(e)}
                    />
                    
                    <InputFormAuth
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => onChange(e)}
                    />
                    <button className={styles.btn_submit}>Войти</button>
                </form>
                <div className={styles.register_link}>
                    <Link to="/register">Нет аккаунта? Зарегистрироваться ...</Link>
                </div>
                </div>
        </Fragment>
    )
}
export default LoginPage