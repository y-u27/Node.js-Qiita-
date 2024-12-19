const express = require("express");
const router = express.Router();
const UserModel = require("../../models/userModel.js");

router.get("/", function (req, res) {
  UserModel.find().then(function (users) {
    res.json(users);
  });
});

router.post("/", function (req, res) {
  // モデル作成
  const User = new UserModel();

  // データを詰め込む
  User.name = req.body.name;
  User.screen_name = req.body.screen_name;
  User.bio = req.body.bio;

  // 保存処理
  User.save()
    .then(function () {
      // 保存が成功した場合
      res.json({ message: "Success!!" });
    })
    .catch(function (err) {
      // 保存が失敗した場合のエラーメッセージを返す
      res.status(500).send(err);
    });
});

router.get("/:id", async function (req, res) {
  const UserId = req.params.id;
  try {
    const user = await UserModel.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: error });
  }
});

router.put("/:id", async function (req, res) {
  const UserId = req.params.id;
  try {
    const user = await UserModel.findById(UserId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ユーザー情報を更新
    user.name = req.body.name;
    user.screen_name = req.body.screen_name;
    user.bio = req.body.bio;

    // 更新を保存
    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "An error occurred", error: error });
  }
});

// routerをモジュールとして扱う準備
module.exports = router;
