const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter your name!'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email!'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minLength: [4, 'Password should be greater than 4 characters'],
		select: false,
	},
	phoneNumber: {
		type: Number,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

//  Hash password
adminSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
adminSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, '2FxXT1NTf2K1Mo4i6AOvtdI', {
		expiresIn: '7d',
	});
};

// compare password
adminSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Admin', adminSchema);
