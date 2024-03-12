import React from "react";
import {Link} from "react-router-dom"
import '../css/LogIn.css'
import logo from '../img/Logo.svg';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { verifyRecaptcha } from "../services/recaptcha.service";
// import { RxCross2 } from "react-icons/rx";

export default function LogIn(){
    const recaptchaRef = React.createRef();
    const navigate = useNavigate();
    const [formData, setFormaData] = React.useState(
        {email: "", password: ""}
    )

    const checkField = (fieldName) => {
		const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        setIsOkay((prevIsOkay) => ({
            ...prevIsOkay,
            emailState: emailRegex.test(formData.email),
        }));
    }


    //in future this state will be replaced with API response 
    const [isOkay, setIsOkay] = React.useState(true)

    //handling form behavior
    const handleChange = (event) => {
        const {name, value} = event.target
        setFormaData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    //to check if all parameters are fulfilled
    const handleSubmit = async(event) =>{
        event.preventDefault();
        const captchaValue = recaptchaRef.current.getValue();
        if (!await verifyRecaptcha(captchaValue)){
            alert("Proszę wypełnić formularz reCAPTCHA.");
            return;
        }
        if(formData){
            try{
                await submitToApi(formData);
            }
            catch(err){
                console.error(err);
            }
        } 
    }

    //in future this function will handle submits to API
    const submitToApi = async () =>{
            try {
                const res = await fetch('/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                if(!res.ok){
                    console.log('error')
                    throw new Error('Network response was not ok');
                }

                const token = res.headers.get("authorization")
                localStorage.setItem("token", token)
                navigate('/');
                
            } catch(error) {
                console.log(error)
            }
    }

    return(
        <div className="login">
            {/* <Link to="/" className="link">
                <button className="exit-btn">
                    <RxCross2 size={"1.5em"} color="#9b9898"/>
                </button>
            </Link> */}
            <img src={logo} className="logo-img"></img>
            <h1 className="welcome-txt">Witaj</h1>
            <h3 className="info-txt">Zaloguj się aby kontynuować</h3>
            <form className="login-form" onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name='email'
                    className={`email-input ${isOkay?'':'bad-value'}`} 
                    placeholder="Adres email"
                    onChange={handleChange}
                    value={formData.email}
                >
                </input>
                <input 
                    type="password"
                    name="password"
                    className={`password-input ${isOkay?'':'bad-value'}`}
                    placeholder={`Hasło `}
                    onChange={handleChange}
                    value={formData.password}
                >
                </input>
                <ReCAPTCHA ref={recaptchaRef} sitekey={process.env.REACT_APP_POLITIC_SITE_KEY}/>
                <Link to="/newpassword" className="forgot-password link">Zapomniałeś hasła?</Link>  
                <button 
                    className="continue-btn" 
                    type="submit"
                >
                    Kontynuuj
                </button>
                <p className="acount-register">Nie masz konta? 
                    <Link to="/register" className="link">
                        <label className="register-forwarding"> Zarejestruj się</label>
                    </Link>
                </p>
            </form>
            
        </div>
    )
}