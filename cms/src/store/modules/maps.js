import axios from 'axios'

export default {
    state: {
        tableMaps: [],
    },
    mutations: {
        set_maps(state, data) {
            state.tableMaps = data
        },
        add_maps(state, data) {
            state.tableMaps.push(data)
        }
    },
    getters: {
        tableMaps(state) {
            return state.tableMaps
        },
    },
    actions: {
        getMaps({ commit }) {
            return new Promise((resolve, reject) => {
                axios.get('maps')
                    .then(res => {
                        commit('set_maps', res.data.data)
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(res)
                    })
            })
        },
        addMaps({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('maps', data)
                    .then(res => {
                        axios.get('maps').then((res) => {
                            commit('set_maps', res.data.data)
                            resolve(res)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        editMaps({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.put(`maps/${data.id}`, data.data)
                    .then(res => {
                        axios.get('maps').then((res) => {
                            commit('set_maps', res.data.data)
                            resolve(res)
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        deleteMaps({ commit }, id) {
            return new Promise((resolve, reject) => {
                axios.delete(`maps/${id}`)
                    .then(res => {
                        resolve(res)
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err)
                    })
            })
        },
        searchMaps({ commit }, data) {
            return new Promise((resolve, reject) => {
                axios.post('maps/search', data)
                    .then(res => {
                        commit('set_maps', res.data.data)
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