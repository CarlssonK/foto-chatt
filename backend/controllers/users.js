const User = require("../models/user");



module.exports.getUser = (req,res) => {
  if(!req.user) return
  res.json({email: req.user.email, username: req.user.username, userId: req.user._id})
}


module.exports.register = async(req, res) => {
  try {
    const { email, username, password } = req.body
    const user = new User({ email, username })
    const registeredUser = await User.register(user, password)
    req.login(registeredUser, err => {
      if(err) return next(err)
      res.json({email, username});
    })
  } catch(e) {
    console.log("ERROR LMAO " + e.message)
    res.redirect("signup")
  }
}
  
module.exports.login = (req, res) => {
  const { username, email, _id } = req.user
  delete req.session.returnTo;
  res.json({username, email, _id})
}
  
module.exports.logout = (req, res) => {
  req.logout();

  res.send("ok")
}