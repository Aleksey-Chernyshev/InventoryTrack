import React, { FC, useState } from "react";
import Modal from "../../../../shared/Modal/Modal";
import InputFormAuth from "../../../../shared/InputFormAuth/InputFormAuth";
import styles from "./EditUsersModal.module.css";

interface IUser {
  user_id: number;
  user_name: string;
  user_email: string;
  user_password: string;
  role: string;
}

interface EditUserModalProps {
  selectedUser: IUser | null;
  editModal: boolean;
  closeEditModal: () => void;
  updatedUserData: { name: string; email: string; password: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: (id: number) => void;
}

const EditUsersModal: FC<EditUserModalProps> = ({
  selectedUser,
  editModal,
  closeEditModal,
  updatedUserData,
  handleChange,
  handleUpdate,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  
  if (!selectedUser) return null;

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(updatedUserData.email);

    if (!updatedUserData.name) newErrors.name = "Имя не может быть пустым";
    if (!updatedUserData.email) newErrors.email = "Email не может быть пустым";
    if (!validEmail) newErrors.email = "Некорректный формат email";
    
    setErrors(newErrors);
    
    // Если ошибок нет — форма валидна
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = () => { 
    if (validateForm()) {
      handleUpdate(selectedUser.user_id);
    }
  };

  return (
    <Modal active={editModal} onClose={closeEditModal} style={{ width: "500px", height: "720px" }}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Что бы вы хотели изменить?</h2>
        <div className={styles.oldData}>
          <div>Старые данные:</div>
          <div>Имя: {selectedUser.user_name}</div>
          <div>Почта: {selectedUser.user_email}</div>
        </div>
        <form className={styles.formContainer}>
          <h3>Обновите данные пользователя</h3>
          <div className={styles.formGroup}>
            <label>Новое имя</label>
            <InputFormAuth
              type="text"
              name="name"
              value={updatedUserData.name}
              onChange={handleChange}
              placeholder="Имя"
            />
            {errors.name && <div className={styles.error}>{errors.name}</div>}
          </div>
          <div className={styles.formGroup}>
            <label>Новый адрес почты</label>
            <InputFormAuth
              type="email"
              name="email"
              value={updatedUserData.email}
              onChange={handleChange}
              placeholder="Email"
            />
            {errors.email && <div className={styles.error}>{errors.email}</div>}
          </div>
          <div className={styles.formGroup}>
            <label>Новый пароль</label>
            <InputFormAuth
              type="password"
              name="password"
              value={updatedUserData.password}
              onChange={handleChange}
              placeholder="Пароль"
            />
            {errors.password && <div className={styles.error}>{errors.password}</div>}
          </div>
          <button className={styles.btn} type="button" onClick={handleSaveChanges}>
            Сохранить изменения
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUsersModal;
