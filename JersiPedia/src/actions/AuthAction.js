import { storeData } from '../utils'
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { firebaseConfig } from '../config/firebase';

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export const REGISTER_USER = "REGISTER_USER"
export const LOGIN_USER = "LOGIN_USER"

export const registerUser = (data, password) => {
    return (dispatch) => {
        dispatch({
            type: REGISTER_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false,
            }
        })

        createUserWithEmailAndPassword(auth, data.email, password)
            .then((userCredential) => {
                const dataBaru = {
                    ...data,
                    uid: userCredential.user.uid
                }
                const db = getDatabase();
                console.log('start')
                set(ref(db, 'users/' + userCredential.user.uid), dataBaru)
                    .then(() => {
                        console.log('datasuccess')
                    })
                    .catch((error) => {
                        console.log('failed')
                    });
                console.log('finish')

                dispatch({
                    type: REGISTER_USER,
                    payload: {
                        loading: false,
                        data: dataBaru,
                        errorMessage: false
                    }
                })

                storeData('user', dataBaru)
            })
            .catch((error) => {
                dispatch({
                    type: REGISTER_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    }
                })
                alert(error.message)
            });
    }
}

export const loginUser = (email, password) => {
    return (dispatch) => {

        dispatch({
            type: LOGIN_USER,
            payload: {
                loading: true,
                data: false,
                errorMessage: false
            }
        })

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log('berhasil login')
                const dbRef = ref(getDatabase());
                get(child(dbRef, `users/${userCredential.user.uid}`)).then((snapshot) => {
                    console.log('berhasil get')
                    if (snapshot.exists()) {
                        dispatch({
                            type: LOGIN_USER,
                            payload: {
                                loading: false,
                                data: snapshot.val() ? snapshot.val() : [],
                                errorMessage: false
                            }
                        })
                        storeData('user', snapshot.val())
                    } else {
                        console.log("No data available");
                        dispatch({
                            type: LOGIN_USER,
                            payload: {
                                loading: false,
                                data: false,
                                errorMessage: "Data user tidak ditemukan!",
                            }
                        })
                        alert("Data user tidak ditemukan!")
                    }
                }).catch((error) => {
                    console.error('gagal', error);
                });
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_USER,
                    payload: {
                        loading: false,
                        data: false,
                        errorMessage: error.message,
                    }
                })
                alert(error.message)
            });
    }
}