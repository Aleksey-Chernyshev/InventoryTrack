import axios from "axios"
import AuthURL from "../configs/auth_urls"

interface IBodyProps{
    email: string,
    password: string,
    name?:string
}
export const UserService ={
    async LoginUser(body: IBodyProps){
        try {
            const response = await axios.post(AuthURL.LOGIN_URL, body)
            return response.data 
        } catch (error) {
            throw new Error("Ошибка при входе! Проверьте email и пароль.")
        }

    },

    async RegisterUser(body: IBodyProps){
        try {
            const response = await axios.post(AuthURL.REGISTER_URL, body)
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Ошибка при регистрации:", error.response?.data?.error || error.message);
                throw new Error(error.response?.data?.error || "Ошибка при регистрации");
            } else {
                console.error("Неизвестная ошибка:", error);
                throw new Error("Произошла неизвестная ошибка при регистрации");
            }
            
        }
    },
    
}