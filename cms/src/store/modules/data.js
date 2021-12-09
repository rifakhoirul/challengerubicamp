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
                    .then(() => {
                        axios.get('data').then((res) => {
                            commit('set_data', res.data.data)
                            resolve(res)
                        })
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
    }
}