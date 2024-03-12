import React from "react";
// import profilePicture from '../../img/aaaa.png';
import { FaUserCircle } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import "../../css/UserPage.css"

export default function UserPage(){
    const [personalData, setPersonalData] = React.useState({})

    React.useEffect(()=>{
       fetchUserData()
    }, [])

    const fetchUserData = async () => {
		try {
		  	const response = await fetch(`/api/user`,
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

			if(data){
				setPersonalData(data.data)
			}
	  
		} catch (error) {
		  	console.error('Error fetching data:', error);
		}
	};

    return(
        <div className="user-profile">
            <div className="user-basic-info">
                {/* <img src={profilePicture} alt="profile picture of logged user" className="user-profile-pic" /> */}
                <FaUserCircle className="user-profile-pic" color="#9b9898"/>
                <div className="info-element">
                    <p className="info-type">Imię:</p>
                    <p className="user-info-txt">{personalData.name}</p>
                </div>
                <div className="info-element">
                    <p className="info-type">Nazwisko:</p>
                    <p className="user-info-txt">{personalData.surname}</p>
                </div>
                <div className="info-element">
                    <p className="info-type">E-mail:</p>
                    <p className="user-info-txt">{personalData.email}</p>
                </div>
            </div>
            <div className="user-specific-info">
                <div className="change-info-btns">
                    <Link to="/user" className="link">
                        <button className="details-btn">Szczegóły</button>
                    </Link>
                    <Link to="observed" className="link">
                        <button className="details-btn">Obserwowani</button>
                    </Link>
                    <Link to="reactions" className="link">
                        <button className="disabled-btn" disabled>Reakcje</button>
                    </Link>
                </div>
                <Outlet context={[personalData, setPersonalData]}/>
            </div>
        </div>
    )
}