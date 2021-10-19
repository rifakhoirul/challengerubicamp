class Car {
    constructor(year, guarantee) {
        this.year = year;
        this.guarantee = guarantee;
    }
    guaranteesim(yearsimulation) {
        let age = yearsimulation - this.year;
        return this.guarantee > age ? 'Active':'Expired'
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
    constructor(){
        this.cars = []
    }
    produce(){
        this.cars.push(new Avanza(2019,2025, 'Avanza'))
        this.cars.push(new Ayla(2019,2025, 'Ayla'))
        return console.log(`Total produksi ${this.cars[0].name}: ${Math.floor(Math.random() * 10000)} unit.\nTotal produksi ${this.cars[1].name}: ${Math.floor(Math.random() * 10000)} unit`)
    }        
}
//MERK
class Avanza extends Car {  //
    constructor(year,guarantee,name) {
        super(year,guarantee)
        this.name = name
        this.seat = 7
        this.tyre = new Tyre('Radial', 50)
        this.bodycar = new BodyCar('Black','SUV')
     }
}
class Ayla extends Car {
    constructor(year, guarantee,name) { 
        super(year,guarantee)
        this.name = name
        this.seat = 4
        this.tyre = new Tyre('Radial', 40)
        this.bodycar = new BodyCar('White','MPV')
    }
}

let pabrikToyota = new CarFactory()
pabrikToyota.produce()
