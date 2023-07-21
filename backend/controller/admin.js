const express = require('express');
const Admin = require('../model/admin');
const router = express.Router();
const sendToken = require('../utils/sendToken');

router.post('/create-admin', async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const adminEmail = await Admin.findOne({ email });
		if (adminEmail) {
			return res.status(400).json({ message: 'Admin already exist' });
		}
		admin = await Admin.create({ name, email, password });

		sendToken(admin, 201, res);
	} catch (error) {
		res.status(500).json({
			message: error.message,
		});
	}
});

router.post('/login-admin', async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'Please Provide the all fields' });
		}

		const admin = await Admin.findOne({ email }).select('+password');

		if (!admin) {
			return res.status(400).json({ message: "Admin doesn't exist" });
		}

		const isPasswordValid = await admin.comparePassword(password);

		if (!isPasswordValid) {
			return res.status(400).json({ message: 'Please provide the correct information' });
		}

		sendToken(admin, 201, res);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: error.message,
		});
	}
});

module.exports = router;
