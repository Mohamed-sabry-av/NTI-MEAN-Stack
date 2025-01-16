const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
// const { isEmail } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    //   validate: isEmail,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    userType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userRole",
      required:true
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
