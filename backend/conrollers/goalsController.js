// @desc Get goals
// @route GET /api/v1/goals
// @acces Private
const getGoals = (req, res) => res.status(200).json(`Get outta here!`);

// @desc Create goal
// @route POST /api/v1/goals
// @acces Private
const setGoal = (req, res) => {
if(!req.body.text) {
	res.status(404)
	throw new Error('Text field is required')
}

	res.status(201).json(`Hey, come in!`);
}

// @desc Update goal
// @route PUT /api/v1/goals/:id
// @acces Private
const updateGoal = (req, res) => res.status(200).json(`Hey! You are nice, ${req.params.id}`);

// @desc Delete goal
// @route DELETE /api/v1/goals/:id
// @acces Private
const deleteGoal = (req, res) => res.status(200).json(`Get outta here, I delete You now: ${req.params.id}`);

module.exports = {
	getGoals,
	setGoal,
	updateGoal,
	deleteGoal
}