import {combineReducers} from 'redux'
import RajaOngkirReducer from './rajaongkir'
import AuthReducer from './auth'


const rootReducer = combineReducers({
    RajaOngkirReducer,
    AuthReducer
})

export default rootReducer