const User = require('../db/models/user.model');
const Event = require('../db/models/event.model');
const Politic = require('../db/models/politic.model');

const getPoliticInfo = async (req, res) => {
	try {
		const { id } = req.params;
		const politicData = await Politic.findOne({ _id: id });

		if (!politicData) {
			return res
				.status(404)
				.json({ success: false, msg: `no politic with such id was found` });
		}

		res.status(200).json({ success: true, data: politicData });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const getPoliticStats = async (req, res) => {
	try {
		const { id } = req.params;

		const events = await Event.find({ politicsInvolved: id });

		if (events.length < 1) {
			return res.status(200).json({ success: true, data: { trustLevel: 0, eventsNumber: 0}});
		}

		const sumLikes = events.reduce((accumulator, currentObject) => {
			return accumulator + currentObject.likes;
		}, 0);

		const sumDislikes = events.reduce((accumulator, currentObject) => {
			return accumulator + currentObject.dislikes;
		}, 0);

		const trustLevel = Math.floor((sumLikes / (sumLikes + sumDislikes)) * 100);
		const eventsNumber = events.length;

		res
			.status(200)
			.json({
				success: true,
				data: { trustLevel: trustLevel, eventsNumber: eventsNumber },
			});
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
};

const getUserInfo = async (req, res) => {
	try {
		const { id } = req.params;
		const userId = req.user._id
		const userData = await User.findOne({ _id: userId });

		let subscriptionStatus = false;

		if (userData?.observedPolitics.length > 0) {
			subscriptionStatus = userData.observedPolitics.includes(id);
		}

		if (!userData) {
			return res
				.status(404)
				.json({ success: false, message: `no user with such id` });
		}

		res.status(200).json({ success: true, data: subscriptionStatus });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const changeSubscriptionStatus = async (req, res) => {
	try {
		const { id } = req.params;
		const { isSubscribed } = req.body;

		const userId = req.user._id
		
		if (!req.body) {
			return res
				.status(400)
				.json({ success: false, msg: 'No data was received' });
		}

		if (!isSubscribed) {
			const result = await User.updateOne(
				{ _id: userId },
				{ $pull: { observedPolitics: id } }
			);
			res
			.status(201)
			.json({ success: true, message: 'Subscription was cancelled' });
		} else {
			const result = await User.updateOne(
				{ _id: userId },
				{ $push: { observedPolitics: id } }
			);
			res
			.status(201)
			.json({ success: true, message: 'Subscription was added' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const changeSubscriptionNumber = async (req, res) => {
    try {
        const { id } = req.params;
        const { isSubscribed } = req.body;

        if (!id) {
            return res.status(400).json({ success: false, msg: 'Invalid or missing ID' });
        }

        if (isSubscribed === undefined) {
            return res.status(400).json({ success: false, msg: 'Missing isSubscribed in the request body' });
        }

        const updateQuery = {};

        if (isSubscribed) {
            updateQuery.$inc = { subscriptions: 1 };
        } else {
            updateQuery.$inc = { subscriptions: -1 };
        }

        const result = await Politic.updateOne({ _id: id }, updateQuery);

        res.status(201).json({ success: true, message: 'Subscription number was updated' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


const getEvents = async (req, res) => {
	try {
		const { id } = req.params;
		let { start, end } = req.query;

		const politicianEvents = await Event.find({
			politicsInvolved: { $in: id },
		});

		if (politicianEvents.length === 0) {
			return res.status(404).json({
				success: false,
				message: `No events found for politician with such id`,
			});
		}

		let sortedEvents = politicianEvents.sort((a, b) => b.date - a.date);

		if (start && end) {
			start = new Date(start);
			end = new Date(end);
			const spanArr = start > end ? [end, start] : [start, end];

			let finalEvents = filterEventsByDate(sortedEvents, spanArr, start, end);
			
			res.status(200).json({ success: true, data: finalEvents });
		} else {
			res.status(200).json({ success: true, data: sortedEvents });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};

const filterEventsByDate = (events, spanArr, start, end) => {
	const filteredEvents = events.filter((event) => {
		const eventDate = new Date(event.date);
		return eventDate >= spanArr[0] && eventDate <= spanArr[1];
	});

	if (filteredEvents.length === 0) {
		const refDate = findReferenceDate(events, start, end);
		if (refDate) {
			const refDateObj = new Date(refDate.date);
			const offset = end < start ? -7 : 7;
			const refDateWithOffset = new Date(
				refDateObj.getTime() + offset * 24 * 60 * 60 * 1000
			);

			return end < start
				? events.filter((event) => {
						const eventDate = new Date(event.date);
						return eventDate >= refDateWithOffset && eventDate <= refDateObj;
				  })
				: events.filter((event) => {
						const eventDate = new Date(event.date);
						return eventDate <= refDateWithOffset && eventDate >= refDateObj;
				  });
		}
	}

	return filteredEvents;
};

const findReferenceDate = (events, start, end) => {
	const filteredEvents =
		end < start
			? events.filter((event) => new Date(event.date) < end)
			: events.filter((event) => new Date(event.date) > end);

	const reversedSortedEvents = filteredEvents.sort(
		(a, b) =>
			new Date(end < start ? b.date : a.date) -
			new Date(end < start ? a.date : b.date)
	);

	return reversedSortedEvents[0];
};

module.exports = {
	getPoliticInfo,
	getPoliticStats,
	getUserInfo,
	getEvents,
	changeSubscriptionStatus,
	changeSubscriptionNumber
};
