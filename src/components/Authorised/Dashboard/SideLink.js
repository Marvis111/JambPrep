import React, { useState } from "react"
import { Link } from "react-router-dom"
import * as Icon from 'react-bootstrap-icons';
import { Button } from "reactstrap";
import Auth from "../../auth/auth";
import {useHistory} from 'react-router-dom';

function SideLink(){
    const history = useHistory();
    const logout = () =>{  
        history.push('/login');
    }
    return(
                 <div className='side-link'>
                <ul className='sideLink'>
                    <li><span><Icon.House/></span> Dashboard</li>
                    <li><span><Icon.Book/></span> Courses</li>
                    <li><span><Icon.People/></span> Discussion</li>
                    <li><span><Icon.PersonBadge/></span>Resources</li>
                </ul>
                
    
                <Button color='danger'  onClick={()=>{
                    Auth.logout(()=>{
                      logout();
                    })
                }} >
                    Logout
                </Button>
            </div>
    )

}
export default SideLink