const { readList, writeItem, deleteItem, createList } = require("../models");

module.exports = {
  postItem: (req, res) => {
    console.log("triggered controllers.postItem w/ owner = ", req.params.owner);
    writeItem(req.body.item, req.body.dept, req.params.owner)
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
        res.send(result.rows[0].items);
      })
      .catch(() => {
        createList(req.params.owner)
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  },
  removeItem: (req, res) => {
    console.log(
      "triggered controllers.removeItem w/ owner = ",
      req.params.owner,
      " and item = ",
      req.query.item
    );
    deleteItem(req.query.item, req.params.owner)
      .then(() => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.error(err);
      });
  },
};
