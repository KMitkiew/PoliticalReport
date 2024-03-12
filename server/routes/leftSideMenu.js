const express = require("express");
const router = express.Router();

const {
    getPolitics
} = require("../controllers/leftSideMenu")

router
    .route("/")
    .get(getPolitics)

module.exports = router;