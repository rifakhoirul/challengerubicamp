class Response {
    constructor(data, status){
        this.status = status || true
        this.data = data || {}
    }
}

module.exports = Response