import React, { Fragment, useState } from "react"
import styles from './UsersTable.module.css'
import { IoSearchOutline } from "react-icons/io5"
import { useUsers } from "../../../../hooks/UsersHooks/useUsers"
import { deleteUser, updateUser } from "../../../../hooks/UsersHooks/user"
import { useMemo } from "react"
import EditUsersModal from "../EditUsersModal/EditUsersModal"

interface IUser {
  user_id: number
  user_name: string
  user_email: string
  user_password: string
  role: string
}

const UsersTable: React.FC = () => {
  const token = localStorage.getItem("token")
  if(!token) throw new Error("токен отсутствует")
    
    const { user, loading, error, refetchUsers } = useUsers(token)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null)
    const [editModal, setEditModal] = useState(false)

    const filteredUsers = useMemo(() => {
      return user.filter(
          (user) =>
              user.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.user_email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [user, searchTerm])


    const closeEditModal = () => {
      setEditModal(false)
      setSelectedUser(null)
      setUpdatedUserData({ name: "", email: "",password: "" })
  }

  const [updatedUserData, setUpdatedUserData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }
    const handleUpdate = async (id: number) => {
      try {
        const token = localStorage.getItem("token")
        if(!token) throw new Error("токен отсутствует")


          const updatedData = {
            name: updatedUserData.name || selectedUser?.user_name || "",
            email: updatedUserData.email || selectedUser?.user_email || "",
            password: updatedUserData.password || selectedUser?.user_password || "",
          }


        await updateUser(id, token, updatedData)
        refetchUsers()
        closeEditModal()
      } catch (error) {
        console.error("Ошибка при изменении:", error)
        
      }
    }

    const handleDelete = async (id: number) => {
      try {
        const token = localStorage.getItem("token")
        if(!token) throw new Error("токен отсутствует")
        await deleteUser(id, token)
        refetchUsers()
    } catch (error) {
        console.error("Ошибка при удалении:", error)
    }
    }

    if (loading) return <div>Загрузка пользователей...</div>
    if (error) return <div>Ошибка: {error}</div>
 
  return (
    <Fragment>

    
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
                <div className={styles.buttons_container}>
                <button className={`${styles.button} ${styles.edit}`} onClick={() => {setSelectedUser(user); setEditModal(true)}}>Изменить</button>
                <button className={`${styles.button} ${styles.delete}`} onClick={() => handleDelete(user.user_id)}>Удалить</button>
                </div>
              </td>
            </tr>
          ))}

          </tbody>
        </table>
      </div>
    </div>
    <EditUsersModal 
      selectedUser={selectedUser}
      editModal={editModal}
      closeEditModal={closeEditModal}
      updatedUserData={updatedUserData}
      handleChange={handleChange}
      handleUpdate={handleUpdate}
    />
    </Fragment>
  );
};

export default UsersTable;