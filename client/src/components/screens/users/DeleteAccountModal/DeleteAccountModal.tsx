import React from "react";

import styles from "./DeleteAccountModal.module.css";
import Modal from "../../../../shared/Modal/Modal";

interface DeleteAccountModalProps {
  isOpen: boolean;
  isAdmin: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  isAdmin,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal active={isOpen} onClose={onCancel}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {isAdmin ? "Удалить аккаунт администратора?" : "Запросить удаление аккаунта?"}
        </h2>
        <p className={styles.description}>
          {isAdmin
            ? "Вы уверены, что хотите безвозвратно удалить свой аккаунт? Это действие необратимо."
            : "Вы уверены, что хотите отправить запрос на удаление аккаунта? После одобрения администратором он будет удалён."}
        </p>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            Отмена
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            {isAdmin ? "Удалить" : "Отправить запрос"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
