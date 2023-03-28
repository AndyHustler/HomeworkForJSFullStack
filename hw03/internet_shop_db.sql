DROP TABLE IF EXISTS Brands CASCADE;
CREATE TABLE Brands (
	id SERIAL PRIMARY KEY,
	brand_name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS Country CASCADE;
CREATE TABLE Country (
	id SERIAL PRIMARY KEY,
	country_name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS City CASCADE;
CREATE TABLE City (
	id SERIAL PRIMARY KEY,
	city_name VARCHAR(50) NOT NULL UNIQUE
);

DROP TABLE IF EXISTS Clients CASCADE;
CREATE TABLE Clients (
	id SERIAL PRIMARY KEY,
	client_name VARCHAR(50) NOT NULL UNIQUE,
	phone VARCHAR(20) NULL UNIQUE
);

DROP TABLE IF EXISTS Category CASCADE;
CREATE TABLE Category (
	id SERIAL PRIMARY KEY,
	Category_name VARCHAR(50) NOT NULL UNIQUE,
	sub_ategory_name VARCHAR(50) NULL UNIQUE,
	sub_sub_category_name VARCHAR(50) NULL UNIQUE
);

DROP TABLE IF EXISTS Product CASCADE;
CREATE TABLE Product (
	id SERIAL PRIMARY KEY,
	category_id INT NOT NULL,
	model_name VARCHAR(50) NOT NULL UNIQUE,
	description TEXT NULL,
	articul VARCHAR(20) NOT NULL UNIQUE,
	price INT NOT NULL,
	opt_price INT NOT NULL,
	brand_id INT NULL,
	country_id INT NULL,
	picture_file_name VARCHAR(100) NULL,
	FOREIGN KEY (category_id) REFERENCES Category (id),
	FOREIGN KEY (brand_id) REFERENCES Brands (id),
	FOREIGN KEY (country_id) REFERENCES Country (id)
);

DROP TABLE IF EXISTS Catalog_attribute CASCADE;
CREATE TABLE Catalog_attribute (
	id SERIAL PRIMARY KEY,
	attribute_name VARCHAR(50) NOT NULL UNIQUE,
	attribute_description TEXT NULL,
	category_id INT NOT NULL,
	picture_file_name VARCHAR(100) NULL,
	FOREIGN KEY (category_id) REFERENCES Category (id)
);

DROP TABLE IF EXISTS Values_tab CASCADE;
CREATE TABLE Values_tab (
	id SERIAL PRIMARY KEY,
	value_text VARCHAR(100) NULL,
	value_boolean BOOLEAN NULL,
	value_integer INT NULL,
	value_float FLOAT NULL,
	value_date TIMESTAMP NULL,
	attribute_id INT NOT NULL,
	product_id INT NOT NULL,
	FOREIGN KEY (attribute_id) REFERENCES Catalog_attribute (id),
	FOREIGN KEY (product_id) REFERENCES Product (id)
);

DROP TABLE IF EXISTS Punkt_vidachi CASCADE;
CREATE TABLE Punkt_vidachi (
	id SERIAL PRIMARY KEY,
	punkt_vidachi_name VARCHAR(50) NOT NULL UNIQUE,
	city_id INT NULL,
	strit VARCHAR(50) NULL,
	phone VARCHAR(20) NULL,
	manager VARCHAR(50) NOT NULL,
	FOREIGN KEY (city_id) REFERENCES City (id)
);

DROP TABLE IF EXISTS Status CASCADE;
CREATE TABLE Status (
	id SERIAL PRIMARY KEY,
	status_name VARCHAR(30) NOT NULL UNIQUE,
	description TEXT NULL
);

DROP TABLE IF EXISTS Orders CASCADE;
CREATE TABLE Orders (
	id SERIAL PRIMARY KEY,
	client_id INT NOT NULL,
	order_date DATE NOT NULL,
	punkt_vidachi_id INT NOT NULL,
	status_id INT NOT NULL,
	FOREIGN KEY (client_id) REFERENCES Clients (id),
	FOREIGN KEY (punkt_vidachi_id) REFERENCES Punkt_vidachi (id),
	FOREIGN KEY (status_id) REFERENCES Status (id)
);

DROP TABLE IF EXISTS Orders_details CASCADE;
CREATE TABLE Orders_details (
	id SERIAL PRIMARY KEY,
	order_id INT NOT NULL,
	product_id INT NOT NULL,
	quantity INT NOT NULL,
	FOREIGN KEY (order_id) REFERENCES Orders (id),
	FOREIGN KEY (product_id) REFERENCES Product (id)
);

DROP TABLE IF EXISTS Stock CASCADE;
CREATE TABLE Stock (
	id SERIAL PRIMARY KEY,
	stock_name VARCHAR(50) NOT NULL UNIQUE,
	city_id INT NULL,
	strit VARCHAR(50) NULL,
	phone VARCHAR(20) NULL,
	manager VARCHAR(50) NOT NULL,
	FOREIGN KEY (city_id) REFERENCES City (id)
);

DROP TABLE IF EXISTS Provider CASCADE;
CREATE TABLE Provider (
	id SERIAL PRIMARY KEY,
	provider_name VARCHAR(50) NOT NULL UNIQUE,
	country_id INT NULL,
	city_id INT NULL,
	strit VARCHAR(50) NULL,
	phone VARCHAR(20) NULL,
	manager VARCHAR(50) NOT NULL,
	FOREIGN KEY (city_id) REFERENCES City (id),
	FOREIGN KEY (country_id) REFERENCES Country (id)
);

DROP TABLE IF EXISTS Stock_availability CASCADE;
CREATE TABLE Stock_availability (
	id SERIAL PRIMARY KEY,
	product_id INT NOT NULL,
	stock_id INT NOT NULL,
	provider_id INT NOT NULL,
	FOREIGN KEY (product_id) REFERENCES Product (id),
	FOREIGN KEY (stock_id) REFERENCES Stock (id),
	FOREIGN KEY (provider_id) REFERENCES Provider (id)
);

INSERT INTO Status (status_name)
VALUES
('Простаивает'),
('Взят в работу'),
('Отправлен в пункт выдачи'),
('Ожидает в пункте выдачи'),
('Завершен');

INSERT INTO Country (country_name)
VALUES
('Россия'),
('Китай'),
('Япония'),
('Белорусия'),
('Италия'),
('Франция'),
('Казахстан'),
('США'),
('Южная Корея');
