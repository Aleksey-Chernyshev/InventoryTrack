const db = require("../db")

class DevicesController {

    async createDevice(req, res){
        const {
            device_name,
            device_type_name,
            device_inventory_number,
            device_serial_number,
            device_model,
            printer_format,
            printer_color,
            printer_cartridge,
            monoblock_os,
            monoblock_cpu,
            monoblock_cpu_frequency,
            monoblock_ram
          } = req.body;
      
          try {

            const typeResult = await db.query(
              'SELECT device_type_id FROM device_types WHERE device_type_name = $1',
              [device_type_name]
            );
      
            if (typeResult.rows.length === 0) {
              return res.status(400).json({ message: 'Неверный тип устройства' });
            }
      
            const device_type_id = typeResult.rows[0].device_type_id;
      
            const deviceResult = await db.query(
              `INSERT INTO devices (
                device_name,
                device_type_id,
                device_inventory_number,
                device_serial_number,
                device_model
              ) VALUES ($1, $2, $3, $4, $5)
              RETURNING device_id`,
              [
                device_name,
                device_type_id,
                device_inventory_number,
                device_serial_number,
                device_model
              ]
            );
      
            const device_id = deviceResult.rows[0].device_id;
      
            if (device_type_name === 'Принтер') {
              await db.query(
                `INSERT INTO printers (
                  device_id,
                  printer_format,
                  printer_color,
                  printer_cartridge
                ) VALUES ($1, $2, $3, $4)`,
                [device_id, printer_format, printer_color, printer_cartridge]
              );
            } else if (device_type_name === 'Моноблок') {
              await db.query(
                `INSERT INTO monoblocks (
                  device_id,
                  monoblock_os,
                  monoblock_cpu,
                  monoblock_cpu_frequency,
                  monoblock_ram
                ) VALUES ($1, $2, $3, $4, $5)`,
                [
                  device_id,
                  monoblock_os,
                  monoblock_cpu,
                  monoblock_cpu_frequency,
                  monoblock_ram
                ]
              );
            }
      
            return res.status(201).json({ message: 'Устройство создано', device_id });
          } catch (error) {
            console.error('Ошибка при создании устройства:', error);
            return res.status(500).json({ message: 'Ошибка сервера' });
          }
        
    }


    async getDevices(req, res) {
        try {
            const devices = await db.query(`
                SELECT 
                d.device_id, 
                latest_location.to_department_id AS from_department_id,
                d.device_name, 
                dt.device_type_name, 
                d.device_inventory_number, 
                d.device_serial_number, 
                d.device_model, 
                d.device_date_commissioning, 
                d.device_status,

                p.printer_format, 
                p.printer_color, 
                p.printer_cartridge,

                m.monoblock_os, 
                m.monoblock_cpu, 
                m.monoblock_cpu_frequency, 
                m.monoblock_ram,

                latest_location.to_department_id,
                latest_location.department_name,
                latest_location.subdiv_name,
                latest_location.subdiv_id

                FROM devices d
                JOIN device_types dt ON d.device_type_id = dt.device_type_id
                LEFT JOIN printers p ON d.device_id = p.device_id
                LEFT JOIN monoblocks m ON d.device_id = m.device_id

                LEFT JOIN LATERAL (
                    SELECT 
                        dl.to_department_id,
                        dep.department_name,
                        s.subdiv_name, 
                        s.subdiv_id
                    FROM device_location dl
                    JOIN departments dep ON dep.department_id = dl.to_department_id
                    JOIN subdivisions s ON s.subdiv_id = dep.department_type
                    WHERE dl.device_id = d.device_id
                    ORDER BY dl.moved_at DESC
                    LIMIT 1
                ) AS latest_location ON true
            `);
            res.json(devices.rows)
        } catch (error) {
            console.error("Ошибка при получении списка устройств:", error)
            res.status(500).json({ message: "Ошибка сервера" })
        }
    }

    async getDeviceById(req, res) {
        try {
            const { id } = req.params;
            const device = await db.query(`
                SELECT 
                    d.device_id, 
                    d.device_name, 
                    dt.device_type_name, 
                    d.device_inventory_number, 
                    d.device_serial_number, 
                    d.device_model, 
                    d.device_date_commissioning, 
                    d.device_status,
                    p.printer_format, 
                    p.printer_color, 
                    p.printer_cartridge,
                    m.monoblock_os, 
                    m.monoblock_cpu, 
                    m.monoblock_cpu_frequency, 
                    m.monoblock_ram
                FROM devices d
                JOIN device_types dt ON d.device_type_id = dt.device_type_id
                LEFT JOIN printers p ON d.device_id = p.device_id
                LEFT JOIN monoblocks m ON d.device_id = m.device_id
                WHERE d.device_id = $1
            `, [id])

            if (device.rows.length === 0) {
                return res.status(404).json({ message: "Устройство не найдено" })
            }

            res.json(device.rows[0])
        } catch (error) {
            console.error("Ошибка при получении информации об устройстве:", error)
            res.status(500).json({ message: "Ошибка сервера" })
        }
    }

    async updateDevice(req, res){
        try {
            const {id} = req.params;
            const deviceData = req.body;

            const deviceCheck = await db.query('SELECT * FROM devices WHERE device_id = $1', [id]);
            if (deviceCheck.rowCount === 0) {
                return res.status(404).json({ message: 'Устройство не найдено' });
            }
            
            const { device_status, device_type_name } = deviceData;

            if (device_status) {
                await db.query(
                    `UPDATE devices SET device_status = $1 WHERE device_id = $2`,
                    [device_status, id]
                );
            }
            if (device_type_name === "Принтер") {
                const { printer_format, printer_color, printer_cartridge } = deviceData;
                await db.query(
                    `UPDATE printers SET 
                        printer_format = $1, 
                        printer_color = $2, 
                        printer_cartridge = $3 
                    WHERE device_id = $4`,
                    [printer_format, printer_color, printer_cartridge, id]
                );
            } else if (device_type_name === "Моноблок") {
                const { monoblock_os, monoblock_cpu, monoblock_cpu_frequency, monoblock_ram } = deviceData;
                await db.query(
                    `UPDATE monoblocks SET 
                        monoblock_os = $1, 
                        monoblock_cpu = $2, 
                        monoblock_cpu_frequency = $3, 
                        monoblock_ram = $4 
                    WHERE device_id = $5`,
                    [monoblock_os, monoblock_cpu, monoblock_cpu_frequency, monoblock_ram, id]
                );
            }

            return res.status(200).json({ message: "Устройство успешно обновлено" });
        } catch (error) {
            console.error("Ошибка при обновлении устройства:", error);
            return res.status(500).json({ message: "Ошибка сервера" });
        }
    }




    async deleteDevice(req, res){
        const { id } = req.params

        try {

            const deviceCheck = await db.query('SELECT * FROM devices WHERE device_id = $1', [id])

            if (deviceCheck.rowCount === 0) {
            return res.status(404).json({ message: 'Устройство не найдено' })
            }

            await db.query(
            'UPDATE devices SET device_status = $1 WHERE device_id = $2',
            ['Неактивен', id]
            )

            return res.status(200).json({ message: 'Устройство успешно удалено' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Ошибка при удалении устройства' });
        }
    }


    async getDevicesDistributionByType(req, res) {
      try {
        const result = await db.query(`
          SELECT dt.device_type_name, COUNT(d.device_id) AS count
          FROM device_types dt
          LEFT JOIN devices d ON dt.device_type_id = d.device_type_id
          GROUP BY dt.device_type_name
        `);
        res.json(result.rows);
      } catch (error) {
        console.error("Ошибка при получении распределения устройств по типам:", error);
        res.status(500).json({ message: "Ошибка сервера" });
      }
    }
    async getDevicesDistributionBySubdiv(req, res) {
      try {
        const result = await db.query(`
          SELECT s.subdiv_name, COUNT(dl.device_id) AS total
          FROM device_location dl
          JOIN departments dpt ON dl.to_department_id = dpt.department_id
          JOIN subdivisions s ON dpt.department_type = s.subdiv_id
          GROUP BY s.subdiv_name
          ORDER BY total DESC;
        `);
  
        // Отправляем результат в ответе
        return res.json(result.rows);
      } catch (error) {
        console.error("Error fetching devices distribution by subdiv:", error);
        return res.status(500).json({ error: "Ошибка при получении данных." });
      }
    }

    async getMoveDevices(req, res) {
      try {
        const result = await db.query(`
          SELECT 
              DATE(moved_at) AS date,
              COUNT(*) AS moves
          FROM device_location
          GROUP BY date
          ORDER BY date ASC
        `);
  
        return res.json(result.rows);
      } catch (error) {
        console.error("Error fetching move devices:", error);
        return res.status(500).json({ error: "Ошибка при получении данных." });
      }
    }

    
}

module.exports = new DevicesController()
