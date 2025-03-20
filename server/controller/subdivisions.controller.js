const db = require('../db');


class SubdivisionsController {
    async getSubdivisions(req, res) {
        try {
            const subdiv = await db.query("SELECT subdiv_id, subdiv_name, subdiv_address, subdiv_position FROM subdivisions");
            res.json(subdiv.rows)
        } catch (err) {
            console.error(err.message);
            res.status(500).json("Server Error");
        }
    }


}

module.exports = new SubdivisionsController;