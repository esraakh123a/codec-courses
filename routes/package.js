const express = require("express");
const router = express.Router();
const { createPackage, getAllPackages } = require("../controllers/packageController");

router.post("/", createPackage);
router.get("/", getAllPackages);

module.exports = router;