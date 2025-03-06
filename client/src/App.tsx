import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AdminPage from './pages/AdminPage/AdminPage';
import Sidebar from './components/layout/sidebar/Sidebar';



const AuthURL = {
  IS_VERIFY_URL: "http://localhost:5000/api/auth/is-verify",
  DASHBOARD_URL: "http://localhost:5000/api/dashboard"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const setAuth = (boolean: boolean, userRole: string | null = null) => {
    setIsAuthenticated(boolean);
    setRole(userRole);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    async function isAuth() {
      
        try {
            
            if (!token) {
                setAuth(false, null);
                return;
            }

            const response = await axios.get(AuthURL.IS_VERIFY_URL, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data) {
                setAuth(true, response.data.role);
                localStorage.setItem("role", response.data.role);
            } else {
                setAuth(false, null);
                localStorage.removeItem("role");
            }
        } catch (err) {
            console.error("Ошибка при проверке аутентификации:", err);
            setAuth(false, null);
            localStorage.removeItem("role");
        }
    }

    const savedRole = localStorage.getItem("role");
    if (savedRole && token) {
        setAuth(true, savedRole); // 💾 Берем роль из localStorage сразу
    } else {
        isAuth();
    }
}, []);


  // Пустой массив зависимостей для первого рендера
  
  return (
    <Router>
      <div className="container">
        {/* {isAuthenticated && (
          <nav>
            <Link to="/dashboard">Dashboard</Link>
            {role === "admin" && <Link to="/admin">Admin Panel</Link>}
          </nav>
        )} */}
        
        <Routes>
          
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path='/login' element={!isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path='/register' element={!isAuthenticated ? <RegisterPage setAuth={setAuth} /> : <Navigate to="/dashboard" />} />
          <Route path='/dashboard' element={isAuthenticated ? <DashboardPage setAuth={setAuth} /> : <Navigate to="/login" />} />
          <Route 
              path='/admin' 
              element={isAuthenticated && role === "admin" 
                ? <AdminPage /> 
                : (console.log("Переход на админ панель заблокирован. Роль:", role), <Navigate to="/dashboard" />)} 
          />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;