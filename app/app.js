const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/ExpressAPI");
mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

// body-parserの設定
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000; // port番号指定

const router = require("./route/v1");
app.use("/api/v1", router);

// サーバ起動
app.listen(port);
console.log("listen on port" + port);
