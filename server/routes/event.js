const express = require("express");
const router = express.Router();

const {
    getEvent,
    getReactions,
    putReactions,
    reactionCount,
    wasSeen
} = require("../controllers/event")


router
    .route("/:id")
    .get(getEvent)
router
    .route("/visited")
    .put(wasSeen)
router
    .route("/likes/:eventId")
    .get(getReactions)
router
    .route("/likes/:eventId")
    .put(putReactions)
router
    .route("/likes/:eventId/value")
    .put(reactionCount)
    
module.exports = router;