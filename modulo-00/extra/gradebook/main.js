// Unidad: Transformar colecciones con métodos de array
// Ejecuta: node main.js
//
// Reto de repaso del módulo: combina closures, objetos, copias y métodos de
// array.
//
// createGradebook() devuelve un cuaderno de notas con estas funciones:
// - add(name, grade): añade una nota. Si la nota no es un número entre 0 y
//   10, no añade nada y devuelve false; si la añade, devuelve true.
// - average(): media de todas las notas, redondeada a un decimal (número, no
//   texto). Con el cuaderno vacío, devuelve null.
// - best(): el registro { name, grade } con la nota más alta, o undefined.
// - passed(): nombres de los aprobados (nota >= 5) en orden alfabético.
// - list(): una COPIA de todos los registros. Quien la reciba puede
//   modificarla sin alterar el cuaderno.
//
// Los registros viven en una variable de createGradebook, no en el objeto
// devuelto. Cada cuaderno es independiente.

const assert = require('node:assert/strict')

function createGradebook() {
}

const daw = createGradebook()
assert.strictEqual(daw.average(), null)
assert.strictEqual(daw.best(), undefined)

assert.strictEqual(daw.add('Luis', 4), true)
assert.strictEqual(daw.add('Ana', 8.5), true)
assert.strictEqual(daw.add('Eva', 9), true)
assert.strictEqual(daw.add('Iker', 6), true)
assert.strictEqual(daw.add('Pedro', 11), false)
assert.strictEqual(daw.add('Marta', '7'), false)

assert.strictEqual(daw.average(), 6.9)
assert.deepStrictEqual(daw.best(), { name: 'Eva', grade: 9 })
assert.deepStrictEqual(daw.passed(), ['Ana', 'Eva', 'Iker'])

// list() devuelve una copia: modificarla no cambia el cuaderno
const copy = daw.list()
copy.push({ name: 'Intruso', grade: 10 })
copy[0].grade = 10
assert.strictEqual(daw.list().length, 4)
assert.deepStrictEqual(daw.best(), { name: 'Eva', grade: 9 })

// otro cuaderno no comparte registros
const dam = createGradebook()
dam.add('Sara', 7)
assert.strictEqual(dam.list().length, 1)
assert.strictEqual(daw.list().length, 4)

console.log('Test OK')
