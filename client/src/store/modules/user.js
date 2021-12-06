import axios from 'axios'

export default {
    state: {
        user: null,
        isLoggedIn: false
    },
    mutations: {
        set_user(state, data) {
            state.user = data
            state.isLoggedIn = true
        },
        reset_user(state) {
            state.user = null
            state.isLoggedIn = false
        }
    },
    getters: {
        isLoggedIn(state) {
            return state.isLoggedIn
        },
        user(state) {
            return state.user
        }
    },
    actions: {
        login({ dispatch, commit }, data) {
            return console.log('halo')
            
            new Promise((resolve, reject) => {
                axios.post('users/login', data)
                    .then(response => {
                        const token = response.data.token
                        console.log(token)
                        localStorage.setItem('token', token)
                        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
                        dispatch('get_user')
                        resolve(response)
                    })
                    .catch(err => {
                        commit('reset_user')
                        localStorage.removeItem('token')
                        reject(err)
                    })
            })
        },
        // async get_user({ commit }) {
        //     if (!localStorage.getItem('token')) {
        //         return
        //     }
        //     try {
        //         let response = await axios.get('user')
        //         commit('set_user', response.data.data)
        //     } catch (error) {
        //         commit('reset_user')
        //         delete axios.defaults.headers.common['Authorization']
        //         localStorage.removeItem('token')
        //         return error
        //     }
        // }
    }
}