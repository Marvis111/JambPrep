import React, { useEffect } from 'react';
import bgImg from '../../assets/images/welcome.svg';
import {Link} from 'react-router-dom';
import '../../assets/css/index.css';
function HomeBody(){
  useEffect(()=>{

    return () =>{
      
      return null
    }
    
  })
    return(
        <React.Fragment>
          <div className="home-body">

            <div className='intro-div'>
              <h1>Your number one Plug to passing your Exams</h1>
              <p>We offer you the greatest jamb preparation experience to give you a real-time experience of the actual Exams.</p>

              <div className="join_US">
      <div className='joinNow'>
        <Link to='/join'>Register</Link>
      </div>
      <div className='joinNow'>
        <Link to='/login' >Sign In</Link>
      </div>
              </div>
            </div>
            <div className='intro-illustration-img'>
           <img src={bgImg} alt='Intro Image' />
            </div>
          </div>

        </React.Fragment>
    )
}

export default HomeBody