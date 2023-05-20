const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transpoter } = require("../service/mailService");

//SignUp API

const userSingnup = async (req, res) => {
  const { userEmail, userPassword } = req.body;
  const userData = new User(req.body);
  try {
    const isUserExists = await User.findOne({ userEmail: userEmail });
    if (isUserExists) {
      return res.status(409).json({
        status: false,
        error: "email already exist",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      userData.userPassword = await bcrypt.hash(userPassword, salt);
      userData.profilePic = `/uploads/${(req.file.filename)}`;
      await userData.save();
      return res.status(201).json({
        success: true,
        message: "Registration Successfully",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err.message,
    });
  }
};

//Login API

const login = async (req, res) => {
  const loginUser = await User.findOne({
    userEmail: req.body.userEmail
  });
  try {
    if (loginUser) {
      const hashPassword = await bcrypt.compare(
        req.body.userPassword,
        loginUser.userPassword
      );
      if (loginUser && hashPassword) {
        const token = jwt.sign({ userId: loginUser._id }, process.env.JWT, {
          expiresIn: "5d",
        });
        res.status(201).json({
          success: true,
          message: "Signin Successfully",
          token: token,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Invalid email or password",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

// Forgotten Api

const forgetPassword = async (req, res) => {
  const forgetId = await User.findOne({
    userEmail: req.body.userEmail,
  });
  try {
    if (forgetId != null) {
      const token = jwt.sign(
        { userid: forgetId._id },
        process.env.JWT,
        { expiresIn: "30m" }
      );
      const link = `http://127.0.0.1:3000/api/user/resetPassword/${forgetId._id}/${token}`;
      await transpoter.sendMail({
        from: process.env.EMAIL,
        to: req.body.userEmail,
        subject: "Password recovery Link",
        html: `<p>below link is valid only for 5 minutes</p><a href=${link}}>Click on link to reset the password</a>`,
      });
      res.status(200).json({
        success: true,
        message: "Mail sent successfully",
        token: token,
        UserId: forgetId._id,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

//Reset API

const resetPassword = async (req, res) => {
  const { userId, token } = req.params;
  const { newPassword, confirmPassword } = req.body;
  try {
    const checkUser = await User.findById(userId);
    // console.log(checkUser)
    if (checkUser != null) {
      //const secretKey = checkUser._id + process.env.JWT;
      jwt.verify(token, process.env.JWT);
      if (newPassword == confirmPassword) {
        const salt = await bcrypt.genSalt(10);
        const userPassword = await bcrypt.hash(confirmPassword, salt);
        // console.log(userPassword)
        await User.findByIdAndUpdate(checkUser._id),
        {
          $set: { userPassword: userPassword },
        };
        res.status(200).json({
          status: "true",
          message: "password Updated Successfully",
        });
      } else {
        res.status(403).json({
          status: "false",
          message: "Password and confirmPassword is not match",
        });
      }
    } else {
      res
        .status(403)
        .json({ status: "false", message: "email user is not found" });
    }
  } catch (err) {
    res.status(500).json({
      status: "false",
      message: err.message,
    });
  }
};
module.exports = { userSingnup, login, forgetPassword, resetPassword };
