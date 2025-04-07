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
    from_subdiv_id INT REFERENCES subdivisions(subdiv_id) ON DELETE SET NULL,
    to_subdiv_id INT NOT NULL REFERENCES subdivisions(subdiv_id) ON DELETE CASCADE,
    moved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    moved_by_user INT NOT NULL REFERENCES users(user_id) ON DELETE SET NULL
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