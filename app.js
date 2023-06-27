const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v3/app", routes);

app.use((req, res, next) => {
  const error = new Error("Please enter valid url");
  error.code = 404;
  next(error);
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "Something went wrong" });
});

app.listen(port);
