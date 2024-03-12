const authenticationService = require('../services/authentication.service');

const auth = async (req, res, next) => {
    const authorizationHeader = req.header('Authorization');
    const token = authorizationHeader.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    
    const user = await authenticationService.authenticateToken(token);
    if (!user) {
        return res.status(403).send('Forbidden');
    }
    req.user = user;
    next();
}

module.exports = auth;