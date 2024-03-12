const mongoose = require("mongoose");
const {Schema, model, SchemaTypes} = mongoose;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    userName:{
        type: String,
        required: false,
    },
    userSurname:{
        type: String,
        required: false,
    },
    userEmail:{
        type: String,
        required: true,
    },
    user: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    parentId: {
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
        required: false
    },
    event: {
        type: SchemaTypes.ObjectId,
        ref: 'Event',
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Comment = model('Comment', commentSchema);
module.exports = Comment;