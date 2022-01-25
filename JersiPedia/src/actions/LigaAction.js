import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from '../utils'
import { getDatabase, ref, child, get } from "firebase/database";
import { Alert } from 'react-native';

export const GET_LIST_LIGA = 'GET_LIST_LIGA'
export const GET_DETAIL_LIGA = 'GET_DETAIL_LIGA'

export const getListLiga = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_LIGA)

        const dbRef = ref(getDatabase());
        get(child(dbRef, `ligas`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch, GET_LIST_LIGA, data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch, GET_LIST_LIGA, error.message)
            Alert.alert(error.message)
        });
    }
}

export const getDetailLiga = (id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_DETAIL_LIGA)

        const dbRef = ref(getDatabase());
        get(child(dbRef, `ligas/${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch, GET_DETAIL_LIGA, data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch, GET_DETAIL_LIGA, error.message)
            Alert.alert(error.message)
        });
    }
}