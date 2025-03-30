const db = require('../db');


class SubdivisionsController {
    // async getSubdivisions(req, res) {
    //     try {
    //         const subdiv = await db.query("SELECT subdiv_id, subdiv_name, subdiv_address, subdiv_position FROM subdivisions");
    //         res.json(subdiv.rows)
    //     } catch (err) {
    //         console.error(err.message);
    //         res.status(500).json("Server Error");
    //     }
    // }
    async getSubdivisions(req, res) {
        try {
            const { id } = req.query
            
            let query = `
                SELECT 
                    subdiv_id, 
                    subdiv_name, 
                    subdiv_address, 
                    subdiv_position, 
                    ARRAY(
                        SELECT jsonb_build_object(
                            'department_name', department_name, 
                            'department_location', department_location
                        )
                        FROM departments 
                        WHERE department_type = subdivisions.subdiv_id
                    ) AS departments
                FROM subdivisions
            `
            
            if (id) {
                query += ` WHERE subdiv_id = $1`
            }
            
            const subdiv = await db.query(query, id ? [id] : [])
            res.json(subdiv.rows)
        } catch (err) {
            console.error(err.message);
            res.status(500).json("Server Error")
        }
    }


}

module.exports = new SubdivisionsController;