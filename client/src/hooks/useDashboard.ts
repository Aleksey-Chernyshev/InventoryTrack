import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardService } from "../services/dashboard.service";



export const useDashboard = (setAuth: (boolean: boolean, userRole: string | null) => void) =>{
    const [userName, setUserName] = useState<string | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setAuth(false, null);
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                const response = await DashboardService.Dashboard(token);
                setUserName(response.data.user_name);
                setRole(response.data.role);
            } catch (err) {
                console.error("Ошибка при загрузке данных пользователя:", err);
                setAuth(false, null);
                navigate("/login");
            }
        };

        fetchData();
    }, [setAuth, navigate]);

    return { userName, role, error };
}