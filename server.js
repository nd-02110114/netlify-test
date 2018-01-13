const express = require("express");
const app = express();

app.use(express.static("app"));

const port = 5000;

app.listen(port, function() {
  console.log(
    "Starting Express Server(port:%d), Env:%s",
    port,
    app.settings.env
  );
});
