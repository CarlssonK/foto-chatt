const express = require("express")
const router = express.Router()
const { isLoggedIn } = require("../middleware")
const rooms = require("../controllers/rooms")


// Get rooms
router.route("/").get(isLoggedIn, rooms.index)

router.route("/:id").get(isLoggedIn, rooms.showRoom)


module.exports = router;