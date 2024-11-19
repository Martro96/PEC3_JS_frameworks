"use strict";
class Animal {
    constructor() {
        Animal.population++; // Cada vez que se crea un Animal, incrementamos la población
    }
}
Animal.population = 0;
class Dog extends Animal {
    constructor(color) {
        super(); // llamamos al constructor de la clase padre Animal
        this.color = color;
    }
    // Implementamos el método abstracto sound()
    sound() {
        console.log("WOW"); // El perro hace "WOW"
    }
    iamadog() {
        console.log('yes, this is a dog');
    }
}
class Cat extends Animal {
    constructor(gender) {
        super(); // llamamos al constructor de la clase padre Animal
        this.gender = gender;
    }
    // Implementamos el método abstracto sound()
    sound() {
        console.log("MEOW"); // El gato hace "MEOW"
    }
    iamacat() {
        console.log('yes, this is a cat');
    }
}
let animals = []; //se crea la lista de animales
animals.push(new Cat('male'));
animals.push(new Dog('white'));
animals.push(new Cat('female'));
animals.push(new Dog('black'));
for (let animal of animals) { //recorremos el array animals
    animal.sound(); // Llamamos al método sound() de cada animal, que imprimirá "MEOW" o "WOW"
    // Identificamos el tipo de animal y ejecutamos el método específico
    if (animal instanceof Dog) { //usamos instanceof porque permite verificar si un objeto pertenece a una clase específica.
        animal.iamadog(); // Si es un perro, imprimimos "yes, this is a dog"
    }
    else if (animal instanceof Cat) {
        animal.iamacat(); // Si es un gato, imprimimos "yes, this is a cat"
    }
}
/**  loop prints these lines
MEOW
yes, this is a cat
WOW
yes, this is a dog
MEOW
yes, this is a cat
WOW
yes, this is a dog
*/
console.log(Animal.population); //4
