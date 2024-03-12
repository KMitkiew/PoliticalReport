import React from 'react';
import '../../css/AddEventForm.css';

export default function AddEventForm() {
	const [formData, setFormData] = React.useState({
		title: '',
		shortDescription: '',
		source: [],
		politicsInvolved: [],
		date: '',
	});

	const sendDataToApi = async () => {
		try {
			const res = await fetch('/api/add-event', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
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
		if (name === 'source' || name === 'politicsInvolved') {
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
				title: '',
				shortDescription: '',
				source: [],
				politicsInvolved: [],
				date: '',
			});
		}
	};

	return (
		<div className='add-event-form'>
			<form
				className='event-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					name='title'
					className='event-form-el'
					placeholder='nazwa wydarzenia'
					onChange={handleChange}
					value={formData.title}
				/>
				<input
					type='date'
					name='date'
					className='event-form-el'
					onChange={handleChange}
					value={formData.date}
				/>
				<textarea
					type='text'
					name='shortDescription'
					className='event-form-el'
					placeholder='Krótki opis wydarzenia'
					onChange={handleChange}
					value={formData.shortDescription}
				/>
				<textarea
					type='text'
					name='source'
					className='event-form-el'
					placeholder='link do źródła (każdy link w nowej linii)'
					onChange={handleChange}
					value={formData.source.join('\n')}
				/>
				<textarea
					type='text'
					name='politicsInvolved'
					className='event-form-el'
					placeholder='ID zaangażowanych w wydarzenie polityków (każde ID w nowej linii)'
					onChange={handleChange}
					value={formData.politicsInvolved.join('\n')}
				/>
				<button
					className='send-event-data'
					type='submit'>
					Wyślij
				</button>
			</form>
		</div>
	);
}
