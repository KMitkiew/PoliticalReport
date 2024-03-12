const Politic = require('../db/models/politic.model');

const getPolitics = async (req, res) => {
    try {
        const politicians = await Politic.find().sort({ subscriptions: -1 }).limit(10);

        if (politicians.length < 1) {
            return res.status(200).json({ success: true, data: [] });
        }

        const sortedPolitics = politicians.map((politician) => ({
            id: politician._id,
            name: politician.name,
            surname: politician.surname,
            newEvents: politician.newEvents,
        }));

        res.status(200).json(sortedPolitics);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { getPolitics };
