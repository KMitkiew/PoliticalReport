const mongoose =require("mongoose");
const {Schema, model, SchemaTypes} = mongoose;
// {
//     id: 181913649,
//     name: "Krzysztof",
//     surname: "Mitkiewicz",
//     photo:
//         "https://dzieje.pl/sites/default/files/styles/open_article_750x0_/public/201703/tusk_donald.jpg?itok=01h5aKl7",
//     email: "kmitkiewicz@interia.pl",
//     password: "password",
//     likes: [181913651, 181913652],
//     dislikes: [181913653, 181913654],
//     observedPolitics: [181913662, 181913661, 181913660, 181913659, 181913658],
//     seenEvents: [181913651],
//     population: "up-to-50k",
//     birthDate: "1999-05-11"
// },

const userSchema = new Schema({
    name: {
        type: String,
        required: false,
    },
    surname: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    birthDate: Date,
    observedPolitics: [{
        type: SchemaTypes.ObjectId,
        ref: 'Politic',
        required: false
    }],
    likes: [{
        type: SchemaTypes.ObjectId,
        ref: 'Event',
        required: false
    }],
    dislikes: [{
        type: SchemaTypes.ObjectId,
        ref: 'Event',
        required: false
    }], 
    population: {
        type: String,
        required: false,
    }, 
    isAdmin: {
        type: Boolean,
        required: false,
        default: false
    }
});

const User = model('User', userSchema);
module.exports = User;