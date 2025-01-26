const userRoleModel = require("../models/UserRoleModel");

exports.createUserType = async (req, res) => {
  try {
    const userTypeId = req.user.userType.toString();
    if (userTypeId === "Admin") {
      const { name, RoleDetails } = req.body;
      if (!name || !RoleDetails) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const userType = await userRoleModel.create(req.body);
      console.log(userType)
      res.status(201).json(userType);
    } else {
      res.status(401).json({ error: "access denied, admins only" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserTypes = async (req, res) => {
  try {

    const userTypeId = req.user.userType;
    const myUserType = await userRoleModel.findById(userTypeId);
    if (myUserType.name === "Admin") {      const userTypes = await userRoleModel.find();
      res.status(200).json(userTypes);
    } else {
      res.status(401).json({ error: "access denied, admins only" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUserType = async (req, res) => {
  try {
    const userTypeId = req.user.userType;
    console.log("Req ID",userTypeId)
    if (userTypeId === "Admin") {
      const { id } = req.params; 
      console.log(req.params)
      const updatedUserType = await userRoleModel.findByIdAndUpdate(
        id,
        req.body, // البيانات الجديدة
        { new: true, runValidators: true }
      );

      if (!updatedUserType) {
        return res.status(404).json({ error: "User type not found" });
      }

      res
        .status(200)
        .json({ message: "User type updated successfully", updatedUserType });
    } else {
      res.status(401).json({ error: "Access denied, admins only" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.removeUserType = async (req, res) => {
  try {
    const userTypeId = req.user.userType;
    if (userTypeId === "Admin") {
      const { id } = req.params; // استلام معرف النوع من الباراميترز
      const deletedUserType = await userRoleModel.findByIdAndDelete(id);

      if (!deletedUserType) {
        return res.status(404).json({ error: "User type not found" });
      }

      res.status(200).json({ message: "User type deleted successfully" });
    } else {
      res.status(401).json({ error: "Access denied, admins only" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
