const userModel = require("../models/UserModel");
const hashing = require("../Auth/passAuth");
const userRoleModel = require("../models/UserRoleModel");
const cookieParser = require("cookie-parser");
const auth = require("../Auth/jwt");

exports.CreateSignup = async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    const pass = req.body.password;

    const existingUser = await userModel
      .findOne({ email })
      .populate("userType", "name");
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const userRole = await userRoleModel.findById(userType);
    if (!userRole) {
      return res.status(400).json({ error: "User role not found" });
    }

    const hashedPassword = await hashing.hashPassword(password);
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
      userType: userRole._id,
    });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
    console.log("error");
  }
};

exports.GetSignup = async (req, res) => {
  try {
    const Users = await userModel.find().populate("userType");
    res.status(200).json(Users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.CreateLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel
      .findOne({ email })
      .populate("userType", "name");

    if (user) {
      console.log("USER", user);
      const isMatch = await hashing.isMatch(password, user.password);
      console.log("Password Match Result:", isMatch);
      console.log("Entered Password:", password);
      console.log("Stored Password:", user.password);
      if (isMatch) {
        console.log(isMatch);
        console.log("Password Match Result:", isMatch); // تأكد من أن النتيجة هي true

        const token = auth.createAccessToken({
          userId: user._id,
          userName: user.name,
          userType: user.userType,
        });
        console.log("User:", user);
        console.log("Token:", token);
        console.log("Password Match Result:", isMatch);
        return res.status(200).json({
          accessToken: token,
          user: { id: user._id, name: user.name },
          userType: user.userType.name,
          userId: user._id,
          user,
        });
      } else {
        res.status(400).json({ error: "Password does not match", user });
      }
    } else {
      res.status(400).json({ error: "Email not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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

exports.EditUser = async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);
  const { name, email, password, userType } = req.body;

  console.log(req.body);
  try {
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await hashing.hashPassword(password);
      user.password = hashedPassword;
    }
    if (userType) {
      const roleExists = await userRoleModel.findById(userType);
      if (!roleExists) {
        return res.status(400).json({ error: "User role not found" });
      }
      user.userType = userType;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.DeleteUser = async (req, res) => {
  const { id } = req.params; // استلام معرف المستخدم من الباراميترز
  try {
    const user = await userModel.findByIdAndDelete(id); // البحث عن المستخدم وحذفه
    if (!user) {
      return res.status(404).json({ error: "User not found" }); // إذا لم يتم العثور على المستخدم
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message }); // التعامل مع الأخطاء
  }
};
