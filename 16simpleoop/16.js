class Car {
    constructor(year, guarantee) {
        this.year = year;
        this.guarantee = guarantee;
    }
}
class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size;
    }
}
class Seat {
    constructor(seatnumber) {
        this.seatnumber = seatnumber;
    }
}
class BodyCar {
    constructor(color, bodytype) {
        this.color = color;
        this.bodytype = bodytype;
    }
}
class CarFactory {
    constructor() {
        this.cars = []
    }
    produce() {
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            this.cars.push(new Avanza(2015, 5, 'Avanza'))
        }
        for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
            this.cars.push(new Ayla(2015, 7, 'Ayla'))
        }
        return console.log(`Total produksi ${this.cars.length} unit`)
    }
    guaranteeSimulation(yearsimulation) {
        for (let i = 0; i < this.cars.length; i++) {
            let age = yearsimulation - this.cars[i].year;
            console.log(this.cars[i].guarantee > age ? 'Active' : 'Expired')
        }
    }
}
//MERK
class Avanza extends Car {  //
    constructor(year, guarantee, name) {
        super(year, guarantee)
        this.name = name
        this.seat = 7
        this.tyre = new Tyre('Radial', 50)
        this.bodycar = new BodyCar('Black', 'SUV')
    }
}
class Ayla extends Car {
    constructor(year, guarantee, name) {
        super(year, guarantee)
        this.name = name
        this.seat = 4
        this.tyre = new Tyre('Radial', 40)
        this.bodycar = new BodyCar('White', 'MPV')
    }
}

let pabrikToyota = new CarFactory()
pabrikToyota.produce()
pabrikToyota.guaranteeSimulation(2021)
