CREATE DATABASE inventory;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

CREATE TABLE subdivisions(
    subdiv_id SERIAL PRIMARY KEY,
    subdiv_name VARCHAR(255) NOT NULL,
    subdiv_address VARCHAR(255) NOT NULL,
    subdiv_position FLOAT8[]

);
CREATE TABLE departments (
    department_id SERIAL PRIMARY KEY,  
    department_name VARCHAR(255) NOT NULL,         
    department_location VARCHAR(255) NOT NULL,              
    department_type INTEGER,                                             
    FOREIGN KEY (department_type) REFERENCES subdivisions(subdiv_id)  
);


CREATE TABLE device_types (
    device_type_id SERIAL PRIMARY KEY,
    device_type_name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE devices (
    device_id SERIAL PRIMARY KEY,
    device_name VARCHAR(255) NOT NULL,
    device_type_id INT NOT NULL REFERENCES device_types(device_type_id) ON DELETE RESTRICT,
    device_inventory_number VARCHAR(100) UNIQUE NOT NULL,
    device_serial_number VARCHAR(100) UNIQUE NOT NULL,
    device_model VARCHAR(255),
    device_date_commissioning DATE,
    device_status VARCHAR(50) 
);

CREATE TABLE printers (
    printer_id SERIAL PRIMARY KEY,
    device_id INT UNIQUE NOT NULL REFERENCES devices(device_id) ON DELETE CASCADE,
    printer_format VARCHAR(50) NOT NULL, 
    printer_color BOOLEAN NOT NULL, 
    printer_cartridge VARCHAR(255) 
);


CREATE TABLE monoblocks (
    monoblock_id SERIAL PRIMARY KEY,
    device_id INT UNIQUE NOT NULL REFERENCES devices(device_id) ON DELETE CASCADE,
    monoblock_os VARCHAR(100) NOT NULL,
    monoblock_cpu VARCHAR(255) NOT NULL,
    monoblock_cpu_frequency DECIMAL(5,2) NOT NULL, 
    monoblock_ram INTEGER NOT NULL 
);



CREATE TABLE device_location (
    location_id SERIAL PRIMARY KEY,
    device_id INT NOT NULL REFERENCES devices(device_id) ON DELETE CASCADE,
    from_department_id INT REFERENCES departments(department_id) ON DELETE SET NULL,  
    to_department_id INT NOT NULL REFERENCES departments(department_id) ON DELETE CASCADE, 
    moved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moved_by_user INT REFERENCES users(user_id) ON DELETE SET NULL
);


INSERT INTO subdivisions (subdiv_name, subdiv_address, subdiv_position)
VALUES 
('Транснефть-Верхняя Волга','Гранитный переулок, 4А, Нижний Новгород', ARRAY[56.314876338684925, 44.003520566551366]);
INSERT INTO departments (department_name, department_location, department_type)
VALUES ('Отдел информационных технологий', '1 этаж 101 кабинет', 1);


INSERT INTO device_types (device_type_name)
VALUES
    ('Принтер'),
    ('МФУ'),
    ('Моноблок');

INSERT INTO devices (device_name, device_type_id, device_inventory_number, device_serial_number, device_model, device_date_commissioning)
VALUES ('Printer HP', 1, 'INV12345', 'SN12345678', 'HP LaserJet', '2023-01-15');
INSERT INTO printers (device_id, printer_format, printer_color, printer_cartridge)
VALUES (1, 'A4', true, 'HP 85A');



INSERT INTO devices (device_name, device_type_id, device_inventory_number, device_serial_number, device_model, device_date_commissioning)
VALUES ('Monoblock Acer', 3, 'INV54321', 'SN12398765', 'Acer Aspire', '2023-04-01');
INSERT INTO monoblocks (device_id, monoblock_os, monoblock_cpu, monoblock_cpu_frequency, monoblock_ram)
VALUES (2, 'Windows 10', 'Intel i5', 3.6, 8);





INSERT INTO device_locations (device_id, subdiv_id, assigned_by_user)
VALUES (1, 1, 7);


INSERT INTO devices (
  device_name, 
  device_type_id, 
  device_inventory_number, 
  device_serial_number, 
  device_model, 
  device_date_commissioning, 
  device_status
)
VALUES
('HP LaserJet 1010', 1, 'INV001', 'SN001', 'HP LaserJet 1010', '2022-01-15', 'Активен'),
('Canon LBP6030', 1, 'INV002', 'SN002', 'Canon LBP6030', '2022-02-10', 'В ремонте'),
('Epson L120', 1, 'INV003', 'SN003', 'Epson L120', '2022-03-12', 'Активен'),
('Brother HL-1210', 1, 'INV004', 'SN004', 'Brother HL-1210', '2021-11-25', 'Активен'),
('Samsung ML-2160', 1, 'INV005', 'SN005', 'Samsung ML-2160', '2021-09-05', 'В ремонте'),
('Xerox Phaser 3020', 1, 'INV006', 'SN006', 'Xerox Phaser 3020', '2023-01-18', 'Активен'),
('Ricoh SP 111', 1, 'INV007', 'SN007', 'Ricoh SP 111', '2022-06-30', 'Активен'),
('Kyocera FS-1040', 1, 'INV008', 'SN008', 'Kyocera FS-1040', '2020-12-01', 'Активен'),
('Pantum P2200', 1, 'INV009', 'SN009', 'Pantum P2200', '2023-04-10', 'Активен'),
('OKI B432dn', 1, 'INV010', 'SN010', 'OKI B432dn', '2022-08-20', 'В ремонте'),
('HP LaserJet M1132', 2, 'INV011', 'SN011', 'HP M1132', '2022-02-15', 'Активен'),
('Canon MF3010', 2, 'INV012', 'SN012', 'Canon MF3010', '2021-05-10', 'В ремонте'),
('Epson L3150', 2, 'INV013', 'SN013', 'Epson L3150', '2022-11-12', 'Активен'),
('Brother DCP-1510', 2, 'INV014', 'SN014', 'Brother DCP-1510', '2021-10-05', 'Активен'),
('Samsung SCX-3400', 2, 'INV015', 'SN015', 'Samsung SCX-3400', '2023-01-25', 'В ремонте'),
('Xerox WorkCentre 3025', 2, 'INV016', 'SN016', 'Xerox 3025', '2021-12-18', 'Активен'),
('Ricoh SP 210SF', 2, 'INV017', 'SN017', 'Ricoh SP 210SF', '2020-08-30', 'В ремонте'),
('Kyocera M2040dn', 2, 'INV018', 'SN018', 'Kyocera M2040dn', '2022-04-01', 'Активен'),
('Pantum M6550NW', 2, 'INV019', 'SN019', 'Pantum M6550NW', '2023-03-10', 'В ремонте'),
('OKI MC363dn', 2, 'INV020', 'SN020', 'OKI MC363dn', '2023-06-22', 'Активен'),
('HP ProOne 400', 3, 'INV021', 'SN021', 'HP ProOne 400', '2022-07-15', 'Активен'),
('Lenovo AIO 3', 3, 'INV022', 'SN022', 'Lenovo AIO 3', '2022-09-10', 'В ремонте'),
('Dell Inspiron 24', 3, 'INV023', 'SN023', 'Dell Inspiron 24', '2022-10-12', 'Активен'),
('ASUS V241', 3, 'INV024', 'SN024', 'ASUS V241', '2021-07-25', 'Активен'),
('Acer Aspire C24', 3, 'INV025', 'SN025', 'Acer Aspire C24', '2023-01-05', 'В ремонте'),
('MSI Pro 24X', 3, 'INV026', 'SN026', 'MSI Pro 24X', '2023-02-18', 'Активен'),
('Apple iMac 24"', 3, 'INV027', 'SN027', 'iMac 24"', '2021-10-30', 'Активен'),
('HP EliteOne 800', 3, 'INV028', 'SN028', 'HP EliteOne 800', '2022-03-01', 'В ремонте'),
('Lenovo ThinkCentre M90a', 3, 'INV029', 'SN029', 'Lenovo M90a', '2023-04-12', 'Активен'),
('Dell OptiPlex 7480', 3, 'INV030', 'SN030', 'Dell OptiPlex 7480', '2023-05-05', 'Активен');













INSERT INTO departments (department_name, department_location, department_type)
VALUES
('Отдел метрологии', '3 этаж (№311)', 1),
('Отдел информационной безопасности', '2 этаж (№201)', 1),
('Административно-хозяйственный отдел', '2 этаж (№206)', 2),
('Отдел промышленной безопасности', '1 этаж (№104)', 2),
('Отдел информационных технологий', '1 этаж (№105)', 3),
('Административно-хозяйственный отдел', '2 этаж (№207)', 3),
('Отдел метрологии', '3 этаж (№313)', 3),
('Отдел промышленной безопасности', '1 этаж (№106)', 3),
('Отдел информационной безопасности', '2 этаж (№203)', 3),
('Отдел информационных технологий', '1 этаж (№107)', 4),
('Административно-хозяйственный отдел', '2 этаж (№208)', 4),
('Отдел метрологии', '3 этаж (№314)', 4),
('Отдел промышленной безопасности', '1 этаж (№108)', 4),
('Отдел информационной безопасности', '2 этаж (№204)', 4),
('Отдел информационных технологий', '1 этаж (№109)', 5),
('Административно-хозяйственный отдел', '2 этаж (№209)', 5),
('Отдел метрологии', '3 этаж (№315)', 5),
('Отдел промышленной безопасности', '1 этаж (№110)', 5),
('Отдел информационной безопасности', '2 этаж (№205)', 5),
('Отдел информационных технологий', '1 этаж (№111)', 6),
('Административно-хозяйственный отдел', '2 этаж (№210)', 6),
('Отдел метрологии', '3 этаж (№316)', 6),
('Отдел промышленной безопасности', '1 этаж (№112)', 6),
('Отдел информационной безопасности', '2 этаж (№206)', 6),
('Отдел информационных технологий', '1 этаж (№113)', 7),
('Административно-хозяйственный отдел', '2 этаж (№211)', 7),
('Отдел метрологии', '3 этаж (№317)', 7),
('Отдел промышленной безопасности', '1 этаж (№114)', 7),
('Отдел информационной безопасности', '2 этаж (№207)', 7),
('Отдел информационных технологий', '1 этаж (№115)', 8),
('Административно-хозяйственный отдел', '2 этаж (№212)', 8),
('Отдел метрологии', '3 этаж (№318)', 8),
('Отдел промышленной безопасности', '1 этаж (№116)', 8),
('Отдел информационной безопасности', '2 этаж (№208)', 8);

