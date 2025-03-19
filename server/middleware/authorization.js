const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1]; // <-- Разбираем "Bearer TOKEN"
        console.log("Полученный токен:", token); // <-- Выводим токен в консоль

        if (!token) {
            return res.status(403).json({ message: "Нет доступа, токен отсутствует" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        console.log("Расшифрованный токен:", req.user); 
        next();
    } catch (err) {
        console.error("Ошибка авторизации:", err.message);
        return res.status(403).json({ message: "Токен недействителен" });
    }
};

