import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserTie } from "react-icons/fa";
// import politicPicture from '../../img/tusk.jpg';
import '../../css/ObservedPolitics.css'

export default function ObservedPolitics() {
	const [politicData, setPoliticData] = React.useState([]);

	React.useEffect(()=>{ 
		fetchObservedPolitics()
	}, [])

	const fetchObservedPolitics = async () => {
		try {
			const response = await fetch(`/api/user/observations`,
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
				setPoliticData(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	const changeSubscriptionStatus = async (event, politicId) =>{
		try {
			event.preventDefault();
			const res0 = await fetch(`/api/user/observations/${politicId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify({isSubscribed: false})
			})

			const res1 = await fetch(`/api/user/subscription/${politicId}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify({ isSubscribed: false }),
			});

			if(!res0.ok || !res1.ok){
				throw new Error('Network response was not ok');
			}
			
			setPoliticData((prevPoliticData) => {
				const updatedPoliticData = prevPoliticData.filter(
					(politic) => politic.id !== politicId
				);
	
				return updatedPoliticData;
			});

		} catch(error) { 
			console.log(error)
		}
	}

	return (
		<div className='observed-politics'>
			<div className='section-title-container'>
				<h1 className='section-title'>Obserwowani politycy</h1>
			</div>
			<ul className='politics-list'>
				{politicData ? politicData.map((politic) => (
					<Link
						to={`/politic/${politic.id}`}
						className='link'
						key={politic.id}>
						<li className='observed-politic'>
							{/* <img
								className='politic-profile-img'
								src={politicPicture}
								alt='politic face'
							/> */}
							<FaUserTie className='politic-profile-img' color='#23eac6'/>
							{`${politic.name} ${politic.surname}`}
							<button 
								className='delete-observation-btn'
								onClick={(event) => changeSubscriptionStatus(event, politic.id)}
							>
								usuń
							</button>
						</li>
					</Link>
				)) : 'brak subskrybcji'}
			</ul>
		</div>
	);
}
