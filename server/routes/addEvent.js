const express = require("express");
const router = express.Router();

const {
    postEvent,
    getNewEvents
} = require("../controllers/addEvent")

router
    .route("/")
    .post(postEvent)
router
    .route("/query")
    .get(getNewEvents)

module.exports = router;