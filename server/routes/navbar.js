const express = require("express");
const router = express.Router();

const {
    getUsername
} = require("../controllers/navbar")

router
    .route("/")
    .get(getUsername)

module.exports = router;