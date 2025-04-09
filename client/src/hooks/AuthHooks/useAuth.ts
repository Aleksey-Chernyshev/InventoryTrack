import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../../services/user.service"

export const useAuth = (setAuth: (boolean: boolean, userRole: string | null, userName: string | null) => void) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await UserService.LoginUser({email, password})

      localStorage.setItem("token", data.token)
      localStorage.setItem("role", data.role)
      localStorage.setItem("name", data.name)
      localStorage.setItem("user_id", data.id.toString())


      setAuth(true, data.role, data.name);
      navigate(data.role === "admin" ? "/admin" : "/dashboard")
    } catch (error: unknown) {
      console.error(error)
      
    }
  };

  return { email, setEmail, password, setPassword, handleLogin }
};
