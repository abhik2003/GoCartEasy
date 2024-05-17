const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
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

//update prfole
const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);
        //password
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
        }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        res.status(200).send({
            success: true,
            message: "Profile Updated SUccessfully",
            updatedUser,
        });
    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error WHile Update profile",
            error,
        });
    }
};

//orders
const getOrdersController = async (req, res) => {
    try {
        const orders = await orderModel
            .find({ buyer: req.user._id })
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .populate("products", "-photo")
            .populate("buyer", "name");
        res.json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting all orders'
        })
    }
}

//all orders
const getAllOrdersController = async (req, res) => {
    try {
        const orderds = await orderModel
            .find({})
            .sort({ createdAt: -1 }) // Sort by createdAt field in descending order
            .populate("products", "-photo")
            .populate("buyer", "name");
            
        res.json(orderds);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while getting all orders'
        })
    }
}

//order status controller : to change the status of the order
const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Updateing Order",
      error,
    });
  }
};

//test router
const testController = (req, res) => {
    res.send({
        message: "protected route"
    })
}


module.exports = { registerController, loginController, testController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController };