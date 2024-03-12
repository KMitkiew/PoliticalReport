const connectDb = require('./db/connect');
const Politic = require('./db/models/politic.model');
const EventProposition = require('./db/models/eventProposition.model');
require('dotenv').config();
const fetch = require('node-fetch-commonjs');
const { createEvent } = require('@testing-library/react');

const getPolitics = async () => {
	const politics = await Politic.find();

	return politics;
};

const getDateFromSnippet = (snippet) => {
	const parts = snippet.split(' ');
	const monthAbbreviation = parts[0];
	const day = parts[1];
	const year = parts[2];

	const monthMap = {
		Jan: '01',
		Feb: '02',
		Mar: '03',
		Apr: '04',
		May: '05',
		Jun: '06',
		Jul: '07',
		Aug: '08',
		Sep: '09',
		Oct: '10',
		Nov: '11',
		Dec: '12',
	};

	const month = monthMap[monthAbbreviation];
	const fullDate = year + '-' + month + '-' + day;
	const date = new Date(fullDate);

	if (isNaN(date.getTime())) {
		return new Date();
	} else {
		return date;
	}
};

const callToAPI = async (politicName) => {
	try {
		const response = await fetch(
			`https://customsearch.googleapis.com/customsearch/v1?key=${process.env.API_KEY}
			&q=${politicName}&cx=${process.env.SEARCH_ENGINE_ID}`)

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		const data = await response.json();

		return data.items;
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const createEvents = async (politics) => {
	for (let politic of politics) {
		const politicEventsData = await callToAPI(`${politic.name} ${politic.surname}`);
		for (let event of politicEventsData) {
			const eventProposition = new EventProposition({
				date: getDateFromSnippet(event.snippet),
				title: event.title,
				source: event.link,
				shortDescription: event.pagemap.metatags[0]['og:description'],
				politicInvolved: politic._id,
			});
			await eventProposition.save();
		}
	}
};

const start = async () => {
	try {
		await connectDb(process.env.MONGO_DB_URL);
		await EventProposition.deleteMany({});
		const politics = await getPolitics();
		await createEvents(politics);
		process.exit();
	} catch (error) {
		console.log(error);
	}
};

start();
