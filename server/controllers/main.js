const Event = require('../db/models/event.model');
const Politic = require('../db/models/politic.model'); //potrzebne do zdjęć w miniaturkach

const getEvents = async (req, res) => {
	try {
		const { limit } = req.query;
		const events = await Event.find().limit(limit);

		if (events.length < 1) {
			return res.status(200).json({ success: true, data: [] });
		}

		const sortedEvents = events.map((event) => ({
			id: event.id,
			title: event.title,
			politicsInvolved: event.politicsInvolved,
			likes: event.likes,
			dislikes: event.dislikes
		}));

		res.status(200).json(sortedEvents);
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

module.exports = { getEvents };
