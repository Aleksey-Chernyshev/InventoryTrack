import SettingSection from "../SettingsSection/SettingsSection";
import styles from "./Profile.module.css";
import { CgProfile } from "react-icons/cg";
import useProfile from "../../../hooks/AuthHooks/useProfile";
import { useState, useEffect } from "react";
import { UserService } from "../../../services/user.service";

const Profile: React.FC = () => {
  const token = localStorage.getItem("token") || "";
  const { profile, loading, error } = useProfile(token);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editError, setEditError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setEmail(profile.email);
    }
  }, [profile]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>{error}</div>;
  if (!profile) return <div>Профиль не загружен или ID пользователя недоступен.</div>;

  const handleSave = async () => {
    if (!profile?.id) {
      setEditError("ID пользователя не определён. Повторите позже.");
      return;
    }

    try {
      const updatedProfile = await UserService.UpdateUser(
        profile.id,
        token,
        {
          name: name || profile.name,
          email: email || profile.email,
        }
      );

      if (updatedProfile) {
        setIsEditing(false);
        setEditError("");
        setSuccessMessage("Профиль обновлён успешно!");
      }
    } catch (error) {
      setEditError("Ошибка при сохранении данных.");
    }
  };

  return (
    <SettingSection icon={CgProfile} title={"Профиль"}>
      <div className={styles.profileContainer}>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Profile"
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h3>{profile.name}</h3>
          <p>{profile.email}</p>
        </div>
      </div>

      {successMessage && <div className={styles.successMessage}>{successMessage}</div>}

      {!isEditing && (
        <button className={styles.editButton} onClick={() => setIsEditing(true)}>
          Редактировать профиль
        </button>
      )}

      {isEditing && (
        <div className={styles.editForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="name">Имя</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={profile.name}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Почта</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={profile.email}
            />
          </div>
          

          {editError && <p className={styles.error}>{editError}</p>}

          <div className={styles.button_container}>
            <button className={styles.saveButton} onClick={handleSave}>
              Сохранить
            </button>
            <button className={styles.cancelButton} onClick={() => setIsEditing(false)}>
              Отменить
            </button>
          </div>
        </div>
      )}
    </SettingSection>
  );
};

export default Profile;
