const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwtGenerator = ({ id, name, role }) => {
    const payload = {
        user: { id, name, role }
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = jwtGenerator;
