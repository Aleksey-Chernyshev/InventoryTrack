import React, { Fragment} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDashboard } from '../../hooks/useDashboard'

interface Props {
  setAuth: (boolean: boolean, userRole: string | null) => void
}

const DashboardPage: React.FC<Props> = ({ setAuth }) => {

  const {userName, role, error} = useDashboard(setAuth)
  const navigate = useNavigate()


  const logout = () => {
    localStorage.removeItem('token')
    setAuth(false, null)
    navigate('/login')
  };

  if (error) {
    return <div>Ошибка при загрузке данных. Пожалуйста, попробуйте снова.</div>
  }

  if (!userName) {
    return <div>Загрузка...</div>
  }

  return (

    <Fragment>
    
      <div>
       <h1>Добро пожаловать, {userName}!</h1>
       <p>Ваша роль: {role}</p>
        {role && role === "admin" ? (
          <button onClick={() => navigate("/admin")}>Перейти в Админ-панель</button> ) : null}

       
      </div>
            
      <button
        className="btn btn-primary"
        onClick={logout}
            >Log out</button>

    </Fragment>
  );
};

export default DashboardPage