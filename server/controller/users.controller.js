const db = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');

class UserController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await db.query("SELECT * FROM users WHERE user_email = $1", [email]);
            if (user.rows.length > 0) {
                throw new Error("Пользователь уже существует")
            }

            const salt = await bcrypt.genSalt(10);
            const bcryptPassword = await bcrypt.hash(password, salt);

            const userRole = "user";

            const newUser = await db.query(
                "INSERT INTO users (user_name, user_email, user_password, role) VALUES($1, $2, $3, $4) RETURNING *",
                [name, email, bcryptPassword, userRole]
            );

            // Передаём name в jwtGenerator
            const token = jwtGenerator({ id: newUser.rows[0].user_id, name: newUser.rows[0].user_name, role: newUser.rows[0].role });
            return res.json({ token });

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const user = await db.query("SELECT * FROM users WHERE user_email = $1", [email]);
    
            if (user.rows.length === 0) {
                return res.status(401).json("Пароль или почта введены неверно");
            }
    
            const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
            if (!validPassword) {
                return res.status(401).json("Пароль или почта введены неверно");
            }
    
            const token = jwtGenerator({ id: user.rows[0].user_id, name: user.rows[0].user_name, role: user.rows[0].role });
    
            return res.json({ token, role: user.rows[0].role, name: user.rows[0].user_name, id: user.rows[0].user_id }); 
    
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
    

    async isVerifyUser(req, res) {
        try {
            res.json({ role: req.user.role, name: req.user.name, id: req.user.id});
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Server Error");
        }
    }
    

    async getUsers(req, res){
        try {
            const users = await db.query(`SELECT * FROM users`)
            res.json(users.rows)
        } catch (error) {
            console.error(error.message)
        }
    }

    async deleteUser(req, res){
        try {
            const id = req.params.id
            const user = await db.query(`DELETE FROM users WHERE user_id = $1`, [id])
            res.json(user.rows[0])
        } catch (error) {
            console.error(error.message)
            
        }
       
    }

    async updateUser(req, res){
        try {
            const {id} = req.params
            const {name, email, password} = req.body

            const user = await db.query(`SELECT * FROM users WHERE user_id = $1`, [id])
            if(user.rows.length === 0){
                return res.status(404).json({message: "Пользователь не найден"})
            }

            if(email && email !== user.rows[0].user_email){
                const emailExist = await db.query(`SELECT * FROM users WHERE user_email = $1`, [email])
                if(emailExist.rows.length > 0){
                    return res.status(400).json({message: "Этот email уже занят"})
                }
            }
            let hashedPassword = user.rows[0].user_password
            if(password){
                const salt = await bcrypt.genSalt(10)
                hashedPassword = await bcrypt.hash(password, salt)
            }

            console.log("Обновленные данные:", { name, email, hashedPassword });
            const updatedUser = await db.query(
                `UPDATE users SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4 RETURNING *`,
                [name || user.rows[0].user_name, email || user.rows[0].user_email, hashedPassword, id]
            )
            return res.json({
                user: updatedUser.rows[0],
                message: "Данные пользователя обновлены успешно"
            })



        } catch (error) {
            console.error(error.message)
            res.status(500).send("Ошибка сервера")
        }

    }

    // async adminDashboard(req, res) {
    //     try {
    //         res.json({ message: "Добро пожаловать в панель администратора!" });
    //     } catch (error) {
    //         console.error(error.message);
    //         res.status(500).send("Server Error");
    //     }
    // }
}

module.exports = new UserController();