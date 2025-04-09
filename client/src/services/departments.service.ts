import axios from "axios"
import DashboardURL from "../configs/dashboard_urls"



export const DepartmentsService = {
    async GetDepartmentsBySubdiv (id: number){
        try {
            const response = await axios.get(`${DashboardURL.DEPARTMENTS_URL}/bysubdiv/${id}`)
            return response.data
        } catch (error) {
            console.log('Error', error)
        }
    }
}