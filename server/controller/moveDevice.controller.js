const db = require("../db")

class MoveDeviceController {
  async createMoveDevice(req, res) {
    const { device_id, from_department_id, to_department_id, moved_by_user } = req.body;

    if (!device_id || !to_department_id || !moved_by_user) {
      return res.status(400).json({ message: "Некорректные данные для перемещения устройства" });
    }

    try {
      // Получаем текущую дату ввода в эксплуатацию устройства
      const result = await db.query(
        `SELECT device_date_commissioning FROM devices WHERE device_id = $1`,
        [device_id]
      );

      const currentDate = result.rows.length > 0 ? result.rows[0].device_date_commissioning : null;

      // Если даты нет — обновим её
      if (!currentDate) {
        await db.query(
          `
          UPDATE devices 
          SET 
            device_status = 'Активен',
            device_date_commissioning = CURRENT_TIMESTAMP
          WHERE device_id = $1
        `,
          [device_id]
        );
      } else {
        // Если дата уже установлена — просто меняем статус
        await db.query(
          `
          UPDATE devices 
          SET device_status = 'Активен'
          WHERE device_id = $1
        `,
          [device_id]
        );
      }

      // Логируем перемещение
      await db.query(
        `
        INSERT INTO device_location (device_id, from_department_id, to_department_id, moved_at, moved_by_user)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4)
      `,
        [device_id, from_department_id, to_department_id, moved_by_user]
      );

      return res.status(200).json({ message: "Устройство перемещено успешно" });
    } catch (error) {
      console.error("Ошибка при перемещении устройства:", error);
      return res.status(500).json({ message: "Ошибка сервера" });
    }
  }
}

module.exports = new MoveDeviceController();
