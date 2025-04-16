import axios from "axios"
import DashboardURL from "../configs/dashboard_urls"
import { IDevice } from "../hooks/DevicesHooks/useDevices"

export const DevicesService = {
    async CreateDevice(data: any) {
        try {
          const response = await axios.post(DashboardURL.DEVICES_URL, data);
          return response.data;
        } catch (error) {
          console.error("Ошибка при создании устройства:", error);
          throw error;
        }
    },

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
    },
    
    async MoveDevice(data: {
        device_id: number;
        from_department_id: number;
        to_department_id: number;
        moved_by_user: number;
    }) {
        try {
            // Обновление статуса устройства и даты ввода в эксплуатацию
            const updateData = {
                device_id: data.device_id,
                device_status: "Активен",
                device_date_commissioning: new Date().toISOString(), // Устанавливаем сегодняшнюю дату
                subdiv_id: data.to_department_id, // Это предполагает, что мы связываем подразделение с отделом
            };
            
            // Обновляем данные устройства
            await axios.patch(`${DashboardURL.DEVICES_URL}/${data.device_id}`, updateData);
    
            // Выполняем перемещение
            const response = await axios.post(DashboardURL.MOVE_DEVICE_URL, data);
            return response.data;
        } catch (error) {
            console.log("Ошибка при перемещении устройства:", error);
            throw error;
        }
    }
}