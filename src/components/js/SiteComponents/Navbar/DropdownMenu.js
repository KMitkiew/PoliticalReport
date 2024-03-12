import React from 'react';
import '../../../css/DropdownMenu.css';
import { IconContext } from 'react-icons';
import { BiLogOut } from 'react-icons/bi';
import { CgProfile } from 'react-icons/cg';
import { Link } from 'react-router-dom';

export default function DropdownMenu(props) {
	const logOut = () => {
        localStorage.removeItem("token")
    }

	return (
		<IconContext.Provider value={{ color: '#71E4D7' }}>
			<ul className={`dropdown-list ${props.isShown ? 'active' : 'inactive'}`}>
				<li className='dropdown-item'>
					<Link to={`/user`} className='link'>
						<CgProfile
							style={{ position: 'relative', marginRight: '10px', top: '2px' }}
						/>
						Mój profil
					</Link>
				</li>
				<li className='dropdown-item'>
					<Link to={`/login`} className='link' onClick={logOut}>
						<BiLogOut
							style={{ position: 'relative', marginRight: '10px', top: '2px' }}
						/>
						Wyloguj się
					</Link>
				</li>
			</ul>
		</IconContext.Provider>
	);
}
