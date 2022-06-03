const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

const userSchema = require('../models/userModel');

// @desc Register new user
// @route POST /api/v1/users
// @acces Public
const registerUser = asyncHandler(async (req, res) => {
	const {name, email, password} = req.body;
	if(!name || !email|| !password) {
		res.status(400);
		throw new Error('All fields a required to fill')
	}
	// Check to user exist
	const isUserExist = await userSchema.findOne({email})
	if(isUserExist) {
		res.status(400);
		throw new Error('This user email is already exist')
	}
	// Hash password
	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	// Create user
	const user = await userSchema.create({
		name,
		email,
		password : hashedPassword
	})

	if(user) {
		res.status(201);
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)
		}) 
	} else {
		res.status(400);
		throw new Error('Invalid user data')
	}
})

// @desc Authenticate a user
// @route POST /api/v1/users/login
// @acces Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await userSchema.findOne({email});

	if(user && (await bcrypt.compare(password, user.password))) {
		res.status(200);
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id)
		})
	} else {
		res.status(400);
		throw new Error('Invalid user email or password')
	}
})

// @desc Get user data
// @route GET /api/v1/users/me
// @acces Private
const getMeData = asyncHandler(async (req, res) => {
	const {_id, name, email} = await userSchema.findById(req.user.id);

	res.status(200).json({
		id: _id,
		name,
		email
	})
})

const generateToken = (id) => {
	return jwt.sign({id}, process.env.JWT_SECRET, {
		expiresIn: '1d',
	})
}

module.exports = {registerUser, loginUser, getMeData}