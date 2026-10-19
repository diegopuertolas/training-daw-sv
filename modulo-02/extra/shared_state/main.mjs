// Unidad: Módulos ES
// Ejecuta: node main.mjs
//
// carrito.mjs guarda el estado de un carrito, y dos partes de la aplicación
// lo usan: catalogo.mjs añade productos y cabecera.mjs muestra el total. No
// se pasan nada entre ellas: comparten el estado porque importan el MISMO
// módulo, que se ejecuta una sola vez.
//
// Escribe carrito.mjs (está vacío) con:
// - Una variable NO exportada lineas (un array de { nombre, precio }).
// - export let total = 0, que se actualiza cada vez que cambia el carrito.
// - export function anadir(nombre, precio)
// - export function vaciar()
// - export function contenido(): devuelve una COPIA de las líneas.
// - export default un objeto { anadir, vaciar, contenido } (sí: un módulo
//   puede tener exportaciones con nombre y una por defecto a la vez).
// - Un console.log('carrito.mjs cargado') al principio, para ver cuántas
//   veces se ejecuta el módulo.
//
// No toques main.mjs, catalogo.mjs ni cabecera.mjs.
//
// Preguntas (respóndelas en un comentario en carrito.mjs):
// 1. ¿Cuántas veces aparece «carrito.mjs cargado»? ¿Por qué, si lo importan
//    tres módulos?
// 2. cabecera.mjs importa total con { total }. Cuando catalogo.mjs añade un
//    producto, ¿ve cabecera.mjs el valor nuevo? ¿No era una copia?
// 3. ¿Por qué main.mjs no puede hacer total = 0 directamente?

import assert from 'node:assert/strict'
import * as catalogo from './catalogo.mjs'
import * as cabecera from './cabecera.mjs'
import carrito, { total, contenido } from './carrito.mjs'

// ---- Tests (no los modifiques) ----
assert.strictEqual(cabecera.textoTotal(), 'Total: 0.00 €')

catalogo.comprar('Teclado', 59.9)
catalogo.comprar('Ratón', 24)
assert.strictEqual(cabecera.textoTotal(), 'Total: 83.90 €', 'cabecera.mjs debería ver el total actualizado')
assert.strictEqual(cabecera.numeroDeProductos(), 2)

// total es un enlace vivo: se lee el valor actual del módulo
assert.ok(Math.abs(total - 83.9) < 1e-9, 'el total importado en main.mjs también está al día')

// pero sólo el módulo que lo declara puede cambiarlo
assert.throws(() => {
    eval('total = 0')
}, TypeError)

// contenido() devuelve una copia
contenido().push({ nombre: 'Intruso', precio: 1000 })
assert.strictEqual(contenido().length, 2)

// la exportación por defecto apunta a las mismas funciones
assert.strictEqual(carrito.contenido, contenido)
carrito.vaciar()
assert.strictEqual(cabecera.textoTotal(), 'Total: 0.00 €')
assert.strictEqual(total, 0)

console.log('Test OK')
