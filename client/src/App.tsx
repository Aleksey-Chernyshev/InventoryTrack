import React, {Fragment, useState, useEffect} from 'react'
import axios from 'axios';
import{BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import AuthURL from './configs/auth_urls';




function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const setAuth = (boolean:boolean) => {
    setIsAuthenticated(boolean)
  }

  async function isAuth() {
    try {
      const response = await axios.get<boolean>(AuthURL.IS_VERIFY_URL, {headers:{token: localStorage.token}})
      console.log(response.data)

      response.data === true ? setIsAuthenticated(true) : setIsAuthenticated(false) 
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        //toast.error("An error occurred during login. Please try again.")
      } else {
        console.error('An unknown error occurred', err);
      }
    }
  }
  useEffect(()=>{
    isAuth()
  },[])
  return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route 
              path='/login' 
              element={!isAuthenticated ?   <LoginPage setAuth={setAuth} />  : <Navigate to="/dashboard" />} 
            />
            <Route 
              path='/register' 
              element={!isAuthenticated ?  <RegisterPage setAuth={setAuth}/> : <Navigate to="/login" />} 
            />
            <Route
             path='/dashboard'
             element={isAuthenticated ?  <DashboardPage setAuth={setAuth}/> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
