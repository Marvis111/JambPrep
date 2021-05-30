import React from 'react';
import NavbarBrandImg from '../../assets/images/icon-1.svg';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default class Nav extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navBtnOpen:false,
      isOpen:true
    }
this.changeToggleNav = this.changeToggleNav.bind(this);
  }
changeToggleNav(){
  this.setState({
    navBtnOpen:!this.state.navBtnOpen,
    isOpen:!this.state.isOpen
  });
  
   $('.nav-list').slideToggle();
};
componentDidMount(){
  window.onresize = () =>{
    if(window.innerWidth <= 586 ){
      this.setState({
        ...this.state,
        isOpen:false
      });
    }else{
      this.setState({
        ...this.state,
        isOpen:true
      })
    }
  }
}
componentWillUnmount(){
  return null;
}
  render() {
    return (
    <Fragment>
      <div className='nav-head'>
        <div className='site-logo'>
          <img src={NavbarBrandImg} alt='Site Logo' />
          <span>CodeBug</span>
        </div>
        <div className={this.state.navBtnOpen?
          'toggle-btn open' :
          'toggle-btn'
        } 
        onClick={this.changeToggleNav}
        >
          <div className='bar'></div>
        </div>
        <ul className='nav-list'   >
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/join'>Register</Link>
          </li>
        </ul>
      </div>
    </Fragment>
    )
  }

}