const pool = require("../db");

module.exports = {
  readList: (owner) => {
    console.log("trigerred models.readList");
    return pool.query("SELECT items FROM lists WHERE owner = $1", [owner]);
  },
  writeItem: (item, owner) => {
    console.log("trigerred models.writeItem");
    return pool.query(
      "UPDATE lists SET items = array_append(items, $1) WHERE owner = $2;",
      [item, owner]
    );
  },
  deleteItem: (item, owner) => {
    console.log("trigerred models.deleteItem");
    return pool.query(
      "UPDATE lists SET items = array_remove(items, $1) where owner = $2;",
      [item, owner]
    );
  },
  createList: (owner) => {
    console.log("trigerred models.createList");
    function getFormattedDate(date) {
      var year = date.getFullYear();
      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;
      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;
      return month + '/' + day + '/' + year;
    };
    const dateStr = getFormattedDate(new Date());
    return pool.query(
      "insert into lists values (default, $1, ARRAY[]::varchar[], $2);",
      [owner, dateStr]
    );
  },
};
