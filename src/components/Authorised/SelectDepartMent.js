import React from "react";
import { Component } from "react";
import '../../assets/css/selectdepartment.css'
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "../config/axios";
import * as Icon from 'react-bootstrap-icons';
import auth from "../auth/auth";
import { Redirect } from "react-router-dom";
import Sidebar from "./Dashboard/Sidebar";

class SelectDepartMent extends Component{
    constructor(props){
        super(props)
        this.state = {subjects:[{}],
                      selectedSubjects:[],
                      noOfSubjectsErr:"",
                      loading:false,
                      redirect:null
                     };
        this.handleOnchange = this.handleOnchange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    };
    handleOnchange(){
        
    }
    handleSubmit(e){
        var noOfSubjects = 0;
        e.preventDefault()
        const subjects = document.querySelectorAll('#subjectForm input');
        const department = document.getElementById('department').value;
        subjects.forEach(subject =>{
            if(subject.checked == true){
                noOfSubjects +=1;
            }
        });
        if (noOfSubjects !== 4) {
                this.setState({...this.state,
                    noOfSubjectsErr:"You can only select 4 subjects."
                })
             } else {
                var userSbjs = [];
                //
                subjects.forEach(subject =>{
                 if(subject.checked === true){
                     userSbjs.push({
                         name:subject.id,
                         id:subject.name
                     })
                 }
                })
                //
                
                const userData = {
                    user:{UserId: auth.AuthenticatedUser().UserId},
                   userDetails: {department,userSbjs}
                };
                axios({
                    url:"/saveusersbj",
                    method:'POST',
                    data:userData,
                }).then(data =>{
                    console.log(data);
                    if(data.data.success ===true){
                      window.location.assign('/dashboard');
                    }
                }).catch(err =>{
                    console.log(err)
                })
                



                this.setState({...this.state,
                    noOfSubjectsErr:""
                })
        }
    }

    componentDidMount(){
        const userId = sessionStorage.getItem('UserId');
        auth.Important(userId,data =>{
            if(data === true){
                this.setState({
                    ...this.state,redirect:'/dashboard'
                });
            }else{
                axios({
                    url:"/fetchsubjects",
                    method:"POST"
                }).then(subjects =>{
                  //  console.log(subjects.data)
                    this.setState({...this.state,subjects:subjects.data});
                }).catch(err => {
                    console.log(err)
                })

            }
        })
    }
   

    render(){
        if(this.state.redirect !== null){
            return (<Redirect to={this.state.redirect} />)
        }else{
         return(
             <React.Fragment>
                 <Sidebar/>
                 <div className="page">
                    <div className='welcomeTxt'>
                        <span>Welcome,{sessionStorage.getItem('Fullnames')}</span>
                    </div>
                    <div className='departmentForm'>
                        <form method='post' action="" id='subjectForm' onSubmit={e =>{
                           this.handleSubmit(e)
                            }}>
                            <div className='selectDepartment'>
                            <label htmlFor='department'>Select Department</label>
                            <select id='department'  >
                                <option value="science">Science</option>
                                <option value="commercial">Comercial</option>
                                <option value="art-humanity">Art/Humanity</option>
                            </select>
                            </div>
                            <div className='formInput'>
                                <span>Choose Your Subject combination</span>
                                <br/>
                                <div className="select-error">
                                <span  className="text-danger" style={{
                               }}>{this.state.noOfSubjectsErr}</span> 

                                </div>
                              
            {
               //  console.log(this.state)
                this.state.subjects.map((subject,index) =>{
                    return (
                            <div className="custom-control custom-checkbox"  key={index}>
                        <input type="checkbox" className="custom-control-input" key={subject._id} id={subject.name} name={subject._id} 
                            onChange={e =>{
                              //  console.log(e.target.checked, e.target.name)
                            }}
                        />
                        <label className="custom-control-label"
                         htmlFor={subject.name}>{subject.name}</label>
                             </div>
                    )
                })
                
            }
                                <div className="form-submit">
                                    <button type="submit">
                Enter Dashboard <span><Icon.ArrowRight /></span> 
                                    </button>
                                </div>
                            </div>
                        </form>
                        
                    </div>

                 </div>
                 

             </React.Fragment>
         )
    }
    }
}
export default SelectDepartMent
