const JWT = require('jsonwebtoken');
const userModel = require('../models/userModel');

//Protected Route
const requireSignIn = async (req, res, next) => {
    try {
        const decode = JWT.verify(
            req.headers.authorization,     //token from request headers
            process.env.JWT_SECRET_KEY
        );
        req.user = decode;
        next();
    } catch (error) {
        console.log(error);
    }
}


//Admin access
const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);

        if (user.role !== 1) {

            return res.status(200).send({
                success: false,
                message: 'Unauthorized access'
            })
        }
        else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: 'error in admin middleware'
        })
    }
}
module.exports = { requireSignIn, isAdmin };
