import { getDatabase, update, ref } from "firebase/database"
import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from "../utils";

export const UPDATE_PROFILE = 'UPDATE_PROFILE'

export const updateProfile = (data) => {
    return (dispatch) => {
        dispatchLoading(dispatch, UPDATE_PROFILE)

        const dataBaru = {
            uid: data.uid,
            nama: data.nama,
            alamat: data.alamat,
            nohp: data.nohp,
            kota: data.kota,
            provinsi: data.provinsi,
            email: data.email,
            status: 'user',
            avatar: data.updateAvatar ? data.avatarForDB : data.avatarLama
        }

        const db = getDatabase();
        const updates = {}
        updates[`/users/${dataBaru.uid}`] = dataBaru
        update(ref(db), updates)
            .then((response) => {
                dispatchSuccess(dispatch, UPDATE_PROFILE, response ? response : [])
                storeData('user', dataBaru)
            })
            .catch(error => {
                dispatchError(dispatch, UPDATE_PROFILE, error.message)
                alert(error.message)
            })
    }
}