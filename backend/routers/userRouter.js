const express =  require('express');
const {registerUser, loginUser, getMeData} = require('../conrollers/usersController');
const { protectMiddleware } = require('../middlware/authMiddleware');
const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protectMiddleware, getMeData);

module.exports = router;