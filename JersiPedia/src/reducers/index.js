import {combineReducers} from 'redux'
import RajaOngkirReducer from './rajaongkir'
import AuthReducer from './auth'
import ProfileReducer from './profile'
import LigaReducer from './liga'
import JerseyReducer from './jersey'

const rootReducer = combineReducers({
    RajaOngkirReducer,
    AuthReducer,
    ProfileReducer,
    LigaReducer,
    JerseyReducer
})

export default rootReducer