import React, { useState } from "react"
import styles from './UsersTable.module.css'
import { IoSearchOutline } from "react-icons/io5"
import { useUsers } from "../../../hooks/useUsers"


const UsersTable: React.FC = () => {

  const { user, loading, error } = useUsers()
    const [searchTerm, setSearchTerm] = useState("")

    const filteredUsers = user.filter(
        (user) => 
            user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
    )

    if (loading) return <div>Загрузка пользователей...</div>
    if (error) return <div>Ошибка: {error}</div>
 
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Users</h2>
        <div className={styles.searchBox}>
          <IoSearchOutline className={styles.searchIcon} size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.user_email}>
              <td>
                <div className={styles.userCell}>
                  <div className={styles.avatar}>
                    {user.user_name ? user.user_name.charAt(0) : "?"}
                  </div>
                  <span>{user.user_name}</span>
                </div>
              </td>
              <td>{user.user_email}</td>
              <td>
                <span className={styles.role}>{user.role}</span>
              </td>
              <td>
                <button className={styles.editButton}>Edit</button>
                <button className={styles.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;