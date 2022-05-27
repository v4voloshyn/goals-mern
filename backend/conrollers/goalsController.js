const asyncHandler = require('express-async-handler');
// @desc Get goals
// @route GET /api/v1/goals
// @acces Private
const getGoals = asyncHandler(async (req, res) => res.status(200).json(`Get outta here!`));

// @desc Create goal
// @route POST /api/v1/goals
// @acces Private
const setGoal = asyncHandler(async (req, res) => {
if(!req.body.text) {
	res.status(400)
	throw new Error('Text field is required')
}

	res.status(201).json(`Hey, come in!`);
})

// @desc Update goal
// @route PUT /api/v1/goals/:id
// @acces Private
const updateGoal = asyncHandler(async (req, res) => res.status(200).json(`Hey! You are nice, ${req.params.id}`));

// @desc Delete goal
// @route DELETE /api/v1/goals/:id
// @acces Private
const deleteGoal = asyncHandler(async (req, res) => res.status(200).json(`Get outta here, I delete You now: ${req.params.id}`));

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal
}