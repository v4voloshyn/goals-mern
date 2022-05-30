const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const userSchema = require('../models/userModel');

const protectMiddleware = asyncHandler( async (req, resp, next) => {
	let token;

	if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			// Get token from header
			token = req.headers.authorization.split(' ')[1];
			// Verify token
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded); // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
			//Get user from the token
			req.user = await userSchema.findById(decoded.id).select('-password')

			next()
		} catch (error) {
			console.log(error);
			resp.status(401);
			throw new Error('Not authorized')
		}
	}

	if(!token) {
		resp.status(401)
		throw new Error('Not authorized, NO token')
	}
})

module.exports = {protectMiddleware};