const pool = require("../db");

module.exports = {
  readList: (owner) => {
    console.log('trigerred models.readList');
    return pool.query("SELECT items FROM lists WHERE owner = $1", [owner]);
  },
  writeItem: (item, owner) => {
    console.log('trigerred models.writeItem');
    return pool.query(
      "UPDATE lists SET items = array_append(items, $1) WHERE owner = $2;",
      [item, owner]
    );
  },
};
