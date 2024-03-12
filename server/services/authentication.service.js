const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../db/models/user.model")
require('dotenv').config()

const tokenSecret = process.env.TOKEN_SECRET;

const authenticateToken = async (token) => {
    const resolveToken = jwt.verify(token, tokenSecret, (error, user) => {
        if (error) {
            return null;
        } else {
            return user;
        }
    });
    if (resolveToken._id) {
        const user = await User.findOne({ _id: resolveToken._id });
        return user;
    } else {
        return null;
    }
}

const loginUser = async (username, password) => {
    const user = await User.findOne({ email: username });
    if (!user) {
        return null;
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return null;
    }

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, tokenSecret , { expiresIn: '1h' });
    return token;
}

const registerUser = async (username, password) => {
    if (await userExistsInDatabase(username)) {
        return undefined;
    }
    // generate salt
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({
        email: username,
        password: hashPassword,
        isAdmin: false,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, tokenSecret, { expiresIn: '1h' });
    return token;
}

const userExistsInDatabase = async(email) => {
    const exists = await User.exists({email: email});
    return exists !== null;
}

module.exports = {
    authenticateToken,
    loginUser,
    registerUser
}