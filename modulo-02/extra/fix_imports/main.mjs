// Unidad: Módulos ES
// Ejecuta: node main.mjs
//
// Esta aplicación está dividida en cuatro módulos, pero main.mjs no arranca:
// sus import tienen cinco errores. Ejecuta, lee el mensaje de error,
// corrige UN error y vuelve a ejecutar, hasta que veas «Test OK».
//
// Reglas:
// - No cambies los nombres de las variables que usa main.mjs más abajo
//   (formatearPrecio, pedirJSON, config.BASE...): arregla los import.
// - No modifiques api.mjs ni config.mjs.
// - Uno de los errores no se arregla en main.mjs, sino en formato.mjs.
//
// Para cada error, escribe en un comentario junto al import qué decía el
// mensaje de Node y qué regla de los módulos incumplía.
//
// Los mismos errores, en el navegador, darían mensajes parecidos en la
// consola, con <script type="module" src="main.mjs">.

import { formatearPrecio } from './formato.mjs'
import { pedirJSON } from './api.mjs'
import config from './config.mjs'
import { fecha } from './formato'
import { redondear } from './formato.mjs'
import assert from 'node:assert/strict'

// ---- Tests (no los modifiques) ----
assert.strictEqual(formatearPrecio(12.5), '12.50 €')
assert.strictEqual(fecha('2026-10-19'), '19/10/2026')
assert.strictEqual(redondear(3.14159, 3), 3.142)
assert.strictEqual(typeof pedirJSON, 'function')
assert.strictEqual(config.BASE, 'https://api.biblioteca.es')
assert.strictEqual(config.POR_PAGINA, 20)

console.log('Test OK')
