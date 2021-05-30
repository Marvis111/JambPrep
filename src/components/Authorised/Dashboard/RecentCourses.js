import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from '../../config/axios';

function RecentCourses(){
    const [recentCourses,setRecentCourses] = useState([]);
    const userId = sessionStorage.getItem('UserId');
    useEffect(()=>{
        axios({url:"/fetchrecentsubjects",method:"POST",data:{userId}})
        .then(res =>{
          //  console.log(res.data);
            setRecentCourses(res.data);

        }).catch(err =>{
            console.log(err);
        })
    
        return ()=>{
            return null
        }

    },[]);
    return(
        <React.Fragment>
            <div className='recent'>
                <h3>Recent Subjects</h3>
                <div className='recent-subjects'>
                <div className='subjects'>
                    {recentCourses.map((course,id)=>{

                        return(
                            <div className='performance' key={id}>
                                <h3>{course.name}</h3>
                                <h6>Introduction to Petroleum Engineering</h6>
                                <div className='progressbar'>
                                    70%
                                </div>
                                <div className='continue-course'>
                                    <Link to={`/courses/${course.id}`}>Continue</Link>
                                </div>
                                <progress value='90' max='100' ></progress>
                            </div>
                        )
                
                    } )}

{/* <div className='performance'>
    <h3>Mathematics</h3>
    <h6>Introduction to Petroleum Engineering</h6>
    <div className='progressbar'>
        70%
    </div>
    <div className='continue-course'>
        <Link to='/'>Continue</Link>
    </div>
    <progress value='90' max='100' ></progress>
    </div> */}

    </div> 




                </div>

            </div>

        </React.Fragment>
    )
}
export default RecentCourses;