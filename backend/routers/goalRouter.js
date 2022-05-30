const express =  require('express');
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../conrollers/goalsController');
const { protectMiddleware } = require('../middlware/authMiddleware');
const router = express.Router();

router.route('/').get(protectMiddleware, getGoals).post(protectMiddleware, setGoal) // Two variants of chaining
router.put('/:id', protectMiddleware, updateGoal)
router.delete('/:id', protectMiddleware, deleteGoal)

module.exports = router;