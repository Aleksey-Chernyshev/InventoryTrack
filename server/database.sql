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
INSERT INTO subdivisions (subdiv_name, subdiv_address, subdiv_position)
VALUES 
('Транснефть-Верхняя Волга','Гранитный переулок, 4А, Нижний Новгород', ARRAY[56.314876338684925, 44.003520566551366]);