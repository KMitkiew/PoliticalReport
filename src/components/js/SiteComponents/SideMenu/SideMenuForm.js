import React from 'react';
import PoliticTag from './PoliticTag';
import '../../../css/SideMenu.css';
import { IconContext } from 'react-icons';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export default function SideMenuForm(props) {
	const [rendersNumber, setRendersNumber] = React.useState(10);
	const baseNumber = 10;

	const showData = () => {
		if (props.data?.length > rendersNumber) {
			setRendersNumber(
				(prevRendersNumber) => prevRendersNumber + baseNumber
			);
		}
	};

	const hideData = () => {
		if (rendersNumber > baseNumber) {
			setRendersNumber(
				(prevRendersNumber) => prevRendersNumber - baseNumber
			);
		} 
	};

	return (
		<>
			<div className='section-title'>
				<h4>{props.componentName}</h4>
			</div>
			<div className='politic-tags-container'>
				{Array.isArray(props.data) && props.data.map((item, id) => (
					<PoliticTag
						key={item.id}
						id={id}
						range={rendersNumber}
						data={item}
					/>
				))}
			</div>
			<IconContext.Provider value={{ color: '#20ba9e', size: '3em' }}>
				<div className='next-data'>
				{props.data?.length > 10 ? 
					<>
						<div
							className='next-data-btn'
							onClick={showData}>
							<MdKeyboardArrowDown />
						</div>
						<div
							className='next-data-btn'
							onClick={hideData}>
							<MdKeyboardArrowUp />
						</div>
					</>: ''}
				</div>
			</IconContext.Provider>
		</>
	);
}
