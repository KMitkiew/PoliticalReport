const express = require('express');
const router = express.Router();

const authenticationController = require('../controllers/authentication');

router
    .route("/")
    .post(authenticationController.login);

module.exports = router;