import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();

    console.log("Вы находитесь на админ странице");

    return (
        <div>
            <h1>Админская панель</h1>
            <button onClick={() => navigate("/dashboard")}>Вернуться на Dashboard</button>
        </div>
    );
};

export default AdminPage;