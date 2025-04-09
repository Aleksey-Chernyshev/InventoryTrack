import { useEffect, useState } from "react"
import { DepartmentsService } from "../services/departments.service"

export interface IDepartment {
  department_id: number;
  department_name: string;
}

export const useDepartments = (id: number | null) => {
  const [departments, setDepartments] = useState<IDepartment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchDepartments = async () => {
      setLoading(true)
      try {
        const data = await DepartmentsService.GetDepartmentsBySubdiv(id)
        setDepartments(data)
      } catch (err) {
        setError("Ошибка при загрузке отделов")
      } finally {
        setLoading(false)
      }
    };

    fetchDepartments()
  }, [id])

  return { departments, loading, error }
}
