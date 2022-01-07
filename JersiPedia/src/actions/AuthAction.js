import { dispatchError, dispatchLoading, dispatchSuccess, storeData } from '../utils'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { firebaseConfig } from '../config/firebase';
import { Alert } from 'react-native';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const REGISTER_USER = "REGISTER_USER"
export const LOGIN_USER = "LOGIN_USER"

export const registerUser = (data, password) => {
    return (dispatch) => {
        dispatchLoading(dispatch, REGISTER_USER)

        createUserWithEmailAndPassword(auth, data.email, password)
            .then((userCredential) => {
                const dataBaru = {
                    ...data,
                    uid: userCredential.user.uid
                }
                const db = getDatabase();
                set(ref(db, 'users/' + userCredential.user.uid), dataBaru)
                dispatchSuccess(dispatch, REGISTER_USER, dataBaru)
                storeData('user', dataBaru)
            })
            .catch((error) => {
                dispatchError(dispatch, REGISTER_USER, error.message)
                Alert.alert(error.message)
            });
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {
        dispatchLoading(dispatch, LOGIN_USER)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('berhasil login')
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${userCredential.user.uid}`)).then((snapshot) => {
                    console.log('berhasil get')
                    if (snapshot.exists()) {
                        dispatchSuccess(dispatch, LOGIN_USER, snapshot.val() ? snapshot.val() : [])
                        storeData('user', snapshot.val())
                    } else {
                        console.log("No data available");
                        dispatchError(dispatch, LOGIN_USER, "Data user tidak ditemukan!")
                        Alert.alert("Data user tidak ditemukan!")
                    }
                }).catch((error) => {
                    console.error('gagal', error);
                });
            })
            .catch((error) => {
                dispatchError(dispatch, LOGIN_USER, error.message)
                Alert.alert(error.message)
            });
    }
}