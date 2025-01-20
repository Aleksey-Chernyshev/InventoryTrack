import React, { ChangeEvent, FormEvent, Fragment, useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import { AuthPageProps } from "../LoginPage/LoginPage.interface"
import styles from '../LoginPage/LoginPage.module.css'
import AuthURL from "../../configs/auth_urls"
import InputFormAuth from "../../shared/InputFormAuth/InputFormAuth"
import { UserService } from "../../services/user.service"

const RegisterPage = ({setAuth}: AuthPageProps) => {

    const [inputs, setInputs] = useState({
        email:"",
        password:"",
        name:""
    })

    const {email, password, name} = inputs

    const onChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setInputs({...inputs, [e.target.name] : e.target.value })
    }
 
    const onSubmitForm = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const body = {name, email, password}
            const response = await UserService.RegisterUser(body)
            console.log(response.data);

            localStorage.setItem('token', response.data.token)
            setAuth(true)
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
                <h1 className={styles.login_title}>Регистрация</h1>
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

                    <InputFormAuth 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        value={name}
                        onChange={e => onChange(e)}
                    />
                    
                    <button
                        className={styles.btn_submit}>Зарегистрироваться
                    </button>

                </form>
                <div className={styles.register_link}>
                    <Link to="/login">Войти в систему</Link>
                </div>
            </div>
        </Fragment>
    )
}
export default RegisterPage