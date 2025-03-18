import React, { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from '../../components/layout/sidebar/Sidebar';
import UsersPage from '../UsersPage/UsersPage';
import AdminPage from '../AdminPage/AdminPage';
import style from './Dashboard.module.css';

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void;
  role: string | null;
}

const DashboardPage: React.FC<Props> = ({ setAuth, role }) => {
  return (
    <Fragment>
      <div className={style.app_container}>
        <Sidebar setAuth={setAuth} role={role} />
        <div className={style.content}>
          <Routes>
            <Route path="/" element={<div>Добро пожаловать на главную панель!</div>} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/admin" element={role === "admin" ? <AdminPage /> : <div>Доступ запрещен</div>} />
          </Routes>
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardPage;
