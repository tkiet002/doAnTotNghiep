const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validatedToken } = require("../middlewares/AuthMiddleware");
// router.post("/login", async (req, res) =>{
//   let details = {
//     username: req.body.username,
//     user_password: req.body.user_password
//   }

//   const user = await Users.findOne({where:{username: details.username }});

//   if(!user){
//     res.json({error: "User không tồn tại"});
//   }
//   bcrypt.compare(details.user_password, user.user_password).then((matched) => {
//     if (!matched) {
//       res.json({ error: "Sai mật khẩu hoặc tên người dùng" });
//     }

//     const accessToken = sign(
//       { username: user.username, id: user.id },
//       "importantSecrect"
//     );
//     res.json({token: accessToken, username: user.username, id: user.id});
//   });

// });

router.post("/login", async (req, res) => {
  try {
    const details = {
      username: req.body.username,
      user_password: req.body.user_password,
    };

    const user = await Users.findOne({ where: { username: details.username } });

    if (!user) {
      return res.status(404).json({ error: "User không tồn tại" });
    }

    const matched = await bcrypt.compare(
      details.user_password,
      user.user_password
    );

    if (!matched) {
      return res
        .status(401)
        .json({ error: "Sai mật khẩu hoặc tên người dùng" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantSecrect" // Make sure to set this in your environment variables
    );

    res.json({ token: accessToken, username: user.username, id: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// router.post("/register", async (req, res) => {
//   let details = {
//     name: req.body.name,
//     username: req.body.username,
//     role: req.body.role,
//     email: req.body.email,
//     user_password: req.body.user_password,
//   };

//   bcrypt.hash(details.user_password, 10).then((hashed)=>{
//     Users.create({
//       name: details.name,
//       username: details.username,
//       role: details.role,
//       email: details.email,
//       user_password: hashed,
//     }).then(console.log("Thêm Thành Công!"));
//   })

//   res.json("success!");
// });

router.post("/register", async (req, res) => {
  try {
    if (req.body.password !== req.body.repassword) {
      console.log("Mật khẩu nhập lại không giống!")
      res.json({error:"Lỗi không trùng mật khẩu"})
    }

    let details = {
      name: req.body.name,
      username: req.body.username,
      role: req.body.role,
      email: req.body.email,
      user_password: req.body.password,
    };
    // Check if all required fields are provided
    console.log(details);
    if (
      !details.name ||
      !details.username ||
      !details.email ||
      !details.user_password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await Users.findOne({
      where: { username: details.username },
    });
    console.log("Existing User");
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(details.user_password, 10);

    // Create new user
    const newUser = await Users.create({
      name: details.name,
      username: details.username,
      role: details.role,
      user_password: hashedPassword,
      email: details.email,
    });
    const accessToken = sign(
      { username: newUser.username, id: newUser.id },
      "importantSecrect" // Make sure to set this in your environment variables
    );
    res
      .status(201)
      .json({ message: "User registered successfully", id: newUser.id ,token: accessToken, username: newUser.username});
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

router.post("/getAuth", validatedToken, (req, res, next) => {
  res.json(req.user);
});
module.exports = router;
