// Javascript Object is collection of properties

let person = {
  firstName: 'Tim',
  lastName: 'Jane',
  age : 24,
  fullName : function(){

    console.log(this.firstName+this.lastName)
  }

};


console.log(person.fullName())

console.log('1️⃣ Accessing value using dot notation (person.firstName)');
console.log('Reason: Dot notation is used when key name is known and valid');
console.log(person.firstName);
console.log('----------------------------------');

console.log('2️⃣ Accessing value using bracket notation (person["lastName"])');
console.log('Reason: Bracket notation is useful when key is dynamic or has special characters');
console.log(person['lastName']);
console.log('----------------------------------');

console.log('3️⃣ Printing full object');
console.log('Reason: To see all key-value pairs inside the object');
console.log(person);
console.log('----------------------------------');

console.log('4️⃣ Updating existing property (firstName)');
console.log('Reason: Objects are mutable, values can be updated anytime');
person.firstName = 'Tim David';
console.log(person);
console.log('----------------------------------');

console.log('5️⃣ Adding a new property (gender)');
console.log('Reason: New keys can be added outside object declaration');

person.gender = 'male';
console.log(person);
console.log('----------------------------------');

console.log('6️⃣ Deleting a property (gender)');
console.log('Reason: delete keyword removes a key-value pair from object');

delete person.gender;
console.log(person);

console.log('----------------------------------');


console.log("Gender isAvailable : "+'gender' in person)  // To check whether this key is exists in the javascipt object or not.....




// To print the value of all the properties in Javascript Object

for(let key in person){
  console.log(person[key])   // here example person[key]  --> here key refer to firstName, lastName....

  
}


