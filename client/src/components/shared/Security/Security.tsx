import { useState } from "react";
import SettingSection from "../SettingsSection/SettingsSection";
import { MdOutlineSecurity } from "react-icons/md";
import styles from "./Security.module.css";
import { AxiosError } from "axios";
import { PasswordService } from "../../../services/password.service";

const Security: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const role = localStorage.getItem("role"); 

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPasswordChangeForm, setShowPasswordChangeForm] = useState(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);
    try {
      if (role === "admin") {
        // Администратор меняет пароль сам
        await PasswordService.changeAdminPassword(newPassword, token);
      } else {
        // Обычный пользователь запрашивает смену пароля
        await PasswordService.RequestPasswordChange(newPassword, token);
      }
      setError(""); 
      alert("Запрос на смену пароля отправлен!");
      setShowPasswordChangeForm(false); 
    } catch (e: unknown) {
      const err = e as AxiosError;
      setError(err.message || "Ошибка при запросе смены пароля");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SettingSection icon={MdOutlineSecurity} title={"Безопасность"}>
      <p className={styles.description}>
        Измените пароль и настройте параметры безопасности.
      </p>

      
      {!showPasswordChangeForm && (
        <button
          onClick={() => setShowPasswordChangeForm(true)}
          className={styles.changePasswordButton}
        >
          Сменить пароль
        </button>
      )}

      {/* Форма для всех пользователей */}
      {showPasswordChangeForm && (
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="newPassword">Новый пароль:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword">Подтверждение пароля:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите новый пароль"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.button_container}>
            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className={styles.submitButton}
            >
              {loading ? "Отправка..." : role === "admin" ? "Сменить пароль" : "Запросить смену пароля"}
            </button>

            <button
              onClick={() => setShowPasswordChangeForm(false)}
              className={styles.cancelButton}
            >
              Отменить
            </button>
          </div>
        </div>
      )}
    </SettingSection>
  );
};

export default Security;
