const db = require('../db')
const bcrypt = require("bcrypt")
const jwtGenerator = require('../utils/jwtGenerator')


class UserController{
    async createUser(req, res){
        try {
            //создадим пользователя
            const {name, email, password} = req.body
            //проверка пользователя, если он существует, то ошибка
            const user = await db.query(`SELECT * FROM users WHERE user_email = $1`, [email])
            if(user.rows.length > 0) {
                return res.status(401).send("Пользователь уже существует")
            }
            //если успешно, то расшифруем пароль
            const saltRound = 10
            const salt = await bcrypt.genSalt(saltRound)

            const bcryptPassword = await bcrypt.hash(password, salt)
            //запишем нового пользователя в бд
            let newUser = await db.query(`INSERT INTO users (user_name, user_email, user_password) VALUES($1, $2, $3) RETURNING *`, [name, email, bcryptPassword])
            //res.json(newUser.rows[0])
            // генерация jwt 
            const token = jwtGenerator(newUser.rows[0].user_id);
            return res.json({ token })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error")
        }
    }

    async loginUser(req, res) {
        try {
            //разобрать запрос
            const {email, password} = req.body
            //существует ли пользователь
            const user = await db.query("SELECT * FROM users WHERE user_email = $1", [email])
            if(user.rows.length === 0){
                return res.status(401).json("Пароль или почта введены неправильно")
            }
            //если существует, то проверим ли пароль
            const validPassword = await bcrypt.compare(password, user.rows[0].user_password)
            if(!validPassword){
                return res.status(401).json("Пароль или почта введен неверно")
            }
            //выдать пользователю токен
            const token = jwtGenerator(user.rows[0].user_id)
            return res.json({ token })
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error")
        }
    }

    async isVerifyUser(req,res) {
        try {
            res.json(true)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("Server Error")
        }
    }
}


module.exports = new UserController