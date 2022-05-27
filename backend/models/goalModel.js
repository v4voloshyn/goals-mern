const mongoose = require('mongoose');

const goalSchema = mongoose.Schema({
	text: {
		type: String,
		required: [true, 'Please, add your goal text']
	},
}, {
	timestamps: true,
})

module.exports = mongoose.model('goal', goalSchema);