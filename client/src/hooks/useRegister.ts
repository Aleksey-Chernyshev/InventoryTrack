import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserService } from "../services/user.service"

export const useRegister = (setAuth: (boolean: boolean, userRole: string | null) => void) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const data = await UserService.RegisterUser({ name, email, password })
      console.log("Ответ от сервера:", data)
      localStorage.setItem('token', data.token);
      setAuth(true, "user"); // Новый пользователь по умолчанию не админ
      navigate('/dashboard');
    } catch (error: unknown) {
        console.error(error);
        alert('Ошибка при регистрации! Возможно, этот email уже зарегистрирован.');
      
    }
  };

  return { name, setName, email, setEmail, password, setPassword, handleRegister }
};
