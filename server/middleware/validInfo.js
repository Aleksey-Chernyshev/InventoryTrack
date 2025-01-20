module.exports = (req, res, next) => {
    const { email, name, password} = req.body

    function validEmail(userEmail){
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail)
    }
    if(req.path === "/register"){
        if(![email, name, password].every(Boolean)){
            return res.status(401).json("Отсутствуют учетные данные")
        } else if(!validEmail(email)){
            return res.status(401).json("Почта введена неверно")
        }
    } else if (req.path === "/login") {
        if (![email, password].every(Boolean)) {
            return res.status(401).json("Отсутствуют учетные данные")
        } else if(!validEmail(email)){
            return res.status(401).json("Почта введена неверно")
        }
    }
    next()
}