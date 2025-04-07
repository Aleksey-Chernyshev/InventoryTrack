import axios from "axios"
import DashboardURL from "../configs/dashboard_urls"
import { IDevice } from "../hooks/DevicesHooks/useDevices"

export const DevicesService = {
    async GetDevices () {
        try {
            const response = await axios.get(DashboardURL.DEVICES_URL)
            return response.data
        } catch (error) {
            console.log('Error', error)
        }        
    },
    async UpdateDevices(id: number, data: Partial<IDevice>){
        try {
            const response = await axios.patch(`${DashboardURL.DEVICES_URL}/${id}`, data)
            return response.data
        } catch (error) {
            console.log('Error', error)
        } 
    },

    async DeleteDevice(id: number){
        try {
            const response = await axios.patch(`${DashboardURL.DEVICES_URL}/${id}/delete`)
            return response.data
        } catch (error) {
            console.log('Error', error)
        }
    }
}