import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import DashboardPage from './pages/DashboardPage/DashboardPage'

const AuthURL = {
  IS_VERIFY_URL: "http://localhost:5000/api/auth/is-verify"
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  

  const setAuth = (auth: boolean, userRole: string | null = null, name: string | null = null) => {
    setIsAuthenticated(auth)
    setRole(userRole)
    setUserName(name)

    if (auth) {
      localStorage.setItem("role", userRole || "")
      localStorage.setItem("name", name || "")
    } else {
      localStorage.clear()
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (!token) return setAuth(false)

    axios.get(AuthURL.IS_VERIFY_URL, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        const { role, name } = response.data
        if (role && name) setAuth(true, role, name)
        else setAuth(false)
      })
      .catch(() => setAuth(false))
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage setAuth={setAuth} />} />
        <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage setAuth={setAuth} />} />
        <Route path="/dashboard/*" element={isAuthenticated ? <DashboardPage setAuth={setAuth} role={role} userName={userName} /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
