// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// Implementa abs(), que devuelve el valor absoluto de un número, sin usar
// Math.abs(). Escríbela primero como declaración de función y después como
// función flecha guardada en una constante: los tests deben pasar con las dos.

const assert = require('node:assert/strict');

function abs(value) {
  if (value > 0) return value;
  else if (value < 0) return value * -1
  else return 0;
}

const absArrowFunction = (value) => {
  if (value > 0) return value;
  else if (value < 0) return value * -1
  else return 0;
}

assert.strictEqual(abs(4), 4);
assert.strictEqual(abs(-4), 4);
assert.strictEqual(abs(0), 0);

assert.strictEqual(absArrowFunction(4), 4);
assert.strictEqual(absArrowFunction(-4), 4);
assert.strictEqual(absArrowFunction(0), 0);

console.log('Test OK');