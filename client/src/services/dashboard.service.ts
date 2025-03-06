import axios from "axios"
import DashboardURL from "../configs/dashboard_urls"


export const DashboardService = {
    async Dashboard(token: string){
        try {
            const response = await axios.get(DashboardURL.DASHBOARD_URL, {
                headers: {"Authorization": `Bearer ${token}`}
            })
            return response
        } catch (error) {
            console.error('Ошибка при запросе данных пользователя', error)
            throw error
        }
    }
}