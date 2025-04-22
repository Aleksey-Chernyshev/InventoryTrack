const db = require('../db');
const bcrypt = require('bcrypt');

class PasswordController {
    async requestChange(req, res) {
      const { id } = req.user;
      const { newPassword } = req.body;
      
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Запрос смены пароля от пользователя:", req.user);
      await db.query(
        `INSERT INTO password_change_requests (user_id, new_password) VALUES ($1, $2)`,
        [id, hashedPassword]
      );
  
      res.json({ message: "Запрос на смену пароля отправлен" });
    }
    
    async changeOwnPassword(req, res) {
      const { id } = req.user;  // Получаем ID пользователя (администратора)
      const { newPassword } = req.body;  // Получаем новый пароль

      // Хешируем новый пароль
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Обновляем пароль в базе данных
      await db.query(
        `UPDATE users SET user_password = $1 WHERE user_id = $2`,
        [hashedPassword, id]
      );

      res.json({ message: "Пароль успешно изменен" });
    }

    async getRequests(req, res) {
      const requests = await db.query(
        `SELECT r.id, r.user_id, u.user_name, u.user_email, r.new_password, r.status, r.created_at 
        FROM password_change_requests r
        JOIN users u ON u.user_id = r.user_id
        ORDER BY r.created_at DESC`
      );
      res.json(requests.rows);
    }
    
  
    async approveRequest(req, res) {
      const { id } = req.params;
  
      const request = await db.query(
        `SELECT * FROM password_change_requests WHERE id = $1`, [id]
      );
      if (!request.rows[0]) return res.status(404).json({ message: "Запрос не найден" });
  
      const { user_id, new_password } = request.rows[0];
  
      await db.query(`UPDATE users SET user_password = $1 WHERE user_id = $2`, [new_password, user_id]);
      await db.query(`UPDATE password_change_requests SET status = 'approved' WHERE id = $1`, [id]);
  
      res.json({ message: "Пароль обновлён" });
    }
  
    async rejectRequest(req, res) {
      const { id } = req.params;
      await db.query(`UPDATE password_change_requests SET status = 'rejected' WHERE id = $1`, [id]);
      res.json({ message: "Запрос отклонён" });
    }
  }
module.exports = new PasswordController();