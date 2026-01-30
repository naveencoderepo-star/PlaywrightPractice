module.exports =class Car {
  constructor(brand, color) {
    this.brand = brand
    this.color = color
  }

  start() {
    console.log(`${this.brand} car is starting...`)
    return 'Started!'  // Return success message
  }

  stop() {
    console.log(`${this.brand} car is stopped...`)
    return 'Stopped!'  // Return success message
  }
}

// // Create car instances
// const car = new Car('Porsche', 'Red')
// const car1 = new Car('Lamborghini', 'Matt black')

// // Test properties
// console.log(car.brand)     // Porsche
// console.log(car1.color)    // Matt black

// // Test methods
// console.log(car.start())   // Porsche car is starting... + Started!
// console.log(car1.stop())   // Lamborghini car is stopped... + Stopped!
