import React from 'react';
import '../../../css/SideMenu.css';
import SideMenuForm from './SideMenuForm';

export default function LeftSideMenu() {
	const [observedPolitics, setObservedPolitics] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false);
	const token = localStorage.getItem("token")

	React.useEffect(()=>{ 
		fetchData()
	}, [])

	const fetchData = async () => {
		if (isLoading) {
		  	return;
		}
	  
		try {
		  	setIsLoading(true);
	  
		  	const response = await fetch(`/api/left-side-menu`,
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
		  	setObservedPolitics(data)
	  
		} catch (error) {
		  	console.error('Error fetching data:', error);
		} finally {
		  	setIsLoading(false);
		}
	  };
	
	return (
		<div className='side-menu left-side'>
			<SideMenuForm 
				componentName={'Obserwowani'} 
				data={observedPolitics}
			/>
		</div>
	);
}
