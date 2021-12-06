import axios from 'axios'

export default {
    state: {
        user: null,
        isLoggedIn: false,
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
        login({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('users/login', data)
                    .then(res => {
                        if (res.data.status) {
                            localStorage.setItem('token', res.data.data.token);
                            localStorage.setItem('email', res.data.data.email);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token
                            commit('set_user', res.data.data.email)
                            resolve(res)
                        } else {
                            throw res.data.data.message
                        }
                    })
                    .catch(err => {
                        commit('reset_user')
                        localStorage.removeItem('token')
                        localStorage.removeItem('email')
                        delete axios.defaults.headers.common['Authorization']
                        reject(err)
                    })
            })
        },
        logout({ commit }) {
            return new Promise((resolve) => {
                commit('reset_user')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        register({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.post('users/register', data)
                    .then(res => {
                        if (res.data.status) {
                            localStorage.setItem('token', res.data.data.token);
                            localStorage.setItem('email', res.data.data.email);
                            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token
                            commit('set_user', res.data.data.email)
                            resolve(res)
                        } else {
                            throw res.data.data.message
                        }
                    })
                    .catch(err => {
                        commit('reset_user')
                        console.log(err)
                        reject(err)
                    })
            })
        },
        async get_user({ commit }) {
            if (!localStorage.getItem('token')) {
                return
            }
            try {
                //   let response = await axios.get('user')
                commit('set_user', localStorage.getItem('email'))
            } catch (error) {
                commit('reset_user')
                removeHeaderToken()
                localStorage.removeItem('token')
                return error
            }
        }
    }
}