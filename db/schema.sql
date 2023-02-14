DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

USE library_db;

-- CREATE TABLE userInfo(
--     id INT NOT NULL,
--     userName VARCHAR(30) NOT NULL,
--     email VARCHAR(30) NOT NULL,
--     userPassword VARCHAR(30) NOT NULL
--     data_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );

-- CREATE TABLE bookInfo(
--     id INT NOT NULL,
--     title VARCHAR(50) NOT NULL,
--     author VARCHAR(30) NOT NULL,
--     isbn INT NOT NULL,
--     pages INT NOT NULL,
--     readerID INT NOT NULL,
--     data_updated DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
-- );

-- Creating a databade to get suggestions from 7k books DATABASE
-- CREATE TABLE suggestion(
--     id INT NOT NULL,
--     title VARCHAR(50) NOT NULL,

-- );