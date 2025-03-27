import { AxiosError } from "axios"
import { useEffect, useState } from "react"
import { UserService } from "../../services/user.service"



interface IUser{
    user_id: number,
    user_email: string,
    user_password: string,
    user_name:string,
    role: string
}
export function useUsers(token: string){

    const [user, setUser] = useState<IUser[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function fetchUsers(){
        try {
            setLoading(true)
            const response = await UserService.GetUsers(token)
            setUser(response)
            console.log(response)
            setLoading(false)
        } catch (e: unknown) {
            setError('')
            setLoading(false)
            const error = e as AxiosError
            setError(error.message)
        }
    }
    useEffect(() => {
        fetchUsers()
    },[])
    return {loading, error, user, refetchUsers: fetchUsers}
}
