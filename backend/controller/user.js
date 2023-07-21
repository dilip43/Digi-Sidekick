const express = require('express');
const User = require('../model/user');
const router = express.Router();
const { isAuthenticated } = require('../middleware/auth');

router.get('/', async (req, res) => {
	try {
		const users = await User.find().sort({ createdAt: -1 });
		res.send(users);
	} catch (error) {
		res.status(500).send('Error: ' + error.message);
	}
});

router.post('/', async (req, res) => {
	try {
		const { name, email, phoneNumber } = req.body;

		if (!name || !email || !phoneNumber) {
			return res.status(400).send('Please Provide the all fields');
		}

		let user = new User({ name, email, phoneNumber });

		user = await user.save();

		res.send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

router.delete('/:id', async (req, res) => {
	console.log(req.params.id);
	const user = await User.findById({ _id: req.params.id });

	if (!user) return res.status(400).send('User not Found');

	const deletedUser = await User.findByIdAndDelete({ _id: req.params.id });

	res.send(deletedUser);
});

router.put('/:id', async (req, res) => {
	try {
		const user = await User.findById({ _id: req.params.id });

		if (!user) return res.status(400).send('User not found');

		const { name, email, phoneNumber } = req.body;
		console.log(req.body);

		const updatedUser = await User.findByIdAndUpdate(
			req.params.id,
			{
				name,
				email,
				phoneNumber,
			},
			{ new: true }
		);

		res.send(updatedUser);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

module.exports = router;
