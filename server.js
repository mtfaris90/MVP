const express = require("express");
const app = express();
const path = require("path");
const port = 3000;
const controllers = require("./controllers");
const bodyParser = require("body-parser");

app.use(express.static(path.join(__dirname, "./dist")));
app.use(bodyParser.json());

app.get("/list/:owner", controllers.getItems);
app.post("/list/:owner", controllers.postItem);
app.delete("/list/:owner", controllers.removeItem);
app.use("/", (req, res) => {
  res.send("You have reached the MVP!");
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
