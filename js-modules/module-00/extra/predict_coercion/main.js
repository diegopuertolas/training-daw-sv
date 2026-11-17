// Unidad: Tipos dinámicos y coerción
// Ejecuta: node main.js
//
// Sustituye cada __ por el resultado que crees que da la expresión de su
// izquierda, SIN ejecutar nada antes. Después ejecuta el script: se detiene en
// la primera predicción que falle y te muestra el valor real.
// En cada fallo, escribe al lado un comentario con la regla que lo explica.

const assert = require('node:assert/strict')

const __ = Symbol('sin responder')

// Operadores con tipos mezclados
assert.strictEqual('5' + 3, __)
assert.strictEqual('5' - 3, __)
assert.strictEqual('5' * '2', __)
assert.strictEqual(true + 1, __)
assert.strictEqual(10 + 5 + ' euros', __)
assert.strictEqual('Total: ' + 10 + 5, __)

// Conversiones explícitas
assert.strictEqual(Number(' 42 '), __)
assert.strictEqual(Number(''), __)
assert.strictEqual(Number('12abc'), __) // pista: ¿qué valor no es igual a sí mismo?
assert.strictEqual(String(null), __)

// typeof
assert.strictEqual(typeof null, __)
assert.strictEqual(typeof [], __)
assert.strictEqual(typeof (() => 1), __)
assert.strictEqual(typeof NaN, __)

// Igualdades
assert.strictEqual(0 == '', __)
assert.strictEqual(0 === '', __)
assert.strictEqual(null == undefined, __)
assert.strictEqual(null === undefined, __)

// Truthy y falsy
assert.strictEqual(Boolean('0'), __)
assert.strictEqual(Boolean([]), __)
assert.strictEqual(Boolean(' '), __)
assert.strictEqual(Boolean(NaN), __)

// || frente a ??
assert.strictEqual(0 || 5, __)
assert.strictEqual(0 ?? 5, __)
assert.strictEqual('' || 'vacío', __)
assert.strictEqual('' ?? 'vacío', __)
assert.strictEqual(undefined ?? null ?? 'último', __)

console.log('Test OK')
