import { useEffect, useState } from "react"
import { AxiosError } from "axios"
import { AccountService } from "../../services/account.service"

export interface IDeleteAccountRequest {
    id: number
    user_id: number
    user_name: string
    user_email: string
    status: "pending" | "approved" | "rejected"
    created_at: string
}

export function useAccountDeleteRequests(token: string) {
    const [requests, setRequests] = useState<IDeleteAccountRequest[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const fetchRequests = async () => {
        try {
            setLoading(true)
            const response = await AccountService.GetDeleteRequests(token)
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
