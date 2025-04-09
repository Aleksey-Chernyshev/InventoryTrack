const db = require("../db")

class DepartmentsController {

    async getDepartmentsBySubdivision(req, res) {
        const { id } = req.params;

        try {
            const departments = await db.query(`
                SELECT department_id, department_name
                FROM departments
                WHERE department_type = $1
            `, [id])

            return res.json(departments.rows)
        } catch (error) {
            console.error("Ошибка при получении отделов:", error)
            return res.status(500).json({ message: "Ошибка сервера" })
        }
    }
}

module.exports = new DepartmentsController();
