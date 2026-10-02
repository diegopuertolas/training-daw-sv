// Unidad: Ámbito y closures
// Ejecuta: node main.js
//
// once(fn) devuelve una función nueva que ejecuta fn sólo la primera vez que
// se llama. En las llamadas siguientes no vuelve a ejecutar fn, sino que
// devuelve el mismo resultado que la primera vez.
// Sirve, por ejemplo, para que un botón de «Pagar» no cobre dos veces.
//
// Pistas: la función devuelta necesita recordar dos cosas entre llamadas:
// si fn ya se ha ejecutado y qué devolvió. Y debe pasar a fn los argumentos
// que reciba (parámetro rest y spread).

const assert = require('node:assert/strict')

function once(fn) {
}

let charges = 0
const pay = once(amount => {
    charges++
    return `Cobrados ${amount} €`
})

assert.strictEqual(pay(30), 'Cobrados 30 €')
assert.strictEqual(pay(30), 'Cobrados 30 €')
assert.strictEqual(pay(99), 'Cobrados 30 €')
assert.strictEqual(charges, 1)

// cada función creada con once lleva su propia memoria
const hello = once((name, greeting) => `${greeting}, ${name}`)
assert.strictEqual(hello('Ana', 'Hola'), 'Hola, Ana')
assert.strictEqual(hello('Luis', 'Adiós'), 'Hola, Ana')
assert.strictEqual(charges, 1)

console.log('Test OK')
