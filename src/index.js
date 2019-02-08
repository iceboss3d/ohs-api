const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

//app setup
const app = express();

//db connection
const url = process.env.MONGO_DB;
mongoose.connect(url, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

//body parser middleware
app.use(bodyParser.json());

//cross origin
app.use(
  cors({
    credentials: true,
    origin: true
  })
);
//initilize routes
app.use("/api/v1", require("./routes/api"));

//error handling
app.use(function(err, req, res, next) {
  res.status(422).send({ error: err.message });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, function() {
  console.info(`App running on ${PORT}`);
});
