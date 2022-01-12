import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from '../utils'
import { getDatabase, ref, child, get, limitToLast, query, orderByChild, equalTo } from "firebase/database";
import { Alert } from 'react-native';

export const GET_LIST_JERSEY = 'GET_LIST_JERSEY'
export const GET_LIST_JERSEY_BY_LIGA = 'GET_LIST_JERSEY_BY_LIGA'
export const DELETE_PARAMETER_JERSEY = 'DELETE_PARAMETER_JERSEY'

export const getListJersey = (idLiga) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_JERSEY)
        if (idLiga) {
            const que = query(ref(getDatabase(), `jerseys`), orderByChild('liga'), equalTo(idLiga))
            get(que).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    dispatchSuccess(dispatch, GET_LIST_JERSEY, data)
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                dispatchError(dispatch, GET_LIST_JERSEY, error)
                Alert.alert(error.message)
            });
        } else {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `jerseys`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let data = snapshot.val()
                    dispatchSuccess(dispatch, GET_LIST_JERSEY, data)
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                dispatchError(dispatch, GET_LIST_JERSEY, error)
                Alert.alert(error.message)
            });
        }
    }
}

export const limitJersey = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_LIST_JERSEY)

        const que = query(ref(getDatabase(), `jerseys`), limitToLast(6));
        get(que).then((snapshot) => {
            if (snapshot.exists()) {
                let data = snapshot.val()
                dispatchSuccess(dispatch, GET_LIST_JERSEY, data)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            dispatchError(dispatch, GET_LIST_JERSEY, error)
            Alert.alert(error.message)
        });
    }
}

export const getJerseyByLiga = (id, namaLiga) => ({
    type: GET_LIST_JERSEY_BY_LIGA,
    payload: {
        idLiga: id,
        namaLiga: namaLiga
    }
})

export const deleteParameterJersey = () => ({
    type: DELETE_PARAMETER_JERSEY,
})