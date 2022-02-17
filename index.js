const express = require("express");
const bodyParser = require("body-parser");
const sqldb = require("./darcy_db");
const db = require("./darcy_db");
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/api/add_rule", (req, res) => {
  const newKey = req.body.new_eslint_rule_key;
  const newValue = req.body.new_eslint_rule_value;

  if (newKey === "" || newValue === "") {
    console.log(
      "Abort: Not adding a configuration with an empty key or value."
    );
    res
      .status(500)
      .send(
        "FYI: Not adding a rule because there is either an empty key or an empty value."
      );
  }

  console.log(
    `FYI: Attempting to add a new configuration with value/key: ${newKey}: ${newValue}.\n`
  );

  // TODO: Danger, danger! But, why?
  const addRuleSql = `INSERT INTO eslint (key, value) VALUES('${newKey}','${newValue}')`;
  console.log(addRuleSql);
  db.exec(addRuleSql);

  // TODO: Safer, safer!! And, why?
  // eslint-disable-next-line no-constant-condition
  if (false) {
    const addRuleStmt = sqldb.prepare("INSERT INTO eslint VALUES (?, ?);");
    if (!addRuleStmt) {
      console.log(
        "There was an error preparing the ESLint-rule-insert statement\n"
      );
      res
        .status(500)
        .send(
          `FYI: There was an error preparing the ESLint-rule-insert statement.\n`
        );
    }
    const addRuleStmtExecutionInfo = addRuleStmt.run(newKey, newValue);
    console.log(
      `FYI: Added ${addRuleStmtExecutionInfo.changes} ESLint rules to the configuration.\n`
    );
  }

  res.send(`ESLint rule added!\n`);
});

app.get("/api/reset_config", (req, res) => {
  const resetStmt = sqldb.prepare("DELETE FROM eslint");
  const resetStmtExecutionInfo = resetStmt.run();
  const bodyResult = `FYI: ${resetStmtExecutionInfo.changes} changes happened to the database during reset.`;
  res.send(bodyResult);
});

app.get("/api/generate_config", (req, res) => {
  let bodyResult = "module.exports = {<br>";
  const stmt = sqldb.prepare("SELECT key, value from eslint");
  const results = stmt.all();
  results.forEach((row) => {
    bodyResult += `&nbsp; "${row.key}":"${row.value}",<br>\n`;
  });
  bodyResult += "<br>}";
  res.send(bodyResult);
});

app.use("/ui/", express.static("html"));

app.listen(port, () => {
  console.log(`Darcy app server listening on port ${port}`);
});
