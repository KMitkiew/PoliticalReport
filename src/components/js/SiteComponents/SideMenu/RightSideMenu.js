import React from 'react';
import '../../../css/SideMenu.css';
import SideMenuForm from './SideMenuForm';
//fetchowanie 10 polityków w oparciu o największą liczbę polubień i komentrzy w danym dniu / jeżeli brak reakcji bierzemy pod uwagę największą liczbę reakcji ogółem
export default function RightSideMenu() {
	const [popularPolitics, setPopularPolitics] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(false);
	

	React.useEffect(()=>{ 
		fetchData()
	}, [])

	const fetchData = async () => {
		if (isLoading) {
		  	return;
		}
	  
		try {
		  	setIsLoading(true);
	  
		  	const response = await fetch(`/api/right-side-menu`,
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
		  	setPopularPolitics(data)
	  
		} catch (error) {
		  	console.error('Error fetching data:', error);
		} finally {
		  	setIsLoading(false);
		}
	  };

	return (
		<div className='side-menu right-side'>
			<SideMenuForm 
				componentName={'Popularni dzisiaj'} 
				data={popularPolitics}
				range={10}
			/>
		</div>
	);
}
