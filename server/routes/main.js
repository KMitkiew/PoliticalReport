const express = require("express");
const router = express.Router();

const {
    getEvents
} = require("../controllers/main");

router
    .route("/query")
    .get(getEvents)

module.exports = router;