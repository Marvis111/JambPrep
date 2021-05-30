import React from "react";
import { Route, useHistory,} from "react-router"


const UnprotectedRoute = ({component:Component,...rest}) =>{
    const history = useHistory();
    return(
      <Route {...rest} render ={props =>{
          if(sessionStorage.length){
             history.goBack();
          }else{
              return <Component {...props} />
          }
      }} />
    )
}
export default UnprotectedRoute;