import { combineReducers } from "redux";
import { SignUpReducer,distributeErrorReducer, LoginReducer } from "./Registration";



export const rootReducer = combineReducers({
     newSignUp : SignUpReducer,
     distributeError:distributeErrorReducer,
     userLogin:LoginReducer,
})
