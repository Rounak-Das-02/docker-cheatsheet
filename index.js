const express = require("express");

const app = express();
const port = 8000;

app.get("/", (req, res) => {
  return res.json({
    name: "BOB",
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}`));
