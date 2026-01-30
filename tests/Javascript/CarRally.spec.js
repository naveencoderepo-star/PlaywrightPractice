// CarRally.js - How OTHER CLASS is called
const Car = require('./Car')  // 🚗 IMPORT Car class from other file

class CarRally {
  constructor() {
    this.cars = []
  }

  addCar(brand, color) {
    // 🔥 CALL OTHER CLASS HERE!
    const car = new Car(brand, color)  // Car() from ./Car.js
    this.cars.push(car)
    return car
  }

  startRally() {
    this.cars.forEach(car => car.start())  // Car.start() method called
  }
}

// 🏁 TEST: CarRally uses Car class
const rally = new CarRally()
const bmw = rally.addCar('BMW', 'White')  // Creates Car object

console.log(bmw.start())  // ✅ FIXED: bmw.start()


// timing: 2.43  need to resume


