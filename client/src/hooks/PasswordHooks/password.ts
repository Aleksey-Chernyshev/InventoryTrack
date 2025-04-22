import { PasswordService } from "../../services/password.service"

export const approvePasswordChange = async (id: number, token: string) => {
    try {
        const response = await PasswordService.ApproveRequest(id, token)
        console.log("Заявка одобрена:", response)
    } catch (error) {
        console.error("Ошибка при одобрении заявки:", error)
    }
}

export const rejectPasswordChange = async (id: number, token: string) => {
    try {
        const response = await PasswordService.RejectRequest(id, token)
        console.log("Заявка отклонена:", response)
    } catch (error) {
        console.error("Ошибка при отклонении заявки:", error)
    }
}
