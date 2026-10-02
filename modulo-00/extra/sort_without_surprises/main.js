// Unidad: Transformar colecciones con métodos de array
// Ejecuta: node main.js
//
// Tres funciones de ordenación que NO pueden modificar el array que reciben.
// 1. ascending(numbers): números de menor a mayor. La versión de abajo tiene
//    dos fallos: ordena como texto y modifica el original. Corrige los dos.
// 2. byName(students): alumnos por nombre, en orden alfabético. Fíjate en que
//    'Álvaro' tiene que ir antes que 'Beatriz'. Pista: localeCompare.
// 3. topN(students, n): los n alumnos con mejor nota, de mayor a menor.
//    Pista: ordenar y después slice.
//
// Resuelve 1 con toSorted() y 2 con [...array].sort(): las dos formas son
// válidas y conviene reconocerlas.

const assert = require('node:assert/strict')

function ascending(numbers) {
    return numbers.sort()
}

function byName(students) {
}

function topN(students, n) {
}

const numbers = [10, 9, 1, 100, 25]
assert.deepStrictEqual(ascending(numbers), [1, 9, 10, 25, 100])
assert.deepStrictEqual(numbers, [10, 9, 1, 100, 25], 'ascending() no debe modificar el original')

const students = [
    { name: 'Eva', grade: 9 },
    { name: 'Beatriz', grade: 6 },
    { name: 'Álvaro', grade: 7 },
    { name: 'Carlos', grade: 10 },
]

assert.deepStrictEqual(
    byName(students).map(s => s.name),
    ['Álvaro', 'Beatriz', 'Carlos', 'Eva'],
)
assert.deepStrictEqual(
    topN(students, 2).map(s => s.name),
    ['Carlos', 'Eva'],
)
assert.strictEqual(students[0].name, 'Eva', 'el array de alumnos no debe cambiar de orden')

console.log('Test OK')
