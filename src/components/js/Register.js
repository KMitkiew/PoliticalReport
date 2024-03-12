import React from 'react';
import {Link} from 'react-router-dom'
import '../css/Register.css';
import logo from '../img/Logo.svg';
// import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "../services/recaptcha.service";

export default function Register() {
    const recaptchaRef = React.createRef();
	const navigate = useNavigate();
	const [formData, setFormaData] = React.useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [isOkay, setIsOkay] = React.useState({
		emailState: true,
		passwordState: true,
		repeatPasswordState: true,
	});

	//checking if parameters were met
	const checkField = (fieldName) => {
		const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
		const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-])\S{8,}$/);

        switch (fieldName) {
            case 'email':
                setIsOkay((prevIsOkay) => ({
                    ...prevIsOkay,
                    emailState: emailRegex.test(formData.email),
                }));
                break;
            case 'password':
                setIsOkay((prevIsOkay) => ({
                    ...prevIsOkay,
                    passwordState: passwordRegex.test(formData.password)
                }));
                break;
            case 'repeatPassword':
                setIsOkay((prevIsOkay) => ({
                    ...prevIsOkay,
                    repeatPasswordState: formData.password === formData.repeatPassword,
                }));
                break;
            default:
                break;
        }
    };

	//handling form behavior
	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormaData((prevFormData) => {
			return {
				...prevFormData,
				[name]: value,
			};
		});
	};

	//runs checkField when unclicked
	const handleBlur = (event) => {
        const { name } = event.target;
        checkField(name);
    };

	//to check if all parameters are fulfilled
	const handleSubmit = async (event) => {
		event.preventDefault();
		const isFormValid = Object.values(formData).every(value => value !== '' && value !== undefined)
		const isTrue = formData.password === formData.repeatPassword ? true : false
		if (isFormValid && !Object.values(isOkay).includes(false) && isTrue) {
			try{
				const captchaValue = recaptchaRef.current.getValue();
				if (!await verifyRecaptcha(captchaValue)){
					alert("Proszę wypełnić reCAPTCHA! folklore");
					return;
				}
				await registerToApi();
			}
			catch(err){
				console.error(err);
			}
		} else {
			setIsOkay( prevIsOkay => ({
				...prevIsOkay,
				repeatPasswordState: false
			}))
			console.error('conditions were not met');
		}
	};		

	const registerToApi = async () => {
		try {
			const res = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
						
			if(!res.ok){
				throw new Error('Network response was not ok');
			}

			const token = res.headers.get("Authorization")
			localStorage.setItem("token", token)
			navigate('/');
			//if email exists in the database set failed email validation 
			setIsOkay({...isOkay, emailState: false});

		} catch(error) { 
			console.log(error)
		}
}

	return (
		<div className='register'>
			{/* <Link to="/" className='link'>
				<button className="exit-btn">
					<RxCross2 size={"1.5em"} color="#9b9898"/>
				</button>
			</Link> */}
			<img
				src={logo}
				className='logo-img'
				alt='company logo'></img>
			<h1 className='welcome-txt'>Witaj</h1>
			<h3 className='info-txt'>Zarejestruj się aby kontynuować</h3>
			<form
				className='register-form'
				onSubmit={handleSubmit}>
				<input
					type='text'
					name='email'
					id='email'
					className={`inputs ${isOkay.emailState ? '' : 'bad-value'}`}
					placeholder='Adres email'
					onChange={handleChange}
					onBlur={handleBlur}
					value={formData.email}></input>
				<label
					id='email'
					className={isOkay.emailState ? 'error-hide' : 'error-info'}>
					Niepoprawny format e-mail!
				</label>
				<input
					type='password'
					name='password'
					id='Password'
					className={`inputs ${isOkay.passwordState ? '' : 'bad-value'}`}
					placeholder={`Hasło`}
					onChange={handleChange}
					onBlur={handleBlur}
					value={formData.password}></input>
				<label
					id='password'
					className={isOkay.passwordState ? 'error-hide' : 'error-info'}>
					Hasło musi składać się z 8 znaków: wielkich i małych liter, cyfr i znaku
					specjalnego
				</label>
				<input
					type='password'
					name='repeatPassword'
					id='repeatPassword'
					className={`inputs ${isOkay.repeatPasswordState ? '' : 'bad-value'}`}
					placeholder={`Powtórz hasło `}
					onChange={handleChange}
					onBlur={handleBlur}
					value={formData.repeatPassword}></input>
				<label
					id='repeatPassword'
					className={isOkay.repeatPasswordState ? 'error-hide' : 'error-info'}>
					Wprowadzone hasła są różne!
				</label>
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_POLITIC_SITE_KEY}/>
				<button
					className='continue-btn'
					type='submit'>
					Kontynuuj
				</button>
				<p className='acount-register'>
					Masz już konto? Kliknij i{' '}
					<Link to="/login" className='link'>
						<label className='register-forwarding'>zaloguj się</label>
					</Link>
				</p>
			</form>
		</div>
	);
}