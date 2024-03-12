const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const politicSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    shortInfo: {
        type: String,
        required: true,
    },
    partyAffilation: [{
        type: String,
        required: false,
    }],
    education: [{
        type: String,
        required: false,
    }],
    career: [{
        type: String,
        required: false,
    }],
    status: {
        type: String,
        required: true
    },
    subscriptions: {
        type: Number,
        required: false
    }
});

politicSchema.index({ name: 'text', surname: 'text' });

const Politic = model('Politic', politicSchema);
module.exports = Politic;