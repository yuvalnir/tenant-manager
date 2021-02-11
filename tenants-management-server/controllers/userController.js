const User = require('../models/userModel')
const jwt = require("jsonwebtoken");
const config = require('../config.properties');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, simple } = format;


const logger = createLogger({
    format: combine(
        timestamp(),
        simple(),
    ),
    transports: [
        new (transports.Console)(),
        new (transports.File)({ filename: 'app.log'})
    ]
});

const createUser = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }

    const user = new User(body)
    try {
        user.save();
        return res.status(201).json({ message: 'User created!' });
    } catch (exception) {
        console.error(exception);
        return res.status(400).json({ message: 'User not created!' });
    }
}

const userLogin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({ message: `User not found` });
        }

        /** if cardentials are correct generating token for authorization 
            and sending along with the response */
        if (req.body.password === user.password) {
            const token = jwt.sign({ user }, config.secretKey, { expiresIn: "24h" });
            logger.info('user: ' + req.body.email + ' action: Login');
            return res.status(200).json({
                message: "User authenticated successfully",
                data: { user: user, token: token }
            })
        }
        else {
            res.status(401).json({ message: "Unauthenticated" });
        }

    } catch (exception) {
        console.log(exception);
        return res.status(400).json({ message: 'Error trying to find User' });
    }
}

const userLogout = async (req, res) => {
    logger.info('user: ' + req.body.email + ' action: Logout');
}

module.exports = {
    createUser,
    userLogin,
    userLogout,
}