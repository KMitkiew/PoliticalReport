const express = require("express");
const router = express.Router();

const {
    deleteComment,
    getComments,
    addComment,
    putComment
} = require("../controllers/comment")

router
    .route("/:id")
    .get(getComments)
router
    .route("/:id")
    .delete(deleteComment)
router
    .route("/:id")
    .post(addComment)
router
    .route("/")
    .put(putComment)

module.exports = router;