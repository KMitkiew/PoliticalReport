import React from "react";
import "../../css/SearchResult.css";
// import politicPicture from '../../img/tusk.jpg'
import { FaUserTie } from "react-icons/fa";

export default function SearchResult(props){
	const [trustLevel, setTrustLevel] = React.useState(`0%`);

	React.useEffect(()=>{ 
		fetchData()
	}, [])

	const fetchData = async () => { 
		try {
			console.log(props.data.id)
		  	const response = await fetch(`/api/search-engine/${props.data.id}`,
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
		  	setTrustLevel(data.data)
	  
		} catch (error) {
		  	console.error('Error fetching data:', error);
		} 
	};

    return (
		<div className='politic-profile'>
			{/* <img className='politic-profile-pic' src={politicPicture} alt="politic profile"></img> */}
			<FaUserTie className='politic-profile-pic'	color="#9b9898"/>
			<div className='politic-data'>
                <p className="politic-dignity">{`${props.data.name.toUpperCase()} ${props.data.surname.toUpperCase()}`}</p>
                <p className="politic-party">{`Partia: ${props.data.party[0]}`}</p>
                <p className="social-credit">{`Zaufanie: ${trustLevel}%`}</p>
                <p className="status">{`Status: ${props.data.status}`}</p>
			</div>
		</div>
	);
}