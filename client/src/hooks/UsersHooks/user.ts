import { UserService } from "../../services/user.service"

export const deleteUser = async (id: number, token: string) => {
    try {
        const response = await UserService.DeleteUser(id, token)
        console.log(response)
    } catch (error) {
        console.error('Ошибка при удалении данных:', error)
    }
}

export const updateUser = async (id: number, token: string, data: { name: string; email: string; password: string }) => {
    try {
        const response = await UserService.UpdateUser(id, token, data) 
        console.log(response)

    } catch (error) {
        console.error('Ошибка при изменении данных:', error)
        
    }
}