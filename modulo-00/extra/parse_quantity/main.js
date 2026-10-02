// Unidad: Tipos dinámicos y coerción
// Ejecuta: node main.js
//
// Un campo de formulario siempre entrega un texto. parseQuantity(text) lo
// convierte en una cantidad de unidades válida: un número entero mayor o igual
// que 0. Si el texto no es una cantidad válida, devuelve null.
//
// Cuidado con la trampa de Number(): Number('') y Number('   ') dan 0, no NaN.
// Pistas: text.trim(), Number(), Number.isNaN() y Number.isInteger().

const assert = require('node:assert/strict')

function parseQuantity(text) {
}

// cantidades válidas
assert.strictEqual(parseQuantity('3'), 3)
assert.strictEqual(parseQuantity(' 12 '), 12)
assert.strictEqual(parseQuantity('0'), 0)

// textos que no son números
assert.strictEqual(parseQuantity('tres'), null)
assert.strictEqual(parseQuantity('12abc'), null)

// el campo vacío no es un 0
assert.strictEqual(parseQuantity(''), null)
assert.strictEqual(parseQuantity('   '), null)

// números que no son cantidades
assert.strictEqual(parseQuantity('2.5'), null)
assert.strictEqual(parseQuantity('-1'), null)

console.log('Test OK')
