const express = require("express");
// ルーティングする
const router = express.Router();

router.use("/article", require("./article"));
router.use("/user", require("./user"));

// routerをモジュールとして扱う準備
module.exports = router;
