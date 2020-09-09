const express = require("express");
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static(path.join(__dirname, './dist')));

app.use("/", (req, res) => {
  res.send("You have reached the MVP!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
