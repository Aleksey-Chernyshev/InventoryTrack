import axios from "axios";
import DashboardURL from "../configs/dashboard_urls";

export const PasswordService = {
  async RequestPasswordChange(newPassword: string, token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.PASSWORD_URL}/request-change`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при запросе смены пароля:", error);
      throw error;
    }
  },

  async GetRequests(token: string) {
    try {
      const response = await axios.get(`${DashboardURL.PASSWORD_URL}/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Ошибка при получении запросов на смену пароля:", error);
      throw error;
    }
  },

  async ApproveRequest(id: number, token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.PASSWORD_URL}/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при подтверждении запроса:", error);
      throw error;
    }
  },

  async RejectRequest(id: number, token: string) {
    try {
      const response = await axios.post(
        `${DashboardURL.PASSWORD_URL}/reject/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Ошибка при отклонении запроса:", error);
      throw error;
    }
  },

  async changeAdminPassword(newPassword: string, token: string){
    try {
      const response = await axios.post(
        `${DashboardURL.PASSWORD_URL}/change-self`,
        { newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Пароль успешно изменен:", response.data);
    } catch (error) {
      console.error("Ошибка при изменении пароля:", error);
    }
  }
};
