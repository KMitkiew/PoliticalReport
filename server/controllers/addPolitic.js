const Politic = require('../db/models/politic.model');

const postPolitic = async (req, res) => {
	try {
		const { body } = req;
		const politic = new Politic({ ...req.body });
		await politic.save();
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

module.exports = { postPolitic };
