import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from '../utils'
import { getDatabase, ref, child, get } from "firebase/database";
import { Alert } from 'react-native';


export const GET_LIST_LIGA = 'GET_LIST_LIGA'

export const getListLiga = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_LIGA)

        const dbRef = ref(getDatabase());
        get(child(dbRef, `ligas`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch,GET_LIST_LIGA,data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch,GET_LIST_LIGA,error)
            Alert.alert(error)
        });
    }
}