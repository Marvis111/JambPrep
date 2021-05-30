import { Route, useHistory } from "react-router-dom";


const ProtectedRoute = ({   component:Component,...rest}) =>{
    const history =    useHistory();
    return (
        <Route {...rest}  render ={props =>{
            if(sessionStorage.length){
                return <Component {...props} />
            }else{
                history.push("/login");
            }
        }} />
    );;
}
export default ProtectedRoute;
