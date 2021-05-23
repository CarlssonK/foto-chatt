const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer")
const { storage } = require("../cloudinary");
const upload = multer({ storage })

const messages = require("../controllers/messages")

router.post("/", upload.array("images"), messages.createMessage);
router.post("/", messages.createMessage);

module.exports = router;