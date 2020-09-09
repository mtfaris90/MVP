const { Pool } = require('pg');
const pool = new Pool({
  database: 'groceries',
  host: 'localhost',
  user: 'postgres',
  port: 5432,
});

module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  }
}