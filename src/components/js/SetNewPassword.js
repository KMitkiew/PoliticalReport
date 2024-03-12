import React from "react";
import {Link} from "react-router-dom"
import '../css/SetNewPassword.css'
import logo from '../img/Logo.svg';
import { RxCross2 } from "react-icons/rx";

export default function SetNewPassword(){
    const [formData, setFormaData] = React.useState({email: ""})
    const [isShown, setIsShown] = React.useState(false)
    const [isTrue, setIsTrue] = React.useState(true)
    const placeholderText = isTrue ? 'Podaj adres email' : 'Podano niepoprawny adres email!';
    
    //handle input changes
    const handleChange = (event) => {
        setFormaData({email: event.target.value})
    }

    //checks whether the conditions have been met before sending the e-mail
    const showText = (event) => {
        event.preventDefault()
        const emailRegex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
        if(emailRegex.test(formData.email)){
            setIsShown(true)
            setIsTrue(true)
            sendMessage()
        } else{
            setFormaData({email: ''})
            setIsTrue(false)
        }
    }

    //will be responsible for sending messages to the indicated e-mail address
    const sendMessage = () => {
        console.log('Message was send on ', formData.email)
    }

    return (
        <div className="set-new-password">
            <Link to="/login" className="link">
                <button className="exit-btn">
                    <RxCross2 size={"1.5em"} color="#9b9898"/>
                </button>
            </Link>
            <img className="logo-img" src={logo} alt="website logo"></img>
            <h1 className="title">Zapomniałeś hasła?</h1>
            <p className="description">Nie przejmuj się! Zresetuj hasło z użyciem adresu e-mail</p>
            <form className="email-form">
                <input 
                    type="email" 
                    placeholder={placeholderText} 
                    className={`given-email-input ${isTrue?'':'isFalse'}`}
                    id="given-email-input"
                    value={formData.email}
                    onChange={handleChange}
                >
                </input>
                <button 
                    className="send-btn" 
                    type="submit"
                    onClick={showText}
                >
                    Wyślij
                </button>
            </form>   
            <p className={`send-info ${isShown?'show':''}`}>
                Wysłano wiadomość z jednorazowym hasłem!
            </p>
            <p className={`resend-info ${isShown?'show':''}`}>
                Wiadomość do Ciebie nie dotarła?
                <span className="resend-link"> Wyślij ponownie</span>
            </p>
        </div>
   )
}