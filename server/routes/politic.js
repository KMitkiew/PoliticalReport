const express = require("express");
const router = express.Router();

const {
    getPoliticInfo,
    getPoliticStats,
    getEvents,
    getUserInfo,
    changeSubscriptionStatus,
    changeSubscriptionNumber
} = require("../controllers/politic")

router
    .route("/:id")
    .get(getPoliticInfo)
router
    .route("/:id/stats")
    .get(getPoliticStats)
router
    .route("/:id/events")
    .get(getEvents)
router
    .route("/:id/user")
    .get(getUserInfo)
router
    .route("/:id/user")
    .put(changeSubscriptionStatus)
router
    .route("/:id/subscription")
    .put(changeSubscriptionNumber)
module.exports = router;