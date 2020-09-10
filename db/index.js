const { Client } = require("pg");

const variable = process.env.DATABASE_URL ? {
  rejectUnauthorized: false
} : false

const client = new Client({
  connectionString:
    process.env.DATABASE_URL || "postgresql://postgres@:5432/groceries",
    ssl: variable,
});

client.connect();

module.exports = {
  query: (text, params) => {
    return client.query(text, params);
  },
};
