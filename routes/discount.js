const express = require("express");
const router = express.Router();
const { createDiscount, getAllDiscounts } = require("../controllers/discountController");

router.post("/", createDiscount);
router.get("/", getAllDiscounts);

module.exports = router;