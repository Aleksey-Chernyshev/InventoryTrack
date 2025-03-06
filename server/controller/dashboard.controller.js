class DashboardController {
    async dashboard(req, res) {
        try {
            const user = await db.query("SELECT user_name FROM users WHERE user_id = $1", [req.user.id]);
            res.json(user.rows[0]);
        } catch (err) {
            console.error(err.message);
            res.status(500).json("Server Error");
        }
    }

    async adminDashboard(req, res) {
        try {
            const users = await db.query("SELECT user_id, user_name, user_email, role FROM users");
            res.json(users.rows);
        } catch (err) {
            console.error(err.message);
            res.status(500).json("Server Error");
        }
    }
}

module.exports = new DashboardController;