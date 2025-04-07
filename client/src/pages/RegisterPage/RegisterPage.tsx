import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InputFormAuth from '../../shared/InputFormAuth/InputFormAuth';
import styles from '../LoginPage/LoginPage.module.css';
import { useRegister } from '../../hooks/AuthHooks/useRegister';
import logo from '../../assets/images/logo.png';

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void;
}

const RegisterPage: React.FC<Props> = ({ setAuth }) => {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    handleRegister: handleRegisterBase,
  } = useRegister(setAuth);

  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (!name.trim()) {
      setNameError("Имя не должно быть пустым");
      valid = false;
    } else {
      setNameError(null);
    }

    if (!validateEmail(email)) {
      setEmailError("Введите корректный email");
      valid = false;
    } else {
      setEmailError(null);
    }

    if (!valid) return;

    handleRegisterBase(e);
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

          <h2 className={styles.login_title}>Регистрация</h2>
          <form onSubmit={handleRegister} className={styles.login_form}>
            <InputFormAuth
              type="text"
              name="name"
              placeholder="Имя"
              value={name}
              onChange={e => {
                setName(e.target.value);
                if (nameError) setNameError(null);
              }}
            />
            {nameError && <p className={styles.error_text}>{nameError}</p>}

            <InputFormAuth
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={e => {
                setEmail(e.target.value);
                if (emailError) setEmailError(null);
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

            <button className={styles.btn_submit}>Зарегистрироваться</button>
          </form>

          <div className={styles.register_link}>
            <Link to="/login">Уже есть аккаунт? Войти</Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default RegisterPage;
