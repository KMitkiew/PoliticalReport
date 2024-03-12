import React from 'react';
import {Link} from 'react-router-dom'
import "../css/ErrorPage.css"

export default function ErrorPage() {
    return(
        <div className='error-page'>
            <h1 className='error-number'>404</h1>
            <h2 className='error-number-info'>Sorry, the page you were looking for was not found.</h2>
            <Link to=".." className='link'>
                <button className='return-home-btn'>Return to home</button>
            </Link>
        </div>
    )
}