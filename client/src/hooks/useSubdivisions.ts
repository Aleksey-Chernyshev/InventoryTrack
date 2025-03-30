import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { SubdivisionsService } from "../services/subdivisions.service"



export interface ISubdiv{
    subdiv_id: number,
    subdiv_name: string,
    subdiv_address: string,
    subdiv_position: [number, number]
    departments: { department_name: string, department_location: string }[]

}

export function useSubdivisions(){

    const [subdiv, setSubdiv] = useState<ISubdiv[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchSubdivisions(){
        try {
            setLoading(true)
            const response = await SubdivisionsService.GetSubdivisions()
            setSubdiv(response)
            setLoading(false)
        } catch (e: unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchSubdivisions()
    },[])

    return {loading, error, subdiv}
}