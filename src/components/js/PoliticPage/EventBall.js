import React from 'react'
import "../../css/EventBall.css"

const EventBall = (props) => {
    const [showPopup, setShowPopup] = React.useState(false);
    const percentage = Math.floor(props.likes/(props.likes+props.dislikes)*100)

    function calculateColor(likes, dislikes) {
        const hue = (percentage / 100) * 120;
		const color = `hsl(${hue}, 100%, 50%)`;
		return color;
	}

    function calculatePosition(position, refPosition) {
		const date = new Date(position)
        const refDate = new Date(refPosition)
        const timeDifference = Math.abs(refDate - date)
        const finalPosition = Math.floor((timeDifference / (1000 * 60 * 60 * 24) + 1) * 10)
        return finalPosition
	}

    return (
        <div 
            className='event-ball-container'
            style={{
                right: `${calculatePosition(props.date, props.refDate)}%`
            }}
            onMouseEnter={() => setShowPopup(true)}
            onMouseLeave={() => setShowPopup(false)}
        >
            <p className={`popup-description ${showPopup ? 'show-popup' : ''}`}>{props.title}</p>
            <div 
                className='event-ball'
                style={{
                    backgroundColor: calculateColor(props.likes, props.dislikes)
                }}
            >
                <p>{percentage}%</p>
            </div>
        </div>   
    )
}

export default EventBall