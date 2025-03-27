import React from 'react';
import UsersTable from '../../components/screens/users/UsersTable/UsersTable';
import styles from './UsersPage.module.css'
import Header from '../../components/layout/header/Header';
const UsersPage: React.FC = () => {


    return (
        <div className={styles.users_page_container}>
            <Header title={'Пользователи'} />
            <div className={styles.table_wrapper}>
                <UsersTable />
            </div>
            
            
        </div>
    );
};

export default UsersPage;