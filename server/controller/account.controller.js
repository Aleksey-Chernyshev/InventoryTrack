const db = require('../db');

class AccountController {
  async requestDelete(req, res) {
    const { id } = req.user;

    const existingRequest = await db.query(
      `SELECT * FROM account_deletion_requests WHERE user_id = $1 AND status = 'pending'`,
      [id]
    );

    if (existingRequest.rows.length > 0) {
      return res.status(400).json({ message: "Запрос уже существует" });
    }

    await db.query(
      `INSERT INTO account_deletion_requests (user_id) VALUES ($1)`,
      [id]
    );

    res.json({ message: "Запрос на удаление отправлен" });
  }

  async getDeleteRequests(req, res) {
    const requests = await db.query(
      `SELECT dr.id, dr.user_id, dr.status, u.user_name, u.user_email, dr.created_at
       FROM account_deletion_requests dr
       JOIN users u ON dr.user_id = u.user_id
       ORDER BY dr.created_at DESC`
    );

    res.json(requests.rows);
  }

  async approveDelete(req, res) {
    const { id } = req.params;

    const request = await db.query(
      `SELECT * FROM account_deletion_requests WHERE id = $1`,
      [id]
    );

    if (!request.rows[0]) {
      return res.status(404).json({ message: "Заявка не найдена" });
    }

    const { user_id } = request.rows[0];

    await db.query(`DELETE FROM users WHERE user_id = $1`, [user_id]);
    await db.query(`UPDATE account_deletion_requests SET status = 'approved' WHERE id = $1`, [id]);

    res.json({ message: "Аккаунт удалён" });
  }

  async rejectDelete(req, res) {
    const { id } = req.params;

    await db.query(`UPDATE account_deletion_requests SET status = 'rejected' WHERE id = $1`, [id]);

    res.json({ message: "Заявка отклонена" });
  }

  async deleteOwnAccount(req, res) {
    const { id } = req.user;

    await db.query(`DELETE FROM users WHERE user_id = $1`, [id]);

    res.json({ message: "Аккаунт успешно удалён" });
  }
}

module.exports = new AccountController();