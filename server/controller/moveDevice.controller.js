const db = require("../db")

class MoveDeviceController {

    async createMoveDevice(req,res) {
        const { device_id, from_department_id, to_department_id, moved_by_user } = req.body;

    if (!device_id || !to_department_id || !moved_by_user) {
        return res.status(400).json({ message: "Некорректные данные для перемещения устройства" });
    }

    try {
        await db.query(`
            INSERT INTO device_location (device_id, from_department_id, to_department_id, moved_at, moved_by_user)
            VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
        `, [device_id, from_department_id, to_department_id, moved_by_user]);

        return res.status(200).json({ message: "Устройство перемещено успешно" });
    } catch (error) {
        console.error("Ошибка при перемещении устройства:", error);
        return res.status(500).json({ message: "Ошибка сервера" });
    }
    }
}


module.exports = new MoveDeviceController()