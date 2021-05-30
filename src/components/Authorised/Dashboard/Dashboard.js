import React, { useEffect } from "react"
import { useHistory } from "react-router";
import '../../../assets/css/dashboard2.css';
import auth from "../../auth/auth";
import DashboardContent from "./DashboardContent";
import Header from "./Header";
import Sidebar from "./Sidebar";



function Dashboard(){
    const history = useHistory();
    useEffect(()=>{
        const userId = sessionStorage.getItem('UserId');
        auth.Important(userId,data =>{
            if(data === false){
                history.push('/register');
            }
        })

    })
    return(
        <React.Fragment>
            <Sidebar />
            <DashboardContent/>
          
        </React.Fragment>
    )

}
   
export default Dashboard