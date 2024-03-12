import React from 'react';
import { Link } from 'react-router-dom'
import '../../../css/PoliticTag.css';
import { FaUserTie } from "react-icons/fa";
// import politicPicture from '../../../img/tusk.jpg';

export default function PoliticTag(props) {

	return (
	<>
		{props.range - 10 <= props.id && props.id < props.range ? <Link to={`/politic/${props.data.id}`} className='link'>
			<div className='politic-tag'>
				{/* <img
					className='politic-picture'
					src={props.data && politicPicture}
					alt='politic profile'></img> */}
				<FaUserTie className='politic-picture'	color="#9b9898"/>
				<p>{props.data && `${props.data.name} ${props.data.surname}`}</p>
				<div className='new-events'>{props.data && props.data.newEvents}</div>
			</div>
		</Link> : ''}
	</>
	)
}
