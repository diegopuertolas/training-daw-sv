// Unidad: Promesas
// Ejecuta: node main.js
//
// Muchas APIs antiguas (y casi todas las de Node antes de las promesas) usan
// callbacks con el error primero: el último argumento es una función
// (error, resultado) => {...}. Si todo va bien, error es null.
//
// 1. Escribe promisificar(fn): recibe una función de ese estilo y devuelve
//    otra que acepta los mismos argumentos (sin el callback) y devuelve una
//    promesa. La promesa se rechaza con el error, o se cumple con el
//    resultado.
// 2. Con la versión promisificada de leerFichero, escribe leerConfiguracion():
//    lee 'config.json', lo convierte con JSON.parse y lee después el fichero
//    cuyo nombre indica su propiedad tema. Devuelve una promesa que se cumple
//    con { tema, contenido }. Encadena con then: sin anidar ningún then
//    dentro de otro.
// 3. leerVarios(nombres): lee todos los ficheros EN PARALELO y se cumple con
//    un array de contenidos en el mismo orden.
//
// Pregunta: ¿qué pasaría si fn llamara a su callback dos veces? ¿Cuántas
// veces se cumpliría la promesa?

const assert = require('node:assert/strict')

// ---- API antigua simulada (no la modifiques) ----
const disco = {
    'config.json': '{"tema":"oscuro.css"}',
    'oscuro.css': 'body { background: #111 }',
    'claro.css': 'body { background: #fff }',
}
let lecturasEnCurso = 0
let maximoEnCurso = 0

function leerFichero(nombre, callback) {
    lecturasEnCurso++
    maximoEnCurso = Math.max(maximoEnCurso, lecturasEnCurso)
    setTimeout(() => {
        lecturasEnCurso--
        if (nombre in disco) callback(null, disco[nombre])
        else callback(new Error(`No existe ${nombre}`))
    }, 20)
}

// ---- Tu código ----
function promisificar(fn) {
}

const leer = promisificar(leerFichero)

function leerConfiguracion() {
}

function leerVarios(nombres) {
}

// ---- Tests (no los modifiques) ----
async function main() {
    assert.strictEqual(typeof leer, 'function', 'promisificar debe devolver una función')
    const promesa = leer('claro.css')
    assert.ok(promesa instanceof Promise, 'la función promisificada debe devolver una promesa')
    assert.strictEqual(await promesa, 'body { background: #fff }')

    await assert.rejects(leer('no-existe.txt'), { message: 'No existe no-existe.txt' })

    assert.deepStrictEqual(await leerConfiguracion(), { tema: 'oscuro.css', contenido: 'body { background: #111 }' })

    maximoEnCurso = 0
    const inicio = Date.now()
    assert.deepStrictEqual(await leerVarios(['oscuro.css', 'config.json', 'claro.css']),
        [disco['oscuro.css'], disco['config.json'], disco['claro.css']])
    assert.strictEqual(maximoEnCurso, 3, 'leerVarios debe lanzar las tres lecturas a la vez')
    assert.ok(Date.now() - inicio < 50, 'leerVarios tarda demasiado: ¿están en serie?')

    await assert.rejects(leerVarios(['claro.css', 'nada']), { message: 'No existe nada' })

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
