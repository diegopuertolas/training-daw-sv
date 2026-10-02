// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// Alguien que venía de Java ha intentado escribir dos versiones de greet y dos
// de area, cada una con distinto número de parámetros.
// 1. Antes de ejecutarlo, predice qué tests fallan. Ejecuta y comprueba.
// 2. Explica en un comentario por qué la primera versión de cada función no
//    se usa nunca, ni siquiera en las llamadas con un solo argumento.
// 3. Deja UNA sola función greet y UNA sola area que pasen todos los tests.
//    Pista: parámetros por defecto. En area, el valor por defecto de un
//    parámetro puede usar uno anterior: function f(a, b = a) { ... }

const assert = require('node:assert/strict')

// greet(name) -> 'Hola, name'
function greet(name) {
    return `Hola, ${name}`
}

// greet(name, greeting) -> 'greeting, name'
function greet(name, greeting) {
    return `${greeting}, ${name}`
}

// area(side) -> área de un cuadrado
function area(side) {
    return side * side
}

// area(base, height) -> área de un rectángulo
function area(base, height) {
    return base * height
}

assert.strictEqual(greet('Ana'), 'Hola, Ana')
assert.strictEqual(greet('Ana', 'Buenos días'), 'Buenos días, Ana')
assert.strictEqual(area(4), 16)
assert.strictEqual(area(4, 3), 12)

console.log('Test OK')
