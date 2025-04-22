import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { PasswordService } from "../../services/password.service"

export interface IPasswordChangeRequest {
    id: number
    user_id: number
    user_name: string
    user_email: string
    new_password: string
    status: "pending" | "approved" | "rejected"
    created_at: string
}

export function usePasswordChangeRequests(token: string) {
    const [requests, setRequests] = useState<IPasswordChangeRequest[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const response = await PasswordService.GetRequests(token)
            setRequests(response)
            setLoading(false)
        } catch (e: unknown) {
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    return { requests, loading, error, refetchRequests: fetchRequests, setRequests }
}
