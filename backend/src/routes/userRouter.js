const express = require("express");
const userController = require("../controllers/userController");
const multipart = require("connect-multiparty");
const multipartMiddleware = multipart({ maxFilesSize: 100 * 1024 * 1024 }); // limit file size to 100 MB

const router = express.Router();

router.post("/auth", userController.authUser);
router.get("/profile/:address", userController.getUser);
router.post("/profile/update-profile", userController.updateProfile);
router.get("/transaction/:address", userController.getTransactions);
router.post("/profile/set-avatar", userController.setAvatarToNft);

module.exports = router;
