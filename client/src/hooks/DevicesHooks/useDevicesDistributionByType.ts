import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { DevicesService } from "../../services/devices.service"

export interface IDeviceTypeDistribution {
    device_type_name: string;
    count: number;
}

export function useDevicesDistributionByType() {
    const [distribution, setDistribution] = useState<IDeviceTypeDistribution[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchDistribution() {
        try {
            setLoading(true)
            const response = await DevicesService.GetDevicesDistributionByType()
            setDistribution(response)
            setLoading(false)
        } catch (e: unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchDistribution()
    }, [])

    return { distribution, loading, error, refetchDistribution: fetchDistribution }
}
