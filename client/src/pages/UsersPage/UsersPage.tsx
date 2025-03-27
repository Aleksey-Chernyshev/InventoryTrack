import React from 'react';
import UsersTable from '../../components/screens/users/UsersTable/UsersTable';
import styles from './UsersPage.module.css'
const UsersPage: React.FC = () => {


    return (
        <div className={styles.users_page_container}>
            <h1>users page</h1>
            <div className={styles.table_wrapper}>
                <UsersTable />
            </div>
            
            
        </div>
    );
};

export default UsersPage;