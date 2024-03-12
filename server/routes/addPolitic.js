const express = require("express");
const router = express.Router();

const {
    postPolitic
} = require("../controllers/addPolitic")

router
    .route("/")
    .post(postPolitic)

module.exports = router;