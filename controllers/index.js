const { readList, writeItem } = require("../models");

module.exports = {
  postItem: (req, res) => {
    console.log("triggered controllers.postItem w/ owner = ", req.params.owner);
    writeItem(req.body.item, req.params.owner)
      .then(() => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  getItems: (req, res) => {
    console.log("triggered controllers.getItems w/ owner = ", req.params.owner);
    readList(req.params.owner)
      .then((result) => {
        // console.log(result.rows);
        res.send(result.rows[0].items);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
};
