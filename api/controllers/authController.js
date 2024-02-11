const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;
        console.log(req.body);
        //validation
        if (!name) {
            return res.send({ error: 'Name is required' })
        }
        if (!email) {
            return res.send({ error: 'Email is required' })
        }
        if (!password) {
            return res.send({ error: 'Password is required' })
        }
        if (!phone) {
            return res.send({ error: 'Phone is required' })
        }
        if (!address) {
            return res.send({ error: 'Address is required' })
        }

        //check user
        const existinguser = await userModel.findOne({ email });
        //existing user checking
        if (existinguser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered.. Please Log In'
            })
        }

        //Register New user
        const hashedPassowrd = await hashPassword(password)
        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password: hashedPassowrd
        }).save();

        res.status(201).send({
            success: true,
            message: 'User Register Successfully',
            user
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error
        })
    }
}

//POST Login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(200).send({
                success: false,
                message: 'Enter email and password'
            })
        }
        const user = await userModel.findOne({ email });
        //check whether user exists or not
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }

        //password matching
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                succes: true,
                message: 'Incorrect Password'
            })
        }

        //token
        const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" });
        res.status(200).send({
            success: true,
            message: 'Logged in successfuly',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })

    }
}

//test router
const testController = (req, res) => {
    res.send({
        message: "protected route"
    })
}


module.exports = { registerController, loginController, testController };