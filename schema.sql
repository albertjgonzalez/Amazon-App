CREATE DATABASE bamazon_DB;
USE bamazon_DB;
CREATE TABLE products(
 id INT AUTO_INCREMENT NOT NULL,
 product_name VARCHAR(100) NOT NULL,
 department_name VARCHAR(100) NOT NULL,
 price DECIMAL(10,4) NOT NULL,
 stock_quanity INT(10) NOT NULL,
 PRIMARY KEY(id)
);

SELECT * FROM products;