import axios from "axios";
import DashboardURL from "../configs/dashboard_urls";

export const AccountService = {
  async RequestAccountDeletion(token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.ACCOUNT_URL}/delete-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отправке запроса на удаление аккаунта:", error);
      throw error;
    }
  },

  async GetDeleteRequests(token: string) {
    try {
      const response = await axios.get(`${DashboardURL.ACCOUNT_URL}/delete-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении заявок на удаление аккаунтов:", error);
      throw error;
    }
  },

  async ApproveDeleteRequest(id: number, token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.ACCOUNT_URL}/delete-approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при подтверждении удаления аккаунта:", error);
      throw error;
    }
  },

  async RejectDeleteRequest(id: number, token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.ACCOUNT_URL}/delete-reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отклонении запроса на удаление аккаунта:", error);
      throw error;
    }
  },

  async DeleteSelf(token: string) {
    try {
      const response = await axios.delete(
        `${DashboardURL.ACCOUNT_URL}/delete-self`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при удалении аккаунта администратора:", error);
      throw error;
    }
  }
};
