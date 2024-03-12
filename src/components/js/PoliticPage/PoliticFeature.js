import React, { memo } from 'react';

const PoliticFeature = memo((props) => {

	return (
		<div className='politic-feature'>
			<p className='make-it-bold'>{props.featureName}</p>
			<ul className='politic-list'>
				{props.feature?.map((item, id) => (
					<li 
					key={id}
					className='politic-element'>{item}</li>
				))}
			</ul>
		</div>
	);
});

export default PoliticFeature;
