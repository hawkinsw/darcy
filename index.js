const express = require("express");
const sqldb = require("./darcy_db");
const app = express();
const port = 3000;

app.get("/api/add_rule", (req, res) => {
  const newKey = req.query.new_eslint_rule_key;
  const newValue = req.query.new_eslint_rule_value;

  console.log("new_key: " + newKey);
  console.log("new_value: " + newValue);

  res.send("Rule added.\n");
});

app.get("/api/generate_config", (req, res) => {
  let bodyResult = "";
  const stmt = sqldb.prepare("SELECT key, value from eslint");
  const results = stmt.all();
  results.forEach((row) => {
    bodyResult += row.key + ":" + row.value + " <-- wow; <br>\n";
  });
  res.send(bodyResult);
});

app.use("/ui/", express.static("html"));

app.listen(port, () => {
  console.log(`Darcy app server listening on port ${port}`);
});
