module.exports.isLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()) {
    return res.json({redirect: "login"})
  }
  next()
}