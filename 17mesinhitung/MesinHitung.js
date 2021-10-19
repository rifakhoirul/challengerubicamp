export class MesinHitung {
    constructor() {
        this.x = 1
    }
    add(a) {
        this.x += a
        return this
    }
    substract(a) {
        this.x -= a
        return this
    }
    divide(a) {
        this.x /= a
        return this
    }
    multiply(a) {
        this.x *= a
        return this
    }
    square() {
        this.x **= 2
        return this
    }
    squareRoot() {
        this.x = Math.sqrt(this.x)
        return this
    }
    exponent(a) {
        this.x **= a
        return this
    }
    result() {
        console.log(this.x)
    }
}
export var Pi = Math.PI