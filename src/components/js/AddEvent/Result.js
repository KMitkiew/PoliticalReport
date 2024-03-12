import React from "react";
import "../../css/SearchResult.css";

export default function SearchResult(props){
    return (
		<div className='politic-profile'>
			<div className='politic-data'>
                <p className="politic-dignity">{props.data.title}</p>
                <p className="politic-party">{`data powstania artykułu: ${props.data.date}`}</p>
                <p className="politic-party">{`Krótki opis: ${props.data.shortDescription}`}</p>
                <p className="politic-party">{`Źródła: ${props.data.source}`}</p>
                <p className="politic-party">{`ID polityka: ${props.data.politicInvolved}`}</p>
			</div>
		</div>
	);
}