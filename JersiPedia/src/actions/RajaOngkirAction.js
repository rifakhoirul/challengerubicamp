import axios from 'axios'
import { Alert } from 'react-native'
import { API_HEADER_RAJAONGKIR, API_RAJAONGKIR, API_TIMEOUT, dispatchError, dispatchLoading, dispatchSuccess, } from '../utils'

export const GET_PROVINSI = 'GET_PROVINSI'
export const GET_KOTA = 'GET_KOTA'

export const getProvinsiList = () => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_PROVINSI)

        axios({
            method: 'get',
            url: API_RAJAONGKIR + 'province',
            timeout: API_TIMEOUT,
            headers: API_HEADER_RAJAONGKIR
        }).then(response => {
            if (response.status !== 200) {
                dispatchError(dispatch, GET_PROVINSI, response)
            } else {
                dispatchSuccess(dispatch, GET_PROVINSI, response.data ? response.data.rajaongkir.results : [])
            }
        }).catch(error => {
            dispatchError(dispatch, GET_PROVINSI, error.message)
            Alert.alert(error.message)
        })
    }
}

export const getKotaList = (provinsi_id) => {
    return (dispatch) => {
        dispatchLoading(dispatch, GET_KOTA)

        axios({
            method: 'get',
            url: API_RAJAONGKIR + 'city?province=' + provinsi_id,
            timeout: API_TIMEOUT,
            headers: API_HEADER_RAJAONGKIR
        }).then(response => {
            if (response.status !== 200) {
                dispatchError(dispatch, GET_KOTA, response)
            } else {
                dispatchSuccess(dispatch, GET_KOTA, response.data ? response.data.rajaongkir.results : [])
            }
        }).catch(error => {
            dispatchError(dispatch, GET_KOTA, error.message)
            Alert.alert(error.message)
        })
    }
}