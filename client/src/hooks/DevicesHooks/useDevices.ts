import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { DevicesService } from "../../services/devices.service"



export interface IDevice{
    device_id: number;
    device_name: string;
    device_type_name: string;
    device_inventory_number: string;
    device_serial_number: string;
    device_model: string;
    device_date_commissioning: string;
    device_status?: string;
    
    // Поля, если устройство — принтер
    printer_format?: string;
    printer_color?: boolean;
    printer_cartridge?: string;
    
    // Поля, если устройство — моноблок
    monoblock_os?: string;
    monoblock_cpu?: string;
    monoblock_cpu_frequency?: number;
    monoblock_ram?: number;

    to_department_id?: number;
    department_name?: string;
    from_department_id?: number,
    subdiv_name?: string;
    subdiv_id?:number;


}

export function useDevices(){

    const [device, setDevice] = useState<IDevice[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchDevices(){
        try {
            setLoading(true)
            const response = await DevicesService.GetDevices()
            setDevice(response)
            setLoading(false)
        } catch (e: unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchDevices()
    },[])

    return {loading, error, device, refetchDevice: fetchDevices}
}