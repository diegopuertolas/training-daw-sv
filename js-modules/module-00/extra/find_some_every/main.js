// Unidad: Transformar colecciones con métodos de array
// Ejecuta: node main.js
//
// Resuelve cada función con UNA sola llamada al método de array adecuado:
// find, findIndex, some o every. Nada de bucles ni de filter: estos métodos
// dejan de recorrer en cuanto conocen la respuesta.
// - byName(name): el alumno con ese nombre, o undefined si no existe
// - positionOf(name): su posición en el array, o -1
// - anyFailed(): ¿hay algún suspenso (nota menor que 5)?
// - allFrom(course): ¿son todos de ese curso?
// - firstWithGradeAbove(grade): el primer alumno con nota mayor que grade
//
// Ampliación: cuenta cuántas veces se llama al callback en anyFailed()
// añadiendo un console.log dentro. ¿Por qué no son cinco?

const assert = require('node:assert/strict')

const students = [
    { name: 'Ana', grade: 8, course: '2DAW' },
    { name: 'Luis', grade: 4, course: '2DAW' },
    { name: 'Eva', grade: 9, course: '2DAM' },
    { name: 'Marta', grade: 6, course: '2DAW' },
    { name: 'Iker', grade: 3, course: '2DAM' },
]

function byName(name) {
}
function positionOf(name) {
}
function anyFailed() {
}
function allFrom(course) {
}
function firstWithGradeAbove(grade) {
}

assert.strictEqual(byName('Eva'), students[2])
assert.strictEqual(byName('Pedro'), undefined)
assert.strictEqual(positionOf('Marta'), 3)
assert.strictEqual(positionOf('Pedro'), -1)
assert.strictEqual(anyFailed(), true)
assert.strictEqual(allFrom('2DAW'), false)
assert.strictEqual(firstWithGradeAbove(8), students[2])
assert.strictEqual(firstWithGradeAbove(10), undefined)

console.log('Test OK')
