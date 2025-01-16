const userModel = require("../models/UserModel")
const hashing = require('../Auth/passAuth');
const cookieParser = require("cookie-parser");
const auth = require("../Auth/jwt");

exports.CreateSignup = async (req, res) => {
  const {name,email,password,userType} = req.body;
  try {
    const pass = req.body.password
    const hashedPassword = await hashing.hashPassword(pass)  
    req.body.password = hashedPassword
    const User = await userModel.create(req.body);
    res.status(200).json(User);
    res.json("REGISTERD SUCCESSFULLY")
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.GetSignup = async (req, res) => {
  try {
    const Users = await userModel.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



exports.CreateLogin = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email }).populate('userType');
      if (user) {
          const isMatch = await hashing.isMatch(password, user.password);
          if (isMatch) {
              const token = auth.createAccessToken({userId:user._id,userName:user.name,userType:user.userType.name});
              
              res.status(200).json({ accessToken: token })
              res.cookie('access-token',token,{
                maxAge:60*60*24*30*100
              })
          }
          else {
              res.status(400).json({ error: "this password not match" });
          }
      }
      else {
          res.status(400).json({ error: "this email not found" });
      }

  } catch (err) {
      res.status(500).json({ error: err.message });
  }
}

exports.GetLogin = async (req, res) => {
  try {
    const Users = await userModel.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};



// exports.CreateUser = async (req, res) => {
//     try {
//         const User = await userModel.create(req.body);
//         res.status(200).json(User);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// exports.GetUser = async (req, res) => {
//     try {
//         const Users = await userModel.find();
//         res.status(200).json({ Users });
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// }
