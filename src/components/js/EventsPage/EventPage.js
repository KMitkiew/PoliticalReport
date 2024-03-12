import React from 'react';
import { useParams } from 'react-router-dom';
import '../../css/EventPage.css';
import { IconContext } from 'react-icons';
import { RiArrowRightDoubleFill } from 'react-icons/ri';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import CommentsSection from './CommentsSection';

export default function EventPage() {
	const params = useParams();
	const [isClicked, setIsClicked] = React.useState({
		likes: false,
		dislikes: false,
	});
	const [event, setEvent] = React.useState({});
	const supportPercentage = Math.floor(
		(event.likes / (event.likes + event.dislikes)) * 100
	);

	React.useEffect(() => {
		fetchData();
		wasSeen();
	}, []);

	const fetchData = async () => {
		try {
			const eventResponse = await fetch(`/api/event/${params.id}`, {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			});
			const likesResponse = await fetch(`/api/event/likes/${params.id}`, {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			});

			if (!eventResponse.ok) {
				throw new Error('Error fetching event data');
			}

			const eventData = await eventResponse.json();
			setEvent(eventData.data);

			if (!likesResponse.ok) {
				throw new Error('Error fetching likes data');
			}

			const likesData = await likesResponse.json();
			setIsClicked(likesData.data);
		} catch (error) {
			console.error('Error fetching data:', error.message);
		}
	};

	const wasSeen = async () => {
		try {
			const res = await fetch(`/api/event/visited`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({ wasSeen: Number(params.id) }),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error(error);
		}
	};

	const updateData = async (name) => {
		try {
			const newReactionData = handleClick(name);
			const reactionCount = specifyReaction(newReactionData, isClicked);

			const [res1, res2] = await Promise.all([
				fetch(`/api/event/likes/${params.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
					body: JSON.stringify(newReactionData),
				}),
				fetch(`/api/event/likes/${params.id}/value`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: localStorage.getItem('token'),
					},
					body: JSON.stringify({ changeType: reactionCount }),
				}),
			]);

			setIsClicked(newReactionData);
			if (!res1.ok || !res2.ok) {
				throw new Error('One or more network responses were not ok');
			}

			// setIsClicked(newReactionData);
		} catch (error) {
			console.error('Error updating data:', error.message);
		}
	};

	function handleClick(name) {
		if (Object.values(isClicked).every((value) => value !== true)) {
			return {
				...isClicked,
				[name]: !isClicked[name],
			};
		} else if (isClicked[name] === true) {
			return {
				...isClicked,
				[name]: false,
			};
		} else {
			return {
				likes: !isClicked.likes,
				dislikes: !isClicked.dislikes,
			};
		}
}

	function specifyReaction(changedReactions, previousReactions) {
		console.log(changedReactions, previousReactions)
		if (
			changedReactions.likes === true &&
			previousReactions.likes === false &&
			changedReactions.dislikes === false &&
			previousReactions.dislikes === false
		) {
			return 'like';
		} else if (
			changedReactions.likes === false &&
			previousReactions.likes === true &&
			changedReactions.dislikes === false &&
			previousReactions.dislikes === false
		) {
			return 'no-like';
		} else if (
			changedReactions.likes === true &&
			previousReactions.likes === false &&
			changedReactions.dislikes === false &&
			previousReactions.dislikes === true
		) {
			return 'like-no-dislike';
		} else if (
			changedReactions.dislikes === true &&
			previousReactions.dislikes === false &&
			changedReactions.likes === false &&
			previousReactions.likes === false
		) {
			return 'dislike';
		} else if (
			changedReactions.dislikes === false &&
			previousReactions.dislikes === true &&
			changedReactions.likes === false &&
			previousReactions.likes === false
		) {
			return 'no-dislike';
		} else if (
			changedReactions.dislikes === true &&
			previousReactions.dislikes === false &&
			changedReactions.likes === false &&
			previousReactions.likes === true
		) {
			return 'dislike-no-like';
		} else{
			return 'wrong'
		}
	}

	function calculateColor(percentage) {
		const hue = (percentage / 100) * 120;
		const color = `hsl(${hue}, 100%, 50%)`;
		return color;
	}

	function formDate(date) {
		const newDate = new Date(date);

		const day = newDate.getDate();
		const month = newDate.getMonth() + 1;
		const year = newDate.getFullYear();

		return `${day}-${month}-${year}`;
	}

	return (
		<>
			<CommentsSection />
			<div className='event-page'>
				<div className='top-line'></div>
				<div
					className='solidarity-percentage'
					style={{
						backgroundColor: supportPercentage ? calculateColor(supportPercentage) : "#23eac6",
					}}>
					{supportPercentage ? `${supportPercentage}%` : '0%'}
				</div>
				<p className='date-of-occurance'>{formDate(event.date)}</p>
				<p className='short-description'>{event.title}</p>
				<p className='event-type'>
					<span className='make-it-bold'>Zdarzenie: </span>
					{event.shortDescription}
				</p>
				<p className='make-it-bold'>Źródła:</p>
				<IconContext.Provider
					value={{ color: '#23eac6', size: '1.4em', className: 'center-icon' }}>
					<ul className='source-list'>
						{event.source?.map((item) => (
							<li
								className='source-list-el'
								key={item}>
								<RiArrowRightDoubleFill />
								<a href={item}>{item}</a>
							</li>
						))}
					</ul>
				</IconContext.Provider>
				<div className='reaction-container'>
					<IconContext.Provider value={{ color: '#23eac6', size: '2.5em' }}>
						{isClicked.likes ? (
							<BiSolidLike
								onClick={() => updateData('likes')}
								className='like-btn'
							/>
						) : (
							<BiLike
								onClick={() => updateData('likes')}
								className='like-btn'
							/>
						)}
						{isClicked.dislikes ? (
							<BiSolidDislike
								onClick={() => updateData('dislikes')}
								className='dislike-btn'
							/>
						) : (
							<BiDislike
								onClick={() => updateData('dislikes')}
								className='dislike-btn'
							/>
						)}
					</IconContext.Provider>
				</div>
			</div>
		</>
	);
}
