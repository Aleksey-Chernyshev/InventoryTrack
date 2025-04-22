import React from 'react';
import styles from './UsersPage.module.css';
import { usePasswordChangeRequests } from '../../hooks/PasswordHooks/usePasswordChangeRequests';
import { useAccountDeleteRequests } from '../../hooks/AccountHooks/useAccountDeleteRequests';
import { AccountService } from '../../services/account.service';
import Header from '../../components/layout/header/Header';
import UsersTable from '../../components/screens/users/UsersTable/UsersTable';
import { PasswordService } from '../../services/password.service';

const UsersPage: React.FC = () => {
  const token = localStorage.getItem('token') || '';
  const { requests: passwordRequests, loading: passwordLoading, error: passwordError, setRequests: setPasswordRequests } = usePasswordChangeRequests(token);
  const { requests: deleteRequests, loading: deleteLoading, error: deleteError, setRequests: setDeleteRequests } = useAccountDeleteRequests(token);

  const handleApprovePasswordRequest = async (requestId: number) => {
    try {
      await PasswordService.ApproveRequest(requestId, token);
      setPasswordRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
      alert('Запрос на смену пароля одобрен!');
    } catch (error) {
      console.error('Ошибка при подтверждении запроса:', error);
    }
  };

  const handleRejectPasswordRequest = async (requestId: number) => {
    try {
      await PasswordService.RejectRequest(requestId, token);
      setPasswordRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
      alert('Запрос на смену пароля отклонен!');
    } catch (error) {
      console.error('Ошибка при отклонении запроса:', error);
    }
  };

  const handleApproveDeleteRequest = async (requestId: number) => {
    try {
      await AccountService.ApproveDeleteRequest(requestId, token);
      setDeleteRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
      alert('Заявка на удаление аккаунта одобрена!');
    } catch (error) {
      console.error('Ошибка при подтверждении заявки:', error);
    }
  };

  const handleRejectDeleteRequest = async (requestId: number) => {
    try {
      await AccountService.RejectDeleteRequest(requestId, token);
      setDeleteRequests((prevRequests) => prevRequests.filter((request) => request.id !== requestId));
      alert('Заявка на удаление аккаунта отклонена!');
    } catch (error) {
      console.error('Ошибка при отклонении заявки:', error);
    }
  };

  const pendingPasswordRequests = passwordRequests.filter((request) => request.status === 'pending');
  const pendingDeleteRequests = deleteRequests.filter((request) => request.status === 'pending');

  return (
    <div className={styles.users_page_container}>
      <Header title={'Пользователи'} />
      <div className={styles.table_wrapper}>
        {/* Заявки на смену пароля */}
        {pendingPasswordRequests.length > 0 && !passwordLoading && (
          <div className={styles.password_change_requests}>
            <h3>Заявки на смену пароля</h3>
            {passwordError && <p className={styles.error}>{passwordError}</p>}
            <div className={styles.requests_list}>
              {pendingPasswordRequests.map((request) => (
                <div key={request.id} className={styles.request_card}>
                  <div className={styles.user_info}>
                    <span className={styles.user_name}>{request.user_name}</span>
                    <span className={styles.user_email}>{request.user_email}</span>
                  </div>
                  <div className={styles.status}>
                    <span className={styles.status_label}>Статус:</span>
                    <span className={styles[request.status]}>{request.status}</span>
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={() => handleApprovePasswordRequest(request.id)} className={styles.approve_button}>
                      Подтвердить
                    </button>
                    <button onClick={() => handleRejectPasswordRequest(request.id)} className={styles.reject_button}>
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Заявки на удаление аккаунта */}
        {pendingDeleteRequests.length > 0 && !deleteLoading && (
          <div className={styles.account_deletion_requests}>
            <h3>Заявки на удаление аккаунта</h3>
            {deleteError && <p className={styles.error}>{deleteError}</p>}
            <div className={styles.requests_list}>
              {pendingDeleteRequests.map((request) => (
                <div key={request.id} className={styles.request_card}>
                  <div className={styles.user_info}>
                    <span className={styles.user_name}>{request.user_name}</span>
                    <span className={styles.user_email}>{request.user_email}</span>
                  </div>
                  <div className={styles.status}>
                    <span className={styles.status_label}>Статус:</span>
                    <span className={styles[request.status]}>{request.status}</span>
                  </div>
                  <div className={styles.buttons}>
                    <button onClick={() => handleApproveDeleteRequest(request.id)} className={styles.approve_button}>
                      Подтвердить
                    </button>
                    <button onClick={() => handleRejectDeleteRequest(request.id)} className={styles.reject_button}>
                      Отклонить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <UsersTable />
      </div>
    </div>
  );
};

export default UsersPage;
