const userModel = require("../models/UserModel");

exports.CreateSignup = async (req, res) => {
  const {email,password} = req.body;
  try {
    const User = await userModel.create(req.body);
    res.status(200).json(User);
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
    const User = await userModel.create(req.body);
    res.status(200).json(User);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

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
