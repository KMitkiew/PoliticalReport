const express = require("express");
const router = express.Router();

const {
    getPolitics,
    getTrustLevel
} = require("../controllers/searchEngine")

router
    .route("/query")
    .get(getPolitics)
router
    .route("/:politicId")
    .get(getTrustLevel)

module.exports = router;