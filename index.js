const express = require("express");
const sqldb = require("./darcy_db");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  sqldb.run("INSERT INTO eslint (key, value) VALUES ('testing', 'testing')");
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
