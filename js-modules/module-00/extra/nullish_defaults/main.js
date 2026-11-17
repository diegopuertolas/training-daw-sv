// Unidad: Tipos dinámicos y coerción
// Ejecuta: node main.js
//
// productLabel(product) devuelve la etiqueta de un producto del carrito con el
// formato "nombre · N ud. · -D%". Algunos datos pueden faltar:
// - name: si falta o es el texto vacío, se muestra "Sin nombre".
// - units: si falta (null o undefined), vale 1. Pero 0 es un dato válido.
// - discount: si falta (null o undefined), vale 0.
//
// 1. La versión de abajo usa || en los tres casos. Ejecútala: ¿qué tests fallan
//    y por qué?
// 2. Corrígela eligiendo, campo por campo, entre || y ??. Explica la elección
//    de cada uno en un comentario.

const assert = require('node:assert/strict')

function productLabel(product) {
    const name = product.name || 'Sin nombre'
    const units = product.units || 1
    const discount = product.discount || 0
    return `${name} · ${units} ud. · -${discount}%`
}

assert.strictEqual(productLabel({ name: 'Cable', units: 3, discount: 10 }), 'Cable · 3 ud. · -10%')
assert.strictEqual(productLabel({ name: 'Cable' }), 'Cable · 1 ud. · -0%')
assert.strictEqual(productLabel({ name: '', units: 2 }), 'Sin nombre · 2 ud. · -0%')
assert.strictEqual(productLabel({ units: null, discount: undefined }), 'Sin nombre · 1 ud. · -0%')

// el usuario ha vaciado la línea: 0 unidades
assert.strictEqual(productLabel({ name: 'Funda', units: 0 }), 'Funda · 0 ud. · -0%')

console.log('Test OK')
