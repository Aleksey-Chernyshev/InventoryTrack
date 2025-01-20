const db = require('../db')


class DashboardController{
    async dashboard(req,res){
        try {   
            //res.json(req.user)
             const user = await db.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
             res.json(user.rows[0])
        } catch (err) {
            console.error(err.message)
            res.status(500).json("Server Error")
        }
    }
}

module.exports = new DashboardController