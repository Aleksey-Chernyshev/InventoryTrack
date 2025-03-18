import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';

const AuthURL = {
  IS_VERIFY_URL: "http://localhost:5000/api/auth/is-verify",
  DASHBOARD_URL: "http://localhost:5000/api/dashboard"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  const setAuth = (boolean: boolean, userRole: string | null = null, userName: string | null = null) => {
    console.log("setAuth called:", { boolean, userRole, userName });
    setIsAuthenticated(boolean);
    setRole(userRole);
    setUserName(userName);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    async function isAuth() {
      try {
        if (!token) {
          setAuth(false, null, null);

          return;
        }

        const response = await axios.get(AuthURL.IS_VERIFY_URL, {
          headers: { Authorization: `Bearer ${token}` }
        });

        console.log("Server response:", response.data);

        if (response.data) {
          // Обновляем данные с сервера
          setAuth(true, response.data.role, response.data.name);
          localStorage.setItem("role", response.data.role);
          localStorage.setItem("name", response.data.name);
        } else {
          setAuth(false, null, null);
          localStorage.removeItem("role");
          localStorage.removeItem("name");
        }
      } catch (err) {
        console.error("Ошибка при проверке аутентификации:", err);
        setAuth(false, null, null);
        localStorage.removeItem("role");
        localStorage.removeItem("name");
      } finally {
      }
    }

    isAuth();
  }, []); // Запускаем только один раз


  console.log("App state:", { isAuthenticated, role, userName });

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={!isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path='/register' element={!isAuthenticated ? <RegisterPage setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path='/dashboard/*' element={isAuthenticated ? <DashboardPage setAuth={setAuth} role={role} userName={userName} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
