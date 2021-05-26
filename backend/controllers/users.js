const User = require("../models/user");



module.exports.getUser = async (req,res) => {
  if(!req.user) return
  const followedRoomsFixed = req.user.followedRooms.map(e =>  {return e._id })

  res.json({email: req.user.email, username: req.user.username, userId: req.user._id, followedRooms: followedRoomsFixed})
}

// module.exports.getFollowedRooms = async (req,res) => {
//   const user = await User.findById(req.user.id);
//   res.json({followedRooms: users.followedRooms})
// }


module.exports.handleFollowRoom = async (req,res) => {
  const user = await User.findById(req.user.id);
  console.log(req.body.followedRooms.length);
  user.followedRooms = [...req.body.followedRooms];
  await user.save();
  res.send("ok")
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
  console.log("LOGIN")
  const { username, email, _id } = req.user
  delete req.session.returnTo;
  res.json({username, email, _id})
}
  
module.exports.logout = (req, res) => {
  req.logout();

  res.send("ok")
}