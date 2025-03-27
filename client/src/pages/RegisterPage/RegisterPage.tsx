import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputFormAuth from '../../shared/InputFormAuth/InputFormAuth';

import styles from '../LoginPage/LoginPage.module.css'
import { useRegister } from '../../hooks/AuthHooks/useRegister';

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void;
}

const RegisterPage: React.FC<Props> = ({ setAuth }) => {

const {name, setName, email, setEmail, password, setPassword, handleRegister} = useRegister(setAuth)

  return (

    <Fragment>
            <div className={styles.login_container}>
                <h1 className={styles.login_title}>Регистрация</h1>
                <form onSubmit={handleRegister} className={styles.login_form}>
                    <InputFormAuth 
                        type ="email"
                        name="email"
                        placeholder="Email"
                        value= {email}
                        onChange={e => setEmail(e.target.value)}
                    />
                        
                    <InputFormAuth
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <InputFormAuth 
                        type="text" 
                        name="name" 
                        placeholder="Name"
                        value={name}
                        onChange={e => setName(e.target.value)}
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
  );
};

export default RegisterPage;
