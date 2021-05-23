const express = require("express")
const router = express.Router()
const passport = require('passport');
const users = require("../controllers/users")


router.route("/user").get(users.getUser)

router.route("/register").post(users.register)

router.route("/login").post(passport.authenticate("local"), users.login)

router.get("/logout", users.logout)

module.exports = router;