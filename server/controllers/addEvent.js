const EventProposition = require('../db/models/eventProposition.model')
const Event = require('../db/models/event.model');
const mongoose = require('mongoose');

const postEvent = async (req, res) => {
	try {
		const { body } = req;
		const politicsInvolvedIds = body.politicsInvolved.map(politicianId => new mongoose.Types.ObjectId(politicianId));
		const event = new Event({ ...req.body, politicsInvolved:  politicsInvolvedIds});
		await event.save();
		res.status(201).json({ success: true, data: body });

		if (!body) {
			return res
				.status(400)
				.json({ success: false, message: 'no data provided' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const getNewEvents = async (req, res) => {
	try {
		const { limit, search } = req.query;

		let query = {};

		if (search) {
			query.$text = { $search: search }; 
		}

		let sortedPolitics = await EventProposition.find(query);

		if (limit) {
			sortedPolitics = sortedPolitics.slice(0, Number(limit));
		}

		if (sortedPolitics.length < 1) {
			return res.status(200).json({ success: true, data: [] });
		}

		sortedPolitics = sortedPolitics.map((event) => ({
			_id: event._id,
			title: event.title,
			shortDescription: event.shortDescription,
			source: event.source,
			politicInvolved: event.politicInvolved,
			date: event.date
		}));

		res.status(200).json(sortedPolitics);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

module.exports = { postEvent, getNewEvents };
