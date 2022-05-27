const express =  require('express');
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../conrollers/goalsController')
const router = express.Router();

router.route('/').get(getGoals).post(setGoal) // Two variants of chaining
router.put('/:id', updateGoal)
router.delete('/:id', deleteGoal)

module.exports = router;