import React,{useEffect,useState} from 'react';
import SpeLogo from '../../assets/images/Connected world-amico.png';
import {Button,Spinner} from 'reactstrap';
import axios from '../config/axios';
import {Link,} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../auth/auth';
import '../../assets/css/joinus.css'
import * as Icon from 'react-bootstrap-icons'
import {connect} from 'react-redux';
import { LoginAction,distributeInputError } from '../redux/actions/actions';

function Login(props){
    const history = useHistory();
    const [loading,setLoading] = useState(false);

    const changeFieldValue = (e,FieldName )=> {
        switch (FieldName) {
            case 'Email':
                props.LoginAction(
                    e.target.value,
                    props.userLogin.Password
                    );
                break;
            case 'Password':
                props.LoginAction(
                    props.userLogin.Email,
                    e.target.value
                    );
                break;
            default :
            return props.LoginAction(props.userLogin.Email,props.userLogin.Password);
                }
}
    useEffect(()=>{
        const initialFormErr = [{FieldName:"Email",err:""},
        {FieldName:"Password",err:""}
        ]
        //
        const loginForm = document.querySelector('#loginForm');
        const distributeError = errors => {
        const formInput = document.querySelectorAll('#loginForm input');
            if(errors.length >0){
            errors.forEach(error =>{
                formInput.forEach(input =>{
                    if(error.FieldName === input.name ){   
                 props.distributeInputError({FieldName:[error.FieldName],
                    err:error.err});
                    }
                })
            })
        }
        }
        loginForm.onsubmit = async (e) =>{       
            e.preventDefault();
            axios({
                url:"/login",
                method:"POST",
                data:props.userLogin,
                onUploadProgress:() =>{
                    setLoading(true);
                }
            }).then(res =>{
                if(res.data.success === true){
                    distributeError(initialFormErr);
                    const {Fullnames,UserId,Email,token} = res.data;
                    const loggedInUser = {UserId,Fullnames,Email,token};
                    Auth.login(loggedInUser,()=>{
                        history.push('/dashboard');
                    })
                }else{
                   distributeError(res.data.error);
                }
                setLoading(false);
            }).catch(err =>{
                alert('something went wrong',err.message);
                setLoading(false);
            })
        }

        return ()=>{
            return null
        }
    });
    return (
     <div>
        <div className= 'join-us'>
            <div className="containers">
                <div className="about-spe">
                    <h3>New Member? </h3>
                    <p className="">Lorem ipsum, dolor sit amet consectetur 
                        adipisicing elit. Debitis, ex ratione. Aliquid!</p>
                    <Button  className='login btn-sm loginbtn' > 
                        <Link to='/join' >
                            Login
                        </Link>
                    </Button>
                </div>
                <div className='spe-logo'>
                <img src={SpeLogo} alt='Logo'></img>
                </div>
            </div>
                <div className="join-us-form ">

                <div className='signup-form'>
                     <form id='loginForm' method='POST' action="">
                     <h4>Login</h4>
                         <div className='input-group'>
                             <Icon.Envelope className='input-field-icon'/>
                             <input id='email' type='email' name='Email' placeholder='Email'
                             value={props.userLogin.Email}
                             onChange ={(e) =>{
                                 changeFieldValue(e,'Email');
                             }}
                              />
                            <span className='field-err'>{props.distributeError.Email}</span>
                         </div>
                         <div className='input-group'>
                             <Icon.Key className='input-field-icon'/>
                             <input  type='password' name='Password' placeholder='Password' 
                             value={props.userLogin.Password}
                             onChange ={(e) =>{
                                 changeFieldValue(e,'Password');
                             }} />
                            <span className='field-err'>{props.distributeError.Password}</span>
                         </div>
                         <div className='submitbtn'>
                             <button type='submit' >
                                { loading ? <Spinner size="sm"  /> : "Login" }
                             </button>
                         </div>
                     </form>
                   
                </div>
                </div>
            
          </div>
    </div>
    )
}

const mapStateToProps = state =>({
    userLogin:state.userLogin,
    distributeError:state.distributeError
})

export default connect(mapStateToProps,{LoginAction,distributeInputError})(Login);