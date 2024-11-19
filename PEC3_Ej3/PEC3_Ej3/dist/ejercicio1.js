"use strict";
//Sustituye /***/ por las instrucciones adecuadas que cumplan las operaciones y salidas indicadas en los comentarios.
function printArray(array) {
    // Imprimir el array en consola
    console.log(array);
}
let array = [2, 3, 4];
console.log(array[0]); //2
array.shift(); // Eliminar el primer elemento
printArray(array); // 3,4
array.push(5); //añadimos el 5 al final
printArray(array); // 3,4,5
console.log(array[2]); //5
array.pop(); // Eliminamos el último elemento
printArray(array); // 3,4
array.push(1); //Añadimos el 1 al final
printArray(array); // 3,4,1
array.unshift(8); // Añadimos el 8 al principio
printArray(array); // 8,3,4,1
/** check if every number is greater than 3 */
let everyisgreater = array.every(num => num > 3);
console.log(everyisgreater); //false
/** check if every number is less than 10 */
let everyisless = array.every(num => num < 10);
console.log(everyisless); //true
console.log(array.sort()); //1,3,4,8
console.log(array.reverse()); // 8,4,3,1
