import React from 'react';
import '../../css/AddPolitic.css';

export default function AddPolitic() {
	const [formData, setFormData] = React.useState({
        name: '',
        surname: '',
        shortInfo: '',
        partyAffilation: [],
        education: [],
        career: [],
        status: ''
    });

	const sendDataToApi = async () => {
		try {
			const res = await fetch('/api/add-politic', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': localStorage.getItem('token')
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();

			if (!res.ok) {
				throw new Error('Network response was not ok');
			}

			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'partyAffilation' || name === 'education' || name === 'career') {
			const data = value.split('\n');
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: data,
			}));
		} else {
			setFormData((prevFormData) => ({
				...prevFormData,
				[name]: value,
			}));
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (formData) {
			sendDataToApi();
			setFormData({
            name: '',
            surname: '',
            shortInfo: '',
            partyAffilation: [],
            education: [],
            career: [],
            status: ''
        });
		}
	};

	return (
		<div className='add-politic-form'>
			<form
				className='politic-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					className='politic-form-el'
					placeholder='imię polityka'
					onChange={handleChange}
					value={formData.name}
				/>
				<input
					type='text'
					name='surname'
					className='politic-form-el'
                    placeholder='nazwisko polityka'
					onChange={handleChange}
					value={formData.surname}
				/>
				<textarea
					type='text'
					name='shortInfo'
					className='politic-form-el'
					placeholder='Krótki opis postaci'
					onChange={handleChange}
					value={formData.shortInfo}
				/>
				<textarea
					type='text'
					name='partyAffilation'
					className='politic-form-el'
					placeholder='historia przynależności partyjnej np. "2007-2019 Prawo i Sprawiedliwość" (każda zmiana partii w nowej linii)'
					onChange={handleChange}
					value={formData.partyAffilation.join('\n')}
				/>
				<textarea
					type='text'
					name='education'
					className='politic-form-el'
					placeholder='uzyskane wykształcenie np. "Absolwent wydziału Historycznego na Uniwersytecie Warszawskim (1998)" (każda wpis w nowej linii)'
					onChange={handleChange}
					value={formData.education.join('\n')}
				/>
                <textarea
					type='text'
					name='career'
					className='politic-form-el'
					placeholder='kariera zawodowa np. "(1995-1998) pracował w Fundacji „Polsko-Niemieckie Pojednanie”" (każda wpis w nowej linii)'
					onChange={handleChange}
					value={formData.career.join('\n')}
				/>
                <input
					type='text'
					name='status'
					className='politic-form-el'
                    placeholder='status aktywności'
					onChange={handleChange}
					value={formData.status}
				/>
				<button
					className='send-politic-data'
					type='submit'>
					Wyślij
				</button>
			</form>
		</div>
	);
}
