import React,{useEffect,useState} from 'react';
import SpeLogo from '../../assets/images/Connected world-amico.png';
import {Button,Spinner} from 'reactstrap';
import axios from '../config/axios';
import {Link,} from 'react-router-dom';
import { useHistory } from "react-router-dom";
import Auth from '../auth/auth';
import '../../assets/css/joinus.css'
import * as Icon from 'react-bootstrap-icons';
import { connect } from "react-redux";
import { SignUpAction,distributeInputError } from '../redux/actions/actions';


function Join(props){
    const history = useHistory();
    const [loading,setLoading] = useState(false);
    const changeFieldValue = (e,FieldName )=> {
        switch (FieldName) {
            case 'Fullnames':
                props.SignUpAction(
                    e.target.value,
                    props.newSignUp.Email,
                    props.newSignUp.Password,
                    props.newSignUp.CPassword
                    );
                break;
            case 'Email':
                props.SignUpAction(
                    props.newSignUp.Fullnames,
                    e.target.value,
                    props.newSignUp.Password,
                    props.newSignUp.CPassword
                    );
                break;
                case 'Password':
                    props.SignUpAction(
                        props.newSignUp.Fullnames,
                        props.newSignUp.Email,
                        e.target.value,
                        props.newSignUp.CPassword
                        );
                    break;
                    case 'CPassword':
                        props.SignUpAction(
                            props.newSignUp.Fullnames,
                            props.newSignUp.Email,
                            props.newSignUp.Password,
                            e.target.value,
                            );
                            break;
            default:
                props.SignUpAction(
                    props.newSignUp.Fullnames,
                    props.newSignUp.Email,
                    props.newSignUp.Password,
                    props.newSignUp.CPassword
                    );
                break;
        }
    }
    useEffect(()=>{

        const distributeError = errors => {
            const formInput = document.querySelectorAll('#SignUpForm input');
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
        const SignUpForm = document.querySelector('#SignUpForm');

     SignUpForm.onsubmit = async (e)=>{
            setLoading(true);
            e.preventDefault();
            try{
            const res = await axios.post('/signup',props.newSignUp);
            if(res.data.success === false){
               distributeError(res.data.error);
               setLoading(false);
            }else{
                const  {Fullnames,Email,UserId,token} = res.data;
                const newUser = {Fullnames,Email,UserId,token}

                Auth.SignIn(newUser,()=>{
                   history.push("/register");
                });
                setLoading(false);
            }
            }catch(error){
                if(error){
                    console.error(error);
                }
            }
        };
        return ()=>{
            return null
        }
    })
    return (
     <div>
        <div className= 'join-us'>
            <div className="containers">
                <div className="about-spe">
                    <h3>New Member? </h3>
                    <p className="">Lorem ipsum, dolor sit amet consectetur 
                        adipisicing elit. Debitis, ex ratione. Aliquid!</p>
                    <Button  className='login btn-sm loginbtn' > 
                        <Link to='/login' >
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
                     <form method='POST' id='SignUpForm' action=''>
                     <h4>Sign Up</h4>
                         <div className='input-group'>
                             <Icon.Person className='input-field-icon'/>
                             <input id='fullname' type='text' name='Fullnames' placeholder='Full names'
                            value={props.newSignUp.Fullnames}
                             onChange= {(event)=>{
                                changeFieldValue(event,'Fullnames');
                             }}
                             />
                            <span className='field-err'>{props.distributeError.Fullnames}</span>
                         </div>
                         <div className='input-group'>
                             <Icon.Envelope className='input-field-icon'/>
                             <input id='email' type='email' name='Email' placeholder='Email'
                              value={props.newSignUp.Email}
                              onChange= {(event)=>{
                                 changeFieldValue(event,'Email');
                              }}
                              />
                            <span className='field-err'>{props.distributeError.Email}</span>
                         </div>
                         <div className='input-group'>
                             <Icon.Key className='input-field-icon'/>
                             <input  type='password' name='Password' placeholder='Password'
                              value={props.newSignUp.Password}
                              onChange= {(event)=>{
                                 changeFieldValue(event,'Password');
                              }}
                              />
                            <span className='field-err'>{props.distributeError.Password}</span>
                         </div>
                         <div className='input-group'>
                             <Icon.KeyFill className='input-field-icon'/>
                             <input  type='password' name='CPassword' placeholder='Comfirm Password'
                              value={props.newSignUp.CPassword}
                              onChange= {(event)=>{
                                 changeFieldValue(event,'CPassword');
                              }}
                               />
                            <span className='field-err'></span>
                         </div>
                         <div className='submitbtn'>
                             <button type='submit' >
                                {loading ? <Spinner size="sm"  /> :
                                    'Sign Up'
                                 }
                             </button>
                         </div>
                     </form>
                   
                </div>
                </div>
            
          </div>
    </div>
    )
}

const mapStateToProps = state => ({
    newSignUp:state.newSignUp,
    distributeError:state.distributeError,
})

export default connect(mapStateToProps,{SignUpAction,distributeInputError})(Join)
