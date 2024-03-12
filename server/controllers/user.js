const User = require('../db/models/user.model');
const Politic = require('../db/models/politic.model');

const getUserData = async (req, res) => {
	try {
		const userId = req.user._id
		
		const relatedUser = await User.findOne({ _id: userId});

		if (relatedUser) {
			res.status(200).json({ success: true, data: relatedUser });
		} else {
			res.status(404).send('No user with such ID was found');
		}
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal Server Error');
	}
};

const createUser = async (req, res) => {
	try {
		const user = new User(req.body);
		await user.save();
		return res.status(200).send('user was created');
	} catch (error) {
		console.error('Error occured during user creation');
		res.status(404).send('Error occured during user creation');
	}
};

const updateUserData = async (req, res) => {
	try {
		if (!req.body) {
			return res
				.status(400)
				.json({ success: false, message: 'No data provided for update' });
		}

		const userId = req.user._id
		const updateFields = {
			name: req.body.name,
			surname: req.body.surname,
			email: req.body.email,
			password: req.body.password,
			birthDate: req.body.birthDate,
			population: req.body.population
		};

		const result = await User.updateOne(
			{ _id: userId },
			{ $set: updateFields }
		);

		if (result.modifiedCount > 0) {
			res
				.status(200)
				.json({ success: true, message: 'User data updated successfully' });
		} else {
			res
				.status(404)
				.json({
					success: false,
					message: 'No user with such ID was found or no changes were made',
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const getPoliticData = async (req, res) => {
	try {
		const userId = req.user._id

		const userData = await User.findOne({ _id: userId });

		if (!userData) {
			return res
				.status(404)
				.json({ success: false, message: 'No user data found' });
		}

		const observedPolitics = userData.observedPolitics;

		const politicData = await Politic.find({ _id: { $in: observedPolitics } });

		const formattedPoliticData = politicData.map((politic) => ({
			id: politic._id,
			name: politic.name,
			surname: politic.surname,
		}));

		res.status(200).json({ success: true, data: formattedPoliticData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const changeSubscriptionNumber = async (req, res) => {
    try {
        const { politicId } = req.params;
        const { isSubscribed } = req.body;

        if (!politicId) {
            return res.status(400).json({ success: false, msg: 'Invalid or missing ID' });
        }

        if (isSubscribed === undefined) {
            return res.status(400).json({ success: false, msg: 'Missing isSubscribed in the request body' });
        }

        const updateQuery = {};

        updateQuery.$inc = { subscriptions: -1 };

        const result = await Politic.updateOne({ _id: politicId }, updateQuery);

        res.status(201).json({ success: true, message: 'Subscription number was updated' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

const updateSubscriptionStatus = async (req, res) => {
	try {
		const { politicId } = req.params;
		const userId = req.user._id

		if (!userId || !politicId) {
			return res
				.status(400)
				.json({ success: false, message: 'userId and politicId are required' });
		}

		const result = await User.updateOne(
			{ _id: userId },
			{ $pull: { observedPolitics: politicId } }
		);

		if (result.modifiedCount > 0) {
			res
				.status(200)
				.json({
					success: true,
					message: 'Subscription status updated successfully',
				});
		} else {
			res
				.status(404)
				.json({
					success: false,
					message: 'No user or politic found, or no changes were made',
				});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

module.exports = {
	getUserData,
	updateUserData,
	getPoliticData,
	updateSubscriptionStatus,
	changeSubscriptionNumber,
	createUser,
};
