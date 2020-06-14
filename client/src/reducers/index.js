import {combineReducers} from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import adReducer from './adReducer';
import profileReducer from './profileReducer'
export default combineReducers({
    'auth':authReducer,
    'alert':alertReducer,
    'ad':adReducer,
    'profile':profileReducer
})