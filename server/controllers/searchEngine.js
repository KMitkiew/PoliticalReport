const Politic = require('../db/models/politic.model');
const Event = require('../db/models/event.model');

const getPolitics = async (req, res) => {
	try {
		const { limit, search } = req.query;

		let query = {};

		if (search) {
			query.$text = { $search: search }; 
		}

		let sortedPolitics = await Politic.find(query);

		if (limit) {
			sortedPolitics = sortedPolitics.slice(0, Number(limit));
		}

		if (sortedPolitics.length < 1) {
			return res.status(200).json({ success: true, data: [] });
		}

		sortedPolitics = sortedPolitics.map((politic) => ({
			id: politic._id,
			name: politic.name,
			surname: politic.surname,
			party: politic.partyAffilation,
			trustLevel: politic.trustLevel,
			status: politic.status,
		}));

		res.status(200).json(sortedPolitics);
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error' });
	}
};


const getTrustLevel = async(req, res) => {
	try {
		const { politicId } = req.params;

		const events = await Event.find({politicsInvolved: politicId});

		if (events.length < 1) {
			return res.status(200).json({ success: true, data: 0 });
		}

		const sumLikes = events.reduce((accumulator, currentObject) => {
			return accumulator + currentObject.likes;
		}, 0);
		
		const sumDislikes = events.reduce((accumulator, currentObject) => {
			return accumulator + currentObject.dislikes;
		}, 0);

		const trustLevel = Math.floor(sumLikes / (sumLikes+sumDislikes) * 100) 

		res.status(200).json({ success: true, data: trustLevel });
	} catch (error) {
		console.error(error);
		res.status(500).send('Internal server error');
	}
}

module.exports = { getPolitics, getTrustLevel };
