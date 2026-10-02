// Unidad: Objetos, arrays y referencias
// Ejecuta: node main.js
//
// Resuelve cada función con desestructuración. Ninguna puede usar la notación
// de punto (student.name) ni los índices (list[0]) para leer sus argumentos.
//
// 1. card(student): desestructura el objeto en los parámetros. Devuelve
//    'nombre · curso · email'. Si falta course, se usa 'sin curso'. El email
//    está en student.contact.email, pero contact puede no existir: en ese caso
//    se muestra 'sin email'. Pista: encadenamiento opcional (?.) y ??.
// 2. headAndTail(list): devuelve un objeto { head, tail } con el primer
//    elemento y un array con el resto.
// 3. swap(pair): recibe un array de dos elementos y devuelve otro con los dos
//    intercambiados, sin variables auxiliares.
// 4. rename(student): devuelve { fullName, group } a partir de name y course,
//    renombrando al desestructurar.

const assert = require('node:assert/strict')

function card(student) {
}

function headAndTail(list) {
}

function swap(pair) {
}

function rename(student) {
}

const ana = { name: 'Ana', course: '2DAW', contact: { email: 'ana@correo.es' } }
const luis = { name: 'Luis' }

assert.strictEqual(card(ana), 'Ana · 2DAW · ana@correo.es')
assert.strictEqual(card(luis), 'Luis · sin curso · sin email')

assert.deepStrictEqual(headAndTail([7, 9, 8]), { head: 7, tail: [9, 8] })
assert.deepStrictEqual(headAndTail([5]), { head: 5, tail: [] })

assert.deepStrictEqual(swap(['a', 'b']), ['b', 'a'])

assert.deepStrictEqual(rename(ana), { fullName: 'Ana', group: '2DAW' })

console.log('Test OK')
