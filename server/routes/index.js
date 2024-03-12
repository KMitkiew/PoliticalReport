const express = require("express")
const main = require("./main")
const leftSideMenu = require("./leftSideMenu")
const rightSideMenu = require("./rightSideMenu")
const searchEngine = require("./searchEngine")
const navbar = require("./navbar")
const event = require("./event")
const comment = require("./comment")
const user = require("./user")
const politic = require("./politic")
const addEvent = require("./addEvent")
const addPolitic = require("./addPolitic")
const register = require("./register");
const login = require("./login");
const authenticationService = require("../services/authentication.service")
const captcha = require("./recaptcha");

const auth = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    if (!authorizationHeader){
        return res.status(401).send('Unauthorized');
    }
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    
    const user = await authenticationService.authenticateToken(token);
    if (!user) {
        return res.status(401).send('Unauthorized');
    }
    req.user = user;
    next();
}

const adminAuth = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).send('Forbidden'); 
    }
    
    next();
};

const protectedRouter = express.Router();

protectedRouter.use("/", auth);
protectedRouter.use("/main", main);
protectedRouter.use("/left-side-menu", leftSideMenu)
protectedRouter.use("/right-side-menu", rightSideMenu)
protectedRouter.use("/search-engine", searchEngine)
protectedRouter.use("/event", event)
protectedRouter.use("/comment", comment)
protectedRouter.use("/user", user)
protectedRouter.use("/politic", politic)
protectedRouter.use("/navbar", navbar)
protectedRouter.use("/add-event", adminAuth, addEvent)
protectedRouter.use("/add-politic", adminAuth, addPolitic)

const router = express.Router();

router.use("/register", register)
router.use("/login", login)
router.use("/captcha", captcha)

module.exports = { protectedRouter, router };
