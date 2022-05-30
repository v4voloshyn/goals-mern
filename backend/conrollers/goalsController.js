const asyncHandler = require('express-async-handler');

const goalSchema = require('../models/goalModel');
const userSchema = require('../models/userModel');

// @desc Get goals
// @route GET /api/v1/goals
// @acces Private
const getGoals = asyncHandler(async (req, res) => {

	const goals = await goalSchema.find({user: req.user.id});

	res.status(200).json(goals)
	return goals;
});

// @desc Create goal
// @route POST /api/v1/goals
// @acces Private
const setGoal = asyncHandler(async (req, res) => {
if(!req.body.text) {
	res.status(400)
	throw new Error('Text field is required')
}
	const goal = await goalSchema.create({
		text: req.body.text,
		user: req.user.id
	})
	res.status(201).json(goal);
	return goal
})

// @desc Update goal
// @route PUT /api/v1/goals/:id
// @acces Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await goalSchema.findById(req.params.id)
	if(!goal) {
		res.status(400)
		throw new Error('Goal not found')
	}

	const user = await userSchema.findById(req.user.id);
	// Check for user
	if(!user) {
		res.status(401);
		throw new Error('User not found')
	}
	// Make sure the logged in user matches the goal user
	if(goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized')
	}
	
	const updatedGoal = await goalSchema.findByIdAndUpdate(req.params.id, req.body, {new: true})
	res.status(200).json(updatedGoal)
});

// @desc Delete goal
// @route DELETE /api/v1/goals/:id
// @acces Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await goalSchema.findById(req.params.id);
	if(!goal) {
		res.status(400)
		throw new Error('Goal not found')
	}

	const user = await userSchema.findById(req.user.id);
	// Check for user
	if(!user) {
		res.status(401);
		throw new Error('User not found')
	}
	// Make sure the logged in user matches the goal user
	if(goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized')
	}
	
	await goal.remove()
	res.status(200).json(goal)
});

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal
}