import axios from "axios";
import AuthURL from "../configs/auth_urls";
interface IBodyProps{
    email: string,
    password: string,
    name?:string
}
export const UserService ={
    async LoginUser(body: IBodyProps){
        const response = await axios.post(AuthURL.LOGIN_URL, body)
        return response
    },

    async RegisterUser(body: IBodyProps){
        const response = await axios.post(AuthURL.REGISTER_URL, body)
        return response
    },
    
}