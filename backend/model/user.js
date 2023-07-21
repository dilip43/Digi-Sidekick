const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name!'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email!'],
	},
	phoneNumber: {
		type: Number,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = mongoose.model('User', userSchema);
