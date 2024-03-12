const User = require('../db/models/user.model');

const getUsername = async (req, res) => {
	try {
		const userId = req.user._id
		
		const relatedUser = await User.findOne({ _id: userId});
		console.log(relatedUser)
        const userData = {email: relatedUser.email, isAdmin: relatedUser.isAdmin}

		if (relatedUser) {
			res.status(200).json({ success: true, data: userData });
		} else {
			res.status(404).send('No user with such ID was found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

module.exports = { getUsername };