const express = require("express");
const router = express.Router({ mergeParams: true });
const multer = require("multer")
const { storage } = require("../cloudinary");
const upload = multer({ storage })

const messages = require("../controllers/messages")

router.post("/messages", upload.array("images"), messages.createMessage);
router.post("/messages", messages.createMessage);

router.route("/show").get(messages.showMessage)

router.post("/comments", messages.createComment)



module.exports = router;