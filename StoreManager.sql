DROP DATABASE IF EXISTS StoreManager;
CREATE DATABASE StoreManager;
USE StoreManager;
CREATE TABLE products (
  id INT NOT NULL auto_increment,
  name VARCHAR(30) NOT NULL,
  quantity INT NOT NULL,
  PRIMARY KEY(id)
) ENGINE = INNODB;
CREATE TABLE sales (
  id INT NOT NULL auto_increment,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(id)
) ENGINE = INNODB;
CREATE TABLE sales_products (
  sale_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (sale_id) REFERENCES sales (id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
) ENGINE = INNODB;
SET
  SQL_SAFE_UPDATES = 0;
INSERT INTO
  StoreManager.products (name, quantity)
VALUES
  ('Bread', 10),
  ('Chocolate', 20),
  ('Coconut', 30),
  ('Coffee', 40),
  ('Cream', 50),
  ('Eggs', 60),
  ('Flour', 70),
  ('Milk', 80),
  ('Oil', 90),
  ('Peanut Butter', 100),
  ('Sugar', 110),
  ('Tea', 120);
INSERT INTO
  StoreManager.sales (id)
VALUES
  (1);
INSERT INTO
  StoreManager.sales_products (sale_id, product_id, quantity)
VALUES
  (1, 1, 1),
  (1, 2, 2),
  (1, 3, 3),
  (1, 4, 4),
  (1, 5, 5),
  (1, 6, 6),
  (1, 7, 7),
  (1, 8, 8),
  (1, 9, 9),
  (1, 10, 10),
  (1, 11, 11),
  (1, 12, 12);