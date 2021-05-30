import React from 'react'
import { Link } from 'react-router-dom'


function Header(){

    return(
        <React.Fragment>
            <div className="welcome">
                <h3 className='text text-light'>
                    Welcome, {sessionStorage.getItem('Fullnames')}. Gain more confidence learning today
                </h3>
                <p className='text-additional'>We always love to see you preparing hard for your exams. We've got new resources for you.</p>
                <div className="navigate-subjects">
                    <Link to='/'>Checkout Now</Link>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Header