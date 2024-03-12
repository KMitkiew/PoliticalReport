const express = require('express');
const router = express.Router();

const recaptchaController = require('../controllers/recaptcha');

router
    .route("/verify")
    .post(recaptchaController.verify);

module.exports = router;