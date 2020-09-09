create database groceries;

drop table if exists lists;

CREATE TABLE lists (
 id SERIAL,
 owner VARCHAR NOT NULL DEFAULT 'NULL',
 items varchar[],
 created_at VARCHAR NOT NULL DEFAULT 'NULL'
);