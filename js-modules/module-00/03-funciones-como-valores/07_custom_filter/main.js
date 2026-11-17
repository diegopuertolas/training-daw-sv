// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// 1. Implementa select(array, condition): recorre el array con un bucle
//    for...of y devuelve un array nuevo con los elementos para los que
//    condition(elemento) devuelve true. No uses filter().
// 2. Declara con function las tres condiciones que usan los tests:
//    pairs, gt15 y lt10.

const assert = require('node:assert/strict')

function select(array, condition) {
  const newArray = [];
  for (element of array) {
    if (condition(element)) {
      newArray.push(element);
    } 
  }
  return newArray;
}

// TODO: function pairs(n) { ... }, function gt15(n) { ... }, function lt10(n) { ... }

// function pairs(n) {
//   return n % 2 === 0
// }
const pairs = (n) => n % 2 === 0;

// function gt15(n) {
//   return n > 15 
// }
const gt15 = (n) => n > 15;

// function lt10(n) {
//   return n < 10 
// }
const lt10 = (n) => n < 10;

const values = [1, 2, 3, 5, 7, 13, 17, 23, 29];

// sólo pares
assert.deepStrictEqual(select(values, pairs), [2]);

// mayores que 15
assert.deepStrictEqual(select(values, gt15), [17, 23, 29]);

// menores de 10
assert.deepStrictEqual(select(values, lt10), [1, 2, 3, 5, 7]);

console.log('Test OK');