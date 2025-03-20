import axios from "axios";
import DashboardURL from "../configs/dashboard_urls";

export const SubdivisionsService = {
    async GetSubdivisions(){
        try {
            const response = await axios.get(DashboardURL.SUBDIVISIONS_URL)
            return response.data
        } catch (error) {
            console.error("Неизвестная ошибка:", error);
        }

    }
}