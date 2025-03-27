import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import InputFormAuth from '../../shared/InputFormAuth/InputFormAuth';

import styles from './LoginPage.module.css'
import { useAuth } from '../../hooks/AuthHooks/useAuth';

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void;
}

const LoginPage: React.FC<Props> = ({ setAuth }) => {

  const {email, setEmail, password, setPassword, handleLogin} = useAuth(setAuth)

  return (
    <Fragment>
            <div className={styles.login_container}>
                <h1 className={styles.login_title}>Вход</h1>
                <form onSubmit={handleLogin} className={styles.login_form}>
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
                    <button className={styles.btn_submit}>Войти</button>
                </form>
                <div className={styles.register_link}>
                    <Link to="/register">Нет аккаунта? Зарегистрироваться ...</Link>
                </div>
                </div>
        </Fragment>
  );
};

export default LoginPage;
