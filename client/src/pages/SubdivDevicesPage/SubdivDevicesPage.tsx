import React, { useState } from "react"
import DevicesTable from "../../components/screens/devices/DevicesTable/DevicesTable"
import { useParams } from 'react-router-dom';
import { useSubdivisions } from "../../hooks/useSubdivisions";
import { useDepartments } from "../../hooks/useDepartments";
import styles from "../../components/screens/users/UsersTable/UsersTable.module.css"


const SubdivDevicesPage: React.FC = () => {
  const { subdivId } = useParams<{ subdivId: string }>();
  const { subdiv, loading } = useSubdivisions()
  const numericSubdivId = parseInt(subdivId!)
  const { departments, loading: loadingDepts } = useDepartments(numericSubdivId)

  const [selectedDepartment, setSelectedDepartment] = useState<string>("")

  const currentSubdiv = subdiv.find(s => s.subdiv_id === parseInt(subdivId || '0'))

  return (
    <div>
      <h1 style={{marginBottom:"10px"}}>
        Устройства в подразделении{" "}
        {loading
          ? "Загрузка..."
          : currentSubdiv
            ? currentSubdiv.subdiv_name
            : `ID: ${subdivId}`}
      </h1>
      {loadingDepts ? (
        <p>Загрузка отделов...</p>
      ) : departments.length > 0 && (
        <div className={styles.filterBox} style={{marginBottom:"25px"}}>
          <label style={{fontSize:"30px"}}>Фильтр по отделу: </label>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className={styles.statusFilter}
          >
            <option value="">Все отделы</option>
            {departments.map((dep) => (
              <option key={dep.department_id} value={dep.department_name}>
                {dep.department_name}
              </option>
            ))}
          </select>
        </div>
      )}
      <DevicesTable subdivId={parseInt(subdivId!)} departmentName={selectedDepartment || undefined} />
    </div>
  )
}

export default SubdivDevicesPage
