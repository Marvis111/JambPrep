import React, { useEffect, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import Logo from '../../../assets/images/icon-1.svg'
import SideLink from './SideLink';
import '../../../assets/css/dashboard.css';
function Sidebar() {
    return(
        <div className='sidebar'>
        <div className='details'>
            <div className='sidebar-head'>
                <div className='name'>
                    <div className='logo'>
                    <img src={Logo} alt='Logo' />
                    </div>
                    <span>PetrolX</span>
                </div>
                <div className="toggle-bar">
                    <Icon.List></Icon.List>
                </div>
            </div>
            <div className='user-details'>
                <h4>{sessionStorage.getItem('Fullnames')}</h4>
                <h5>{sessionStorage.getItem('Email')}</h5>
            </div>
        </div>
        <SideLink/>
        </div>
    )
    
}
export default Sidebar