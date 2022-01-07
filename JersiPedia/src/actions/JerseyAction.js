import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from '../utils'
import { getDatabase, ref, child, get, limitToLast,query } from "firebase/database";
import { Alert } from 'react-native';


export const GET_LIST_JERSEY = 'GET_LIST_JERSEY'

export const getListJersey = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_JERSEY)

        const dbRef = ref(getDatabase());
        get(child(dbRef, `jerseys`)).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch,GET_LIST_JERSEY,data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch,GET_LIST_JERSEY,error)
            Alert.alert(error)
        });
    }
}

export const limitJersey = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_JERSEY)

        const que = query(ref(getDatabase(),`jerseys`), limitToLast(6));
        get(que).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch,GET_LIST_JERSEY,data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch,GET_LIST_JERSEY,error)
            Alert.alert(error)
        });
    }
}