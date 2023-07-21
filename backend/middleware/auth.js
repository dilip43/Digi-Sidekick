const jwt = require('jsonwebtoken');
const Admin = require('../model/admin');

exports.isAuthenticated = async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) {
		return res.status(401).json({
			message: 'Please login to continue',
		});
	}

	const decoded = jwt.verify(token, '2FxXT1NTf2K1Mo4i6AOvtdI');

	req.admin = await Admin.findById({ _id: decoded.id });
	next();
};
