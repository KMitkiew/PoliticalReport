const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const {Schema, model, SchemaTypes} = mongoose;

const eventPropositionSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    shortDescription: {
        type: String,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
    politicInvolved: {
        type: SchemaTypes.ObjectId,
        ref: 'Politic',
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
});

const EventProposition = model('EventProposition', eventPropositionSchema);
module.exports = EventProposition;