const Event = require('../db/models/event.model');
const User = require('../db/models/user.model');

const getEvent = async (req, res) => {
	try {
		const { id } = req.params;
		const event = await Event.findOne({ _id: id });

		if (!event) {
			return res
				.status(404)
				.json({ success: false, message: `no event with such id` });
		}

		const newEvent = {
			eventId: event._id,
			title: event.title,
			date: event.date,
			shortDescription: event.shortDescription,
			source: event.source,
			likes: event.likes,
			dislikes: event.dislikes,
		};

		res.status(200).json({ success: true, data: newEvent });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const wasSeen = (req, res) => {
	//to future implementation
	const { body } = req;

	if (!body) {
		return res
			.status(400)
			.json({ success: false, msg: 'no data was received' });
	}

	res.status(201).json({ success: true, data: body });
};

const getReactions = async (req, res) => {
	try {
		const { eventId } = req.params;
		const userId = req.user._id;
		const userData = await User.findOne({ _id: userId });

		if (!userData) {
			return res
				.status(404)
				.json({ success: false, message: `No user with such id` });
		}

		const userReaction = {
			likes: userData.likes && userData.likes.includes(eventId),
			dislikes: userData.dislikes && userData.dislikes.includes(eventId),
		};

		res.status(200).json({ success: true, data: userReaction });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const putReactions = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { dislikes, likes } = req.body;
		const userId = req.user._id;

		let updateQuery = {};
		
		if (dislikes && !likes) {
			updateQuery = {
				$push: { dislikes: eventId },
				$pull: { likes: eventId },
			};
		} else if (!dislikes && likes) {
			updateQuery = {
				$pull: { dislikes: eventId },
				$push: { likes: eventId },
			};
		} else if (!dislikes && !likes) {
			updateQuery = {
				$pull: { dislikes: eventId, likes: eventId },
			};
		} else {
			return res.status(500).json({
				success: false,
				message: 'Failed to update user reactions',
			});
		}

		const result = await User.updateOne({ _id: userId }, updateQuery);

		if (!result.modifiedCount) {
			return res.status(500).json({
				success: false,
				message: 'Failed to update user reactions',
			});
		}

		res
			.status(201)
			.json({ success: true, message: 'Data was successfully updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const reactionCount = async (req, res) => {
	try {
		const { eventId } = req.params;
		const { changeType } = req.body;

		const validChangeTypes = [
			'like',
			'no-like',
			'like-no-dislike',
			'dislike',
			'no-dislike',
			'dislike-no-like',
		];

		if (!validChangeTypes.includes(changeType)) {
			return res
				.status(400)
				.json({ success: false, message: 'Invalid changeType value' });
		}

		const updateOperations = {
			'like': { $inc: { likes: 1 } },
			'no-like': { $inc: { likes: -1 } },
			'like-no-dislike': { $inc: { likes: 1, dislikes: -1 } },
			'dislike': { $inc: { dislikes: 1 } },
			'no-dislike': { $inc: { dislikes: -1 } },
			'dislike-no-like': { $inc: { dislikes: 1, likes: -1 } },
		};

		const updateQuery = updateOperations[changeType];

		const result = await Event.updateOne({ _id: eventId }, updateQuery);

		if (!result.modifiedCount) {
			return res
				.status(500)
				.json({ success: false, message: 'Failed to update reaction count' });
		}

		res
			.status(201)
			.json({
				success: true,
				message: 'Reaction count was successfully updated',
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

module.exports = {
	getEvent,
	getReactions,
	putReactions,
	wasSeen,
	reactionCount,
};
