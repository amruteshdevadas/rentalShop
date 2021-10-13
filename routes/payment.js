require("dotenv").config();
const express = require("express");
const router = express.Router();
const PaymentModule = require('../Module/paymentModule')

router.post("/orders", PaymentModule.postPayment);
router.post('/success',PaymentModule.postSuccess)
module.exports = router