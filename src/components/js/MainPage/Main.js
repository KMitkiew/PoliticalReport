import React from 'react';
import { Link } from 'react-router-dom';
import News from './News';
import '../../css/Main.css';
import LeftSideMenu from '../SiteComponents/SideMenu/LeftSideMenu';
import RightSideMenu from '../SiteComponents/SideMenu/RightSideMenu';

export default function Main() {
	const [news, setNews] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const newsContainerRef = React.useRef(null);

	React.useEffect(()=>{ 
		fetchData()
	}, [])

	const fetchData = async () => {
		if (isLoading) {
		  	return;
		}
	  
		try {
		  	setIsLoading(true);
	  
		  	const response = await fetch(`/api/main/query?limit=${(news.length) + 6}`,
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
		  	setNews(data)
	  
		} catch (error) {
		  	console.error('Error fetching data:', error);
		} finally {
		  	setIsLoading(false);
		}
	};

	const handleScroll = () => {
		const container = newsContainerRef.current;
		if (
			!container ||
			container.clientHeight + container.scrollTop + 3 <=
				container.scrollHeight ||
			isLoading
		) {
			return;
		}
		fetchData();
	};

	React.useEffect(() => {
		const newsContainer = newsContainerRef.current;
		if (newsContainer) {
			newsContainer.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (newsContainer) {
				newsContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, [isLoading]);

	return (
		<>
			<LeftSideMenu />
			<RightSideMenu />
			<div className='main'>
				<div className='recent-news'>
					<h4>Nowe wydarzenia</h4>
				</div>
				<div
					className='news-container'
					ref={newsContainerRef}>
					{news.map((event) => (
						<Link
							to={`/event/${event.id}`}
							className='link'
							key={event.id}>
							<News
								key={event.id}
								data={event}
							/>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}
