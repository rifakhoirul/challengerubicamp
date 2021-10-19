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
    produce() {
        return console.log(`Total produksi dalam setahun: ${Math.floor(Math.random() * 100000)} unit`)
    }
}
//MERK
class Avanza extends Car {  //
    constructor(year,guarantee) {
        super(year,guarantee)
        this.seat = 7
        this.tyre = new Tyre('Radial', 50)
        this.bodycar = new BodyCar('Black','SUV')
     }

}
class Ayla extends Car {
    constructor(year, guarantee) { 
        super(year,guarantee)
        this.seat = 4;
        this.tyre = new Tyre('Radial', 40)
        this.bodycar = new BodyCar('White','MPV')
    }
}

//
let mobil = new CarFactory()
mobil.produce();