import React from 'react';
import { Link } from 'react-router-dom';
import SearchResult from './SerachResult';
import '../../css/SearchEngine.css';
import LeftSideMenu from '../SiteComponents/SideMenu/LeftSideMenu';
import RightSideMenu from '../SiteComponents/SideMenu/RightSideMenu';
import { debounce } from 'lodash';

export default function SearchEngine() {
	const [searchInput, setSearchInput] = React.useState('');
	const [results, setResults] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const resultsContainerRef = React.useRef(null);
	const resultsLengthRef = React.useRef(results.length);

	React.useEffect(()=>{ 
		fetchData()
	}, [])

	React.useEffect(() => {
		resultsLengthRef.current = results.length;
	}, [results.length]);

	const request = debounce((searchInput) => {
		fetchData(searchInput, false)
	}, 500)

	const debounceRequest = React.useCallback(
		(searchInput) => request(searchInput),
		[]
	)

	//handle changes commited in searchbar
	function handleChange(event) {
		setSearchInput(event.target.value);
		debounceRequest(event.target.value);
	}

	//adds listener on results-container
	React.useEffect(() => {
		const resultsContainer = resultsContainerRef.current;
		if (resultsContainer) {
			resultsContainer.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (resultsContainer) {
				resultsContainer.removeEventListener('scroll', handleScroll);
			}
		};
	}, [isLoading]);
	
	//allows to fetch more data if needed
	const fetchData = async (currentSearchInput='', resetter=true) => {
		if (isLoading) {
			return;
		}

		try {
			setIsLoading(true);

			const response = await fetch(`/api/search-engine/query?limit=${resetter ? results.length + 6 : 6}&search=${currentSearchInput}`,
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
				setResults(data)
		  
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setIsLoading(false);
	  	}
	};

	//controls the scroll position and calls the fetch function
	const handleScroll = () => {
		const container = resultsContainerRef.current;
		if (
			!container ||
			container.clientHeight + container.scrollTop + 3 <=
				container.scrollHeight ||
			isLoading
		) {
			return;
		}
		fetchData(searchInput);
	};

	return (
		<>
			<LeftSideMenu />
			<RightSideMenu />
			<div className='search-engine'>
				<div className='search-engine-container'>
					<input
						className='search-bar'
						type='text'
						placeholder='Wyszukaj interesującą cię postać...'
						value={searchInput}
						onChange={handleChange}
					/>
				</div>
				<div
					className='results-container'
					ref={resultsContainerRef}>
					{results.length > 0 ? (
						results.map((result) => (
							<Link
								to={`/politic/${result.id}`}
								className='link'
								key={result.id}>
								<SearchResult
									key={result.id}
									data={result}
								/>
							</Link>
						))
					) : (
						<p className='center'>Nie znaleziono wyników :(</p>
					)}
				</div>
			</div>
		</>
	);
}
