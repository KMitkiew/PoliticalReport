const mongoose = require("mongoose");
const {Schema, model, SchemaTypes} = mongoose;

const eventSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    source: [{
        type: String,
        required: true,
    }],
    politicsInvolved: [{
        type: SchemaTypes.ObjectId,
        ref: 'Politic',
        required: false
    }],
    date: {
        type: Date,
        required: true,
    },
    likes: {
        type: Number,
        required: false,
    },
    dislikes: {
        type: Number,
        required: false,
    }
});

const Event = model('Event', eventSchema);
module.exports = Event;