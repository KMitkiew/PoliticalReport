import React from 'react';
import { Link, useParams } from 'react-router-dom';
import PoliticFeature from './PoliticFeature';
import EventBall from './EventBall';
import '../../css/PoliticProfile.css';
import { FaUserTie } from "react-icons/fa";
import { IconContext } from 'react-icons';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';

export default function PoliticProfile() {
	const params = useParams();
	const [politicInfo, setPoliticInfo] = React.useState({});
	const [politicStats, setPoliticStats] = React.useState({});
	const [isSubscribed, setIsSubscribed] = React.useState(false);
	const [events, setEvents] = React.useState([]);
	const [startDate, setStartDate] = React.useState(new Date());
	const refEvent = events.sort(
		(a, b) => new Date(b.date) - new Date(a.date)
	)[0];

	React.useEffect(() => {
		fetchPoliticData();
		fetchEventData();
		fetchUserInfo();
		fetchPoliticStats();
	}, []);

	//fetches politic info
	const fetchPoliticData = async () => {
		try {
			const response = await fetch(`/api/politic/${params.id}`,
			{
				method: 'GET',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data) {
				setPoliticInfo(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const fetchPoliticStats = async () => {
		try {
			const response = await fetch(`/api/politic/${params.id}/stats`,
			{
				method: 'GET',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data) {
				setPoliticStats(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	//fetechs user subscription status
	const fetchUserInfo = async () => {
		try {
			const response = await fetch(`/api/politic/${params.id}/user`,
			{
				method: 'GET',
				headers: {
					'Authorization': localStorage.getItem('token')
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data) {
				setIsSubscribed(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	//fetches data to keep track on politic activity
	const fetchEventData = async (
		start = new Date(startDate),
		end = new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
	) => {
		try {
			const response = await fetch(
				`/api/politic/${params.id}/events?start=${start}&end=${end}`,
				{
					method: 'GET',
					headers: {
						'Authorization': localStorage.getItem('token')
					},
				}
			);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			if (data.data.length > 0) {
				setEvents(data.data);
				newStartDate(data.data, start, end);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const changeSubscriptionStatus = async () => {
		try {
			const res0 = await fetch(`/api/politic/${params.id}/user`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify({ isSubscribed: !isSubscribed }),
			});

			const res1 = await fetch(`/api/politic/${params.id}/subscription`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify({ isSubscribed: !isSubscribed }),
			});

			if (!res0.ok || !res1.ok) {
				throw new Error('Network response was not ok');
			}

			setIsSubscribed(!isSubscribed);
		} catch (error) {
			console.log(error);
		}
	};

	//sets a date that allows you to change the time period on the axis
	function newStartDate(data, start, end) {
		let sortedEvents;

		if (start > end) {
			sortedEvents = data.sort((a, b) => new Date(a.date) - new Date(b.date))[0]
				.date;
			sortedEvents = new Date(sortedEvents);
			sortedEvents = sortedEvents.getTime() - 1 * 24 * 60 * 60 * 1000;
		} else {
			sortedEvents = data.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
				.date;
			sortedEvents = new Date(sortedEvents);
			sortedEvents = sortedEvents.getTime() + 1 * 24 * 60 * 60 * 1000;
		}
		setStartDate(new Date(sortedEvents));
	}

	//forms date to certain format
	const formatDate = (date) => {
		const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
		return new Date(date).toLocaleDateString(undefined, options);
	};

	//returns oldest and most recent event date
	function getExtremeDates() {
		if (events.length) {
			const mostRecentEvent = new Date(refEvent?.date);
			const oldestDisplayedEvent = new Date(
				mostRecentEvent.getTime() - 7 * 24 * 60 * 60 * 1000
			);
			const extremeDates = [
				formatDate(oldestDisplayedEvent),
				formatDate(mostRecentEvent),
			];
			return extremeDates;
		}
		return 0;
	}

	return (
		<div className='politic-profile-component'>
			<div className='politic-profile-container'>
				<div className='politic-stats'>
					{/* <img
						className='politic-image'
						src={politicPicture}></img> */}
					<FaUserTie className='politic-image' color='#9b9898'/>
					<div className='stats-container'>
						<p className='politic-event-number'>Wydarzenia:</p>
						<p className='politic-event-number'>{politicStats?.eventsNumber}</p>
					</div>
					<div className='stats-container'>
						<p className='politic-trust-percent'>Zaufanie: </p>
						<p>{politicStats?.trustLevel}%</p>
					</div>
					<button
						className='observe-politic-btn'
						style={isSubscribed ? { backgroundColor: '#9b9898' } : null}
						onClick={changeSubscriptionStatus}>
						{isSubscribed ? 'obserwujesz' : 'obserwuj'}
					</button>
				</div>
				<div className='politic-bio'>
					<h1 className='politic-name'>{`${politicInfo?.name} ${politicInfo?.surname}`}</h1>
					<p className='politic-short-info'>{politicInfo?.shortInfo}</p>
					<div className='separator'></div>
					<PoliticFeature
						featureName={'Przynależność partyjna'}
						feature={politicInfo?.partyAffilation}
					/>
					<div className='separator'></div>
					<PoliticFeature
						featureName={'Wykształcenie'}
						feature={politicInfo?.education}
					/>
					<div className='separator'></div>
					<PoliticFeature
						featureName={'Aktywność zawodowa'}
						feature={politicInfo?.career}
					/>
				</div>
			</div>
			<div className='timeline'>
				<div className='arrow'>
					<div className='arrow-line'></div>
					<i className='arrow-head'></i>
					{events?.map((event) => (
						<Link
							to={`/event/${event._id}`}
							className='link'
							key={event._id}>
							<EventBall
								key={event._id}
								refDate={refEvent?.date}
								date={event.date}
								likes={event.likes}
								dislikes={event.dislikes}
								title={event.title}
							/>
						</Link>
					))}
				</div>
				<div className='select-period'>
					<IconContext.Provider value={{ size: '1.2em' }}>
						<button
							className='change-period'
							disabled={!events.length}
							onClick={() =>
								fetchEventData(
									startDate,
									new Date(startDate.getTime() - 7 * 24 * 60 * 60 * 1000)
								)
							}>
							<MdArrowBackIos
								className={events.length ? 'arrow-btn' : 'disabled'}
							/>
						</button>
						<p className='period'>
							{events.length
								? `${getExtremeDates()[0]} - ${getExtremeDates()[1]}`
								: 'brak wydarzeń'}
						</p>
						<button
							className='change-period'
							disabled={!events.length}
							onClick={() =>
								fetchEventData(
									startDate,
									new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000)
								)
							}>
							<MdArrowForwardIos
								className={events.length ? 'arrow-btn' : 'disabled'}
							/>
						</button>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}
