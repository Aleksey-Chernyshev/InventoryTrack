import { AccountService } from "../../services/account.service";

export const requestAccountDeletion = async (token: string) => {
  try {
    const response = await AccountService.RequestAccountDeletion(token);
    console.log("Запрос на удаление аккаунта отправлен:", response);
  } catch (error) {
    console.error("Ошибка при отправке запроса на удаление аккаунта:", error);
  }
};

export const approveAccountDeletion = async (id: number, token: string) => {
  try {
    const response = await AccountService.ApproveDeleteRequest(id, token);
    console.log("Заявка на удаление аккаунта одобрена:", response);
  } catch (error) {
    console.error("Ошибка при одобрении заявки на удаление аккаунта:", error);
  }
};

export const rejectAccountDeletion = async (id: number, token: string) => {
  try {
    const response = await AccountService.RejectDeleteRequest(id, token);
    console.log("Заявка на удаление аккаунта отклонена:", response);
  } catch (error) {
    console.error("Ошибка при отклонении заявки на удаление аккаунта:", error);
  }
};

export const deleteOwnAccount = async (token: string) => {
  try {
    const response = await AccountService.DeleteSelf(token);
    console.log("Аккаунт администратора успешно удален:", response);
  } catch (error) {
    console.error("Ошибка при удалении аккаунта администратора:", error);
  }
};
