import React, { Component, useEffect } from 'react';
import Nav from "./Nav";
import HomeBody from './HomeBody';
import axios from '../config/axios';
import Auth from '../auth/auth';
import { useHistory } from 'react-router';

function HomePage(){
         const history = useHistory();
        const token = localStorage.getItem('token');
        useEffect(()=>{
            if(token !== null){
                axios({
                     url:"/checkuser",
                     method:"POST",
                     headers:{
                         "Content-type":"application/json",
                         "x-auth-token":token
                     }
                 }).then(user =>{
                     if(user.data.success === true){
                         const {Fullnames,UserId,Email,token} = user.data
                         const loggedInUser = {UserId,Fullnames,Email,token};
                         Auth.login(loggedInUser,()=>{
                             history.push('/dashboard');
                         });
                        }
                 }).catch(err =>{
                     if(err){
                         console.log(err);
                     }
                 })
        
                 }
        return ()=>{
            return null;
        }
        })
        

        return(
            <React.Fragment>
            <section className="page-main-section bg-light">
                <Nav/>
                <HomeBody />
            </section>
            </React.Fragment>
        )
    
}

export default HomePage;