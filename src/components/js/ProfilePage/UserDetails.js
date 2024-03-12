import React from 'react';
import '../../css/UserDetails.css';
import { useOutletContext } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';

export default function UserDetails() {
	const [personalData, setPersonalData] = useOutletContext();

	const [formData, setFormData] = React.useState({
		name: '',
		surname: '',
		email: '',
		birthDate: '',
		population: '',
	});

	const [formStatus, setFormStatus] = React.useState({
		name: true,
		surname: true,
		email: true,
		birthDate: true,
		population: true,
	});

	React.useEffect(() => {
		if (personalData) {
			setFormData({
				name: personalData.name ?? '',
				surname: personalData.surname ?? '',
				email: personalData.email ?? '',
				birthDate: formDate(personalData.birthDate) ?? '',
				population: personalData.population ?? '',
			});
		}
	}, [personalData]);

	const updateUserDataToDb = async () => {
		try {
			const updatedUserData = {
				...personalData,
				name: formData.name,
				surname: formData.surname,
				photo: formData.photo,
				email: formData.email,
				population: formData.population,
				birthDate: formData.birthDate,
			};
			const res = await fetch('/api/user/user-details', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify(updatedUserData),
			});

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			console.error('Error updating user data:', error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const formDate = (dateString) => {
		const date = new Date(dateString);
	  
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Dodajemy 1, bo miesiące są indeksowane od 0
		const day = String(date.getDate()).padStart(2, '0');
	
		const formatedDate = `${year}-${month}-${day}`;
		console.log(formatedDate)
		return formatedDate;
	  }

	const changeInput = (input) => {
		setFormStatus((prevFormStatus) => ({
			...prevFormStatus,
			[input]: false,
		}));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		await updateUserDataToDb();
		setFormStatus((prevFormStatus) => ({
			...prevFormStatus,
			name: true,
			surname: true,
			email: true,
			birthDate: true,
			population: true,
		}));
	};
	return (
		<>
			<form
				className='user-specific-data'
				onSubmit={handleSubmit}>
				<h1 className='section-name'>Dane użytkownika</h1>
				<div className='form-el'>
					<label htmlFor='name'>Imię:</label>
					<input
						type='text'
						name='name'
						id='name'
						value={formData.name}
						onChange={handleChange}
						disabled={formStatus.name}
						className={formStatus.name ? 'disabled-btn-style' : ''}
					/>
					<FaEdit
						onClick={formStatus.name ? () => changeInput('name') : null}
						className={formStatus.name ? 'edit-icon' : 'add-gray'}
					/>
				</div>
				<div className='form-el'>
					<label htmlFor='surname'>Nazwisko:</label>
					<input
						type='text'
						name='surname'
						id='surname'
						value={formData.surname}
						onChange={handleChange}
						disabled={formStatus.surname}
						className={formStatus.surname ? 'disabled-btn-style' : ''}
					/>
					<FaEdit
						onClick={formStatus.surname ? () => changeInput('surname') : null}
						className={formStatus.surname ? 'edit-icon' : 'add-gray'}
					/>
				</div>
				<div className='form-el'>
					<label htmlFor='email'>Email:</label>
					<input
						type='email'
						name='email'
						id='email'
						value={formData.email}
						onChange={handleChange}
						disabled={formStatus.email}
						className={formStatus.email ? 'disabled-btn-style' : ''}
					/>
					<FaEdit
						onClick={formStatus.email ? () => changeInput('email') : null}
						className={formStatus.email ? 'edit-icon' : 'add-gray'}
					/>
				</div>
				<div className='form-el'>
					<label htmlFor='birthDate'>Data urodzenia:</label>
					<input
						type='date'
						name='birthDate'
						id='birthDate'
						value={formData.birthDate ? formData.birthDate : ''}
						onChange={handleChange}
						disabled={formStatus.birthDate}
						className={formStatus.birthDate ? 'disabled-btn-style' : ''}
					/>
					<FaEdit
						onClick={
							formStatus.birthDate ? () => changeInput('birthDate') : null
						}
						className={formStatus.birthDate ? 'edit-icon' : 'add-gray'}
					/>
				</div>
				<div className='form-el'>
					<label htmlFor='population'>Miejsce zamieszkania:</label>
					<select
						id='population'
						name='population'
						onChange={handleChange}
						value={formData.population}
						className={formStatus.population ? 'disabled-btn-style' : ''}>
						<option
							value='village'
							disabled={formStatus.population}>
							Wieś
						</option>
						<option
							value='up-to-50k'
							disabled={formStatus.population}>
							Miasto do 50 tyś mieszkańców
						</option>
						<option
							value='up-to-100k'
							disabled={formStatus.population}>
							Miasto do 100 tyś mieszkańców
						</option>
						<option
							value='up-to-500k'
							disabled={formStatus.population}>
							Miasto do 500 tyś mieszkańców
						</option>
						<option
							value='more-than-500k'
							disabled={formStatus.population}>
							Miasto powyżej 500 tyś mieszkańców
						</option>
					</select>
					<FaEdit
						onClick={
							formStatus.population ? () => changeInput('population') : null
						}
						className={formStatus.population ? 'edit-icon' : 'add-gray'}
					/>
				</div>
				<button
					type='submit'
					className={
						Object.values(formStatus).every((value) => value)
							? 'disabled-style'
							: 'change-content-btn'
					}
					style={formStatus}>
					zapisz zmiany
				</button>
			</form>
		</>
	);
}
