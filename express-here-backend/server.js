const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Got a request, you are good to go!!");
  res.send("Hello!!");
});

app.listen(3000);
