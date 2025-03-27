import React, { FC } from "react"
import Modal from "../../../../shared/Modal/Modal"
import InputFormAuth from "../../../../shared/InputFormAuth/InputFormAuth"
import styles from "./EditUsersModal.module.css"

interface IUser {
  user_id: number
  user_name: string
  user_email: string
  user_password: string
  role: string
}

interface EditUserModalProps {
  selectedUser: IUser | null
  editModal: boolean
  closeEditModal: () => void
  updatedUserData: { name: string; email: string, password: string }
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleUpdate: (id: number) => void
}

const EditUsersModal: FC<EditUserModalProps> = ({
  selectedUser,
  editModal,
  closeEditModal,
  updatedUserData,
  handleChange,
  handleUpdate,
}) => {
  if (!selectedUser) return null

  return (
    <Modal active={editModal} onClose={closeEditModal} style={{ width: "500px", height: "620px" }}>
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
            <label>Новый пароль</label>
            <InputFormAuth
              type="password"
              name="password"
              value={updatedUserData.password}
              onChange={handleChange}
              placeholder="Пароль"
            />
          </div>
          <button className={styles.btn} type="button" onClick={() => handleUpdate(selectedUser.user_id)}>
            Сохранить изменения
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default EditUsersModal
