import { DevicesService } from "../../services/devices.service"
import { IDevice } from "./useDevices"



export const UpdateDevice = async(id: number, data: Partial<IDevice>) => {
    try {
        const response = await DevicesService.UpdateDevices(id, data) 
        console.log(response)

    } catch (error) {
        console.error('Ошибка при изменении устройства:', error)
        
    }
}

export const DeleteDevice = async (id: number) =>{
    try {
            const response = await DevicesService.DeleteDevice(id) 
            console.log(response)
    
        } catch (error) {
            console.error('Ошибка при удалении устройства:', error)
            
        }
}