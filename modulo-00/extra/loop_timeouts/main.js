// Unidad: Ámbito y closures
// Ejecuta: node main.js
//
// scheduleMessages(n) programa n callbacks con setTimeout. Cada callback
// añade a messages el texto 'Mensaje i', con i de 1 a n.
// Cuando todos se han ejecutado, se comprueba el resultado.
//
// 1. Ejecútalo tal cual. ¿Qué contiene messages? Explica en un comentario
//    cuántas variables i hay y cuándo se ejecutan los callbacks.
// 2. Corrígelo cambiando una sola palabra.
// 3. Deshaz el cambio y corrígelo de otra forma, manteniendo var: crea una
//    función schedule(i) que programe un único mensaje y llámala desde el
//    bucle. ¿Por qué funciona también así?

const assert = require('node:assert/strict')

const messages = []

function scheduleMessages(n) {
    for (var i = 1; i <= n; i++) {
        setTimeout(() => messages.push(`Mensaje ${i}`), i * 100)
    }
}

scheduleMessages(3)

// esta comprobación se ejecuta cuando ya han saltado los tres mensajes
setTimeout(() => {
    assert.deepStrictEqual(messages, ['Mensaje 1', 'Mensaje 2', 'Mensaje 3'])
    console.log('Test OK')
}, 500)
