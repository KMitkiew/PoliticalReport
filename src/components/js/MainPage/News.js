import React from 'react';
import '../../css/News.css';
// import politicPicture from '../../img/tusk.jpg';
import { FaUserTie } from "react-icons/fa";

export default function News(props) {
	const supportPercentage =  Math.floor(props.data.likes/(props.data.likes + props.data.dislikes)*100);

	function calculateColor(percentage) {
		const hue = (percentage / 100) * 120;
		const color = `hsl(${hue}, 100%, 50%)`;
		return color;
	}
	
	return (
		<div className='event'>
			<div className='mood-level'>
				<div
					className='support-level-ball'
					style={{
						backgroundColor: supportPercentage ? calculateColor(supportPercentage) : "#23eac6",
					}}>
					<p>{supportPercentage ? `${supportPercentage}%` : '0%'}</p>
				</div>
			</div>
			<p className='event-name'>{props.data && props.data.title}</p>
			<div className='politics-data'>
				{/* <img
					src={politicPicture}
					className='politic-img first-img'>
				</img> */}
				<FaUserTie className='politic-img first-img' color="#9b9898"/>
				{props.data.politicsInvolved.length > 1 ? 
				// <img
				// 	src={politicPicture}
				// 	className='politic-img second-img'>
				// </img>
				<FaUserTie className='politic-img second-img' color="#9b9898"/>
				: " "}
				{props.data.politicsInvolved.length > 2 ? (
					<div className='politics-number'>
						<p>+{props.data.politicsInvolved.length - 2}</p>
					</div>
				) : (
					<div style={{ marginRight: '20px' }}></div>
				)}
			</div>
		</div>
	);
}
