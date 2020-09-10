const { Client } = require("pg");

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgresql://postgres@:5432/groceries",
  ssl: process.env.DATABASE_URL ? true : false,
});

client.connect();

module.exports = {
  query: (text, params) => {
    return client.query(text, params);
  },
};
