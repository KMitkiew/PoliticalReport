const authenticationService = require('../services/authentication.service');

const login = async (req, res) => {
    const {email, password} = req.body;

    const token = await authenticationService.loginUser(email, password);

    if (token) {
        res.header('Authorization', `Bearer ${token}`);
        res.send('successfully logged in.')
    } else {
        res.status(400).send('Bad credentials.');
    }
}

const register = async (req, res) => {
    const { email, password } = req.body;

    const token = await authenticationService.registerUser(email, password);
    if (token) {
        res.header('Authorization', `Bearer ${token}`);
        res.send('successfully logged in.')
    } else {
        res.status(400).send('Bad credentials.');
    }
}


module.exports = {
    login,
    register,
}