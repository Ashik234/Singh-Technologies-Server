const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const userRegister = async (req, res) => {
  try {
    const {email, password } = req.body;
    const exists = await userModel.findOne({ email: email });

    if (exists) {
      return res
        .status(400)
        .json({ exists: true, message: "Email already exists" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedpassword = await bcrypt.hash(password, salt);

      let user = await userModel.create({
        email,
        password: hashedpassword,
      });

      res.status(201).json({ user ,message:"Registration Completed Successfully" });
    }
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
};
