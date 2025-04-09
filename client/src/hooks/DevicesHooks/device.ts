import { DevicesService } from "../../services/devices.service"
import { IDevice } from "./useDevices"

interface MoveDeviceData {
    device_id: number;
    from_department_id: number;
    to_department_id: number;
    moved_by_user: number;
  }

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

export const MoveDevice = async (data: MoveDeviceData) => {
    try {
      const response = await DevicesService.MoveDevice(data)
      console.log("Устройство перемещено:", response)
    } catch (error) {
      console.error("Ошибка при перемещении устройства:", error)
    }
  }