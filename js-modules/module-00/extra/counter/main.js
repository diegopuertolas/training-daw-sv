// Unidad: Ámbito y closures
// Ejecuta: node main.js
//
// createCounter(start, step) devuelve un objeto con tres funciones que
// comparten una cuenta privada:
// - next(): suma step a la cuenta y devuelve el nuevo valor
// - current(): devuelve la cuenta sin cambiarla
// - reset(): vuelve a dejar la cuenta en start
// start vale 0 por defecto y step, 1.
//
// La cuenta NO puede ser una propiedad del objeto devuelto: tiene que vivir en
// una variable de createCounter, de forma que sólo se pueda cambiar a través
// de las tres funciones.

const assert = require('node:assert/strict')

function createCounter(start, step) {
}

const a = createCounter()
assert.strictEqual(a.next(), 1)
assert.strictEqual(a.next(), 2)
assert.strictEqual(a.current(), 2)

// cada contador tiene su propia cuenta
const b = createCounter(10, 5)
assert.strictEqual(b.next(), 15)
assert.strictEqual(a.next(), 3)

a.reset()
assert.strictEqual(a.current(), 0)
assert.strictEqual(b.current(), 15)

// desde fuera no se puede tocar la cuenta
assert.deepStrictEqual(Object.keys(a).sort(), ['current', 'next', 'reset'])

console.log('Test OK')
