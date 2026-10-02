// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// Cada una de estas funciones flecha tiene un fallo. Ninguno da error de
// sintaxis: todos devuelven un resultado distinto del esperado o fallan al
// ejecutarse. Ejecuta el script, lee qué test falla y corrige la función
// cambiando lo mínimo. Escribe en un comentario cuál era el fallo.

const assert = require('node:assert/strict')

function applyToAll(list, fn) {
    const result = []
    for (const item of list) {
        result.push(fn(item))
    }
    return result
}

// 1. Debe devolver el doble de n
const double = n => { n * 2 }

// 2. Debe devolver un objeto { value: n }
const wrap = n => { value: n }

// 3. Debe devolver true o false, nunca otra cosa
const isAdult = age => {
    if (age >= 18) return true
}

// 4. Debe devolver [2, 4, 6]
const doubled = () => applyToAll([1, 2, 3], double())

assert.strictEqual(double(4), 8)
assert.deepStrictEqual(wrap(5), { value: 5 })
assert.strictEqual(isAdult(20), true)
assert.strictEqual(isAdult(15), false)
assert.deepStrictEqual(doubled(), [2, 4, 6])

console.log('Test OK')
