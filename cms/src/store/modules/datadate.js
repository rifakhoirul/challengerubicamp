import axios from 'axios'

export default {
    state: {
        tableDataDate: [],
    },
    mutations: {
        set_datadate(state, data) {
            state.tableDataDate = data
        },
        add_datadate(state, data) {
            state.tableDataDate.push(data)
        }
    },
    getters: {
        tableDataDate(state) {
            return state.tableDataDate
        },
    },
    actions: {
        getDataDate({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('datadate')
                    .then(res => {
                        commit('set_datadate', res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(res)
                    })
            })
        },
        addDataDate({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('datadate', data)
                    .then(res => {
                        commit('add_datadate', data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        editDataDate({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.put(`datadate/${data.id}`, data.data)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        deleteDataDate({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`datadate/${id}`)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        searchDataDate({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('datadate/search', data)
                    .then(res => {
                        commit('set_datadate', res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
    }
}