module.exports = function(role) {
    return (req, res, next) => {
        try {
            if (req.user.role !== role) {
                return res.status(403).json("Нет доступа");
            }
            next();
        } catch (err) {
            console.error(err.message);
            return res.status(403).json("Нет доступа");
        }
    };
};
