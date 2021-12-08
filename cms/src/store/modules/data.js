import axios from 'axios'

export default {
    state: {
        tableData: [],
    },
    mutations: {
        set_data(state, data) {
            state.tableData = data
        },
        add_data(state, data) {
            state.tableData.push(data)
        }
    },
    getters: {
        tableData(state) {
            return state.tableData
        },
    },
    actions: {
        getData({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('data')
                    .then(res => {
                        commit('set_data', res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(res)
                    })
            })
        },
        addData({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('data', data)
                    .then(res => {
                        commit('add_data', data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        editData({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.put(`data/${data.id}`, data.data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        deleteData({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`data/${id}`)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        searchData({ commit }, data) {
            console.log(data)
            return new Promise((resolve, reject) => {
                axios.post('data/search', data)
                    .then(res => {
                        commit('set_data', res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        // login({ commit }, data) {
        //     return new Promise((resolve, reject) => {
        //         axios.post('users/login', data)
        //             .then(res => {
        //                 if (res.data.status) {
        //                     localStorage.setItem('token', res.data.data.token);
        //                     localStorage.setItem('email', res.data.data.email);
        //                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token
        //                     commit('set_user', res.data.data.email)
        //                     resolve(res)
        //                 } else {
        //                     throw res.data.data.message
        //                 }
        //             })
        //             .catch(err => {
        //                 commit('reset_user')
        //                 localStorage.removeItem('token')
        //                 localStorage.removeItem('email')
        //                 delete axios.defaults.headers.common['Authorization']
        //                 reject(err)
        //             })
        //     })
        // },
        // logout({ commit }) {
        //     return new Promise((resolve) => {
        //         commit('reset_user')
        //         localStorage.removeItem('token')
        //         delete axios.defaults.headers.common['Authorization']
        //         resolve()
        //     })
        // },
        // register({ commit }, data) {
        //     console.log(data)
        //     return new Promise((resolve, reject) => {
        //         axios.post('users/register', data)
        //             .then(res => {
        //                 if (res.data.status) {
        //                     localStorage.setItem('token', res.data.data.token);
        //                     localStorage.setItem('email', res.data.data.email);
        //                     axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.data.token
        //                     commit('set_user', res.data.data.email)
        //                     resolve(res)
        //                 } else {
        //                     throw res.data.data.message
        //                 }
        //             })
        //             .catch(err => {
        //                 commit('reset_user')
        //                 console.log(err)
        //                 reject(err)
        //             })
        //     })
        // },
        // async get_user({ commit }) {
        //     if (!localStorage.getItem('token')) {
        //         return
        //     }
        //     try {
        //         //   let response = await axios.get('user')
        //         commit('set_user', localStorage.getItem('email'))
        //     } catch (error) {
        //         commit('reset_user')
        //         removeHeaderToken()
        //         localStorage.removeItem('token')
        //         return error
        //     }
        // }
    }
}