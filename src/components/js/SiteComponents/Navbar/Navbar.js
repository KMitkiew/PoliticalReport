import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import '../../../css/Navbar.css';
import { IconContext } from 'react-icons';
import { FaUserCircle } from 'react-icons/fa';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { PiBookOpenBold } from 'react-icons/pi';
import logo from '../../../img/Logo.svg';

export default function Navbar() {
	let location = useLocation();
	const [userData, setUserData] = React.useState();
	const [isShown, setIsShown] = React.useState(false);
	const dropdownRef = React.useRef();

	React.useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		try {
			const response = await fetch(`/api/navbar`, {
				method: 'GET',
				headers: {
					Authorization: localStorage.getItem('token'),
				},
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			if (data) {
				setUserData(data.data);
			}
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	React.useEffect(() => {
		let timer;

		if (isShown) {
			timer = setTimeout(() => {
				setIsShown(false);
			}, 1800);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [isShown]);

	React.useEffect(() => {
		const handleClickOutside = (e) => {
			if (!dropdownRef.current.contains(e.target)) {
				setIsShown(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	return (
		<>
			<IconContext.Provider value={{ color: '#23eac6' }}>
				<div className='navbar'>
					<Link
						className='profile-picture-link'
						to='/user'>
						<FaUserCircle className='profile-picture' />
						{/* <img
							className='profile-picture'
							// src={profilePicture}
							alt='profile'></img> */}
					</Link>
					<div
						className='dropdown-container'
						ref={dropdownRef}>
						<div
							className='account-info'
							onClick={() => setIsShown(!isShown)}>
							<p className='account-name'>{userData?.email}</p>
							<MdKeyboardArrowDown size='2em' />
						</div>
						<DropdownMenu isShown={isShown} />
					</div>
					<Link
						to='/'
						className='logo link'>
						<img
							src={logo}
							alt='logo'></img>
					</Link>
					{userData?.isAdmin ? (
						<>
							<Link
								to={'/add-politic'}
								className='link add-politic-btn'>
								<p>Dodaj Polityka</p>
							</Link>
							<Link
								to={'/add-event'}
								className='link add-event-btn'>
								<p>Dodaj Wydarzenie</p>
							</Link>{' '}
						</>
					) : (
						''
					)}
					<Link
						to={location.pathname === '/' ? `/searchengine` : `/`}
						className={!userData?.isAdmin ? 'link search-engine-btn-margin' : 'link'}>
						<div className='search-engine-btn-container'>
							{location.pathname === '/' ? (
								<>
									<FaMagnifyingGlass size='1.3em' />
									<p className='search-engine-btn'>Wyszukaj Polityka</p>
								</>
							) : (
								<>
									<PiBookOpenBold size='1.3em' />
									<p className='search-engine-btn'>Wydarzenia</p>
								</>
							)}
						</div>
					</Link>
				</div>
			</IconContext.Provider>
			<Outlet />
		</>
	);
}
