import React, { Fragment, useState} from 'react'
import { Link} from 'react-router-dom'
import InputFormAuth from '../../shared/InputFormAuth/InputFormAuth'
import styles from './LoginPage.module.css'
import { useAuth } from '../../hooks/AuthHooks/useAuth'
import logo from '../../assets/images/logo.png'

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void;
}

const LoginPage: React.FC<Props> = ({ setAuth }) => {

  const {email, setEmail, password, setPassword, handleLogin} = useAuth(setAuth)
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/
    return emailRegex.test(email)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  
    if (!validateEmail(email)) {
      setEmailError("Введите корректный email")
      return
    }
  
    setEmailError(null)
    handleLogin(e)
  };
  
  
  return (
    <Fragment>
      <div className={styles.page_wrapper}>
        <div className={styles.auth_card}>
          <div className={styles.logo_section}>
            <img src={logo} alt="App Logo" />
            <h1 className={styles.app_name}>InventoryTrack</h1>
            <p className={styles.slogan}>Цифровой учет — легко и удобно</p>
          </div>

          <h2 className={styles.login_title}>Вход в систему</h2>
          <form onSubmit={handleSubmit} className={styles.login_form}>
            <InputFormAuth
              type="text" 
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value)
                if (emailError) setEmailError(null)
              }}
            />
            {emailError && <p className={styles.error_text}>{emailError}</p>}
            <InputFormAuth
              type="password"
              name="password"
              placeholder="Пароль"
              value={password}
              onChange={e => setPassword(e.target.value)} 
            />
            <button className={styles.btn_submit}>Войти</button>
          </form>

          <div className={styles.register_link}>
            <Link to="/register">Нет аккаунта? Зарегистрироваться</Link>
          </div>
        </div>
      </div>
    </Fragment>

  );
};

export default LoginPage;
