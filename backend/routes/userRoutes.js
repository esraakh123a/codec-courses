const express = require("express");
const router = express.Router();
const { createUser, getusers, login_user, getProfile, updateUser, updatePreferences } = require("../controllers/userController");

const auth = require("../middelware/auth")

// عام
router.get("/public", getusers);

router.get("/profile", auth, getProfile);

router.post("/", createUser)


router.post("/login", login_user)

router.put("/update", auth, updateUser);

router.put("/preferences", auth, updatePreferences);





module.exports = router;

