const catchAsyncError = require("../midlewares/catchAsyncError");
const ErrorHandler = require('../utils/errorHandler');
const userModel = require('../models/userModel');
const sendToken = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const {name, email, password, avatar} = req.body
    const user = await userModel.create({
        name,
        email,
        password,
        avatar
    });

    sendToken(user, 201, res);
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const {email, password} = req.body

    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }

    // finding the user database
    const user = await userModel.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    if(!await user.isValidPassword(password)) {
        return next(new ErrorHandler('Invalid email or password', 401));
    }

    sendToken(user, 201, res);
})

exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(200)
    .json({
        success: true,
        message: "Loggedout"
    })
}