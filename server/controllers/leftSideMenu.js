const Politic = require('../db/models/politic.model');
const User = require('../db/models/user.model');

const getPolitics = async (req, res) => {
	try {
		const userId = req.user._id

		const userData = await User.findOne({ _id: userId });

		if (!userData) {
			return res
				.status(404)
				.json({ success: false, msg: 'No user data found' });
		}

		const observedPolitics = userData.observedPolitics;

		const politicData = await Politic.find({ _id: { $in: observedPolitics } });

		if (politicData.length < 1) {
			return res.status(200).json({ success: true, data: [] });
		}

		const formattedPoliticData = politicData.map((politic) => ({
			id: politic._id,
			name: politic.name,
			surname: politic.surname,
		}));

		res.status(200).json(formattedPoliticData);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

module.exports = { getPolitics };
