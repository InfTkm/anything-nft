const express = require("express");
const collectionController = require("../controllers/collectionController");
const multipart = require("connect-multiparty");

const multipartMiddleware = multipart();
const router = express.Router();

router.get("/nft/:nft_id", () => {});
router.get("/album/:album_id", () => {});
router.get("/draw/:draw_id", () => {});
router.post("/market", () => {});

router.post("/create-nft", multipartMiddleware, collectionController.createNft);
router.post("/list-nft", collectionController.listNft);
router.post("/list-nft-draw", collectionController.listNftDraw);
router.post("/create-album", collectionController.createAlbum);
router.post("/list-album", collectionController.listAlbum);

router.post("/purchase-nft", () => {});
router.post("/draw-nft", () => {});
router.post("/fund-nft", () => {});

router.post("/purchase-album", () => {});

module.exports = router;
