// Unidad: Almacenamiento en el navegador
// Ejecuta: node main.js
//
// Node no tiene localStorage, así que los tests usan un AlmacenFalso que se
// comporta igual: sólo guarda textos (convierte con String lo que le des) y
// getItem devuelve null si la clave no existe. Tu código no sabe si habla con
// el falso o con el localStorage de verdad: lo recibe como parámetro.
//
// crearAlmacen(storage, clave, porDefecto) devuelve un objeto con:
// - leer(): el valor guardado en esa clave, ya convertido de JSON. Si no hay
//   nada guardado, o lo guardado no es JSON válido, devuelve una COPIA de
//   porDefecto (structuredClone), nunca el propio objeto: si quien lo recibe
//   lo modifica, el valor por defecto no debe cambiar.
// - guardar(valor): lo guarda como JSON.
// - actualizar(fn): lee el valor, llama a fn con él y guarda lo que fn
//   devuelva. Devuelve también el valor nuevo.
// - borrar(): elimina la clave.
//
// En el navegador lo usarías así:
//     const preferencias = crearAlmacen(localStorage, 'preferencias:v1', { tema: 'claro' })

const assert = require('node:assert/strict')

function crearAlmacen(storage, clave, porDefecto) {
}

// ---- Tests (no los modifiques) ----
class AlmacenFalso {
    #datos = new Map()
    getItem(clave) { return this.#datos.has(clave) ? this.#datos.get(clave) : null }
    setItem(clave, valor) { this.#datos.set(String(clave), String(valor)) }
    removeItem(clave) { this.#datos.delete(clave) }
}

const storage = new AlmacenFalso()

// primera visita: no hay nada guardado
const tareas = crearAlmacen(storage, 'tareas:v1', [])
assert.deepStrictEqual(tareas.leer(), [])

// guardar y leer un array de objetos: vuelven los tipos originales
tareas.guardar([{ id: 1, texto: 'Repasar', hecha: false }])
assert.strictEqual(typeof storage.getItem('tareas:v1'), 'string', 'en el almacén debe quedar un texto')
assert.deepStrictEqual(tareas.leer(), [{ id: 1, texto: 'Repasar', hecha: false }])
assert.strictEqual(tareas.leer()[0].id, 1, 'el id debe volver como número')

// actualizar
const nuevas = tareas.actualizar(lista => [...lista, { id: 2, texto: 'Practicar', hecha: true }])
assert.strictEqual(nuevas.length, 2)
assert.strictEqual(tareas.leer().length, 2)

// el valor por defecto se entrega copiado
const preferencias = crearAlmacen(storage, 'preferencias:v1', { tema: 'claro', tamano: 16 })
const p = preferencias.leer()
p.tema = 'oscuro'
assert.strictEqual(preferencias.leer().tema, 'claro', 'modificar lo leído no debe cambiar el valor por defecto')

// datos corruptos: alguien editó el valor a mano
storage.setItem('preferencias:v1', '{tema: oscuro')
assert.deepStrictEqual(preferencias.leer(), { tema: 'claro', tamano: 16 })

// un 0 o un false guardados son valores válidos, no «nada guardado»
const visitas = crearAlmacen(storage, 'visitas', 10)
visitas.guardar(0)
assert.strictEqual(visitas.leer(), 0)
assert.strictEqual(visitas.actualizar(n => n + 1), 1)

// borrar
tareas.borrar()
assert.deepStrictEqual(tareas.leer(), [])
assert.strictEqual(storage.getItem('tareas:v1'), null)

// dos almacenes con distinta clave no se pisan
assert.strictEqual(visitas.leer(), 1)

console.log('Test OK')
