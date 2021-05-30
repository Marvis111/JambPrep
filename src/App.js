import React from 'react';
import { BrowserRouter as Router,Switch } from "react-router-dom";
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './components/Home/HomePage';
import Login from './components/Registration/Login';
import Dashboard from './components/Authorised/Dashboard/Dashboard'
import UnprotectedRoute from './components/auth/UnprotectedRoute';
import Join from './components/Registration/Join';
import SelectDepartMent from './components/Authorised/SelectDepartMent';


function App(){
    
    return(
        
        <div>
            <Router>
                <Switch>
    <UnprotectedRoute exact path ={['/','/index','home']} component={HomePage} />
    <UnprotectedRoute exact path={['/join','/signup']} component={Join} />
    <UnprotectedRoute exact path='/login' component={Login} />
    <ProtectedRoute exact path ='/register' component={SelectDepartMent} />
    <ProtectedRoute exact path ='/dashboard' component={Dashboard} />
    

                </Switch>
            </Router>
          
        </div>

    )
}
export default App