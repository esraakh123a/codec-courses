const express = require("express");
const bcrypt = require("bcryptjs");
const usermodele = require("../models/User");
const jwt = require("jsonwebtoken");

require('dotenv').config()

const generateToken = require("../utils/jwt_utils")

//getuserس
var getusers = async (req, res) => {
  try {
    var users = await usermodele.find();
    res.status(200).send(users)
  } catch (err) {
    res.status(500).send({ message: "some thing is wrong" });
  }

}

//register
const createUser = async (req, res) => {
  try {
    const { name, email, password, phonenumber, city, role } = req.body;

    // التأكد من عدم وجود الإيميل مسبقًا
    const existingUser = await usermodele.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = new usermodele({ name, email, password, phonenumber, city, role });
    await newUser.save(); // هيعمل hash للباسورد تلقائي بسبب الـ pre("save")

    // ما تبعتش الباسورد في الريسبونس
    const { password: _, ...userData } = newUser.toObject();

    res.status(201).json({ message: "User created successfully", user: userData });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login
var login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "plz enter email and password" })
  }

  const user = await usermodele.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: "not user exist" })   //404مش موجود
    //الرترن هنا معناها يعنيى لو مش موجود وقف الكود على كده متملش فى اللى تحته
  }

  var isvalid = await bcrypt.compare(password, user.password);

  if (!isvalid) {

    return res.status(401).json({ message: "the password is wrong" })
    //401 معناها المستخدم موجود بس كلمة المرور خطا

  }

  // res.status(200).json({ message: "login success", data: user });

  const token = generateToken(user);
  //هنا يوزر اسم برامتر عادى ممكن اى اسم 



  //فى حالة خلصت دنياتى وكل حاجه تمام ارجع بقى الريسبونس بتاعي بالنجاح والتوكن والمعلومات 
  res.status(200).json({
    message: "login successfully",
    token,
    user: {
      id: user._id,     //هى بتكتب كده _id
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};


//عشان يبعت لى واحد بس اللى يخصه التوكن اللى بعته فى الهيدر مش يجت كلهم 

const getProfile = async (req, res) => {
  const user = await usermodele.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};


//update
const updateUser = async (req, res) => {
  try {
    const userId = req.user.id; // جاي من التوكن

    // الحاجات اللي عايز تعدلها
    const { name, city, phonenumber,password } = req.body;

    const updatedUser = await usermodele.findByIdAndUpdate(
      userId,
      { name, city, phonenumber,password },
      { new: true, runValidators: true } // new: يرجع النسخة الجديدة بعد التعديل
    ).select("-password");  //-password معناها استبعدلى ده من ظهوره فى البيانات 

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user preferences (language, darkMode, notifications)
const updatePreferences = async (req, res) => {
  try {
    const userId = req.user.id; // جاي من التوكن

    // القيم اللي ممكن تتعدل
    const { language, darkMode, notifications } = req.body;

    // تعديل Nested Object في Mongoose
    const updatedUser = await usermodele.findByIdAndUpdate(
      userId,
      {
        "preferences.language": language,
        "preferences.darkMode": darkMode,
        "preferences.notifications": notifications
      },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Preferences updated successfully",
      preferences: updatedUser.preferences
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};










module.exports = { createUser, getusers, login_user, getProfile ,updateUser,updatePreferences};
