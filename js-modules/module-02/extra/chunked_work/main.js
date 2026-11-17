// Unidad: El bucle de eventos
// Ejecuta: node main.js
//
// procesarTodo(items, fn) aplica fn a cada elemento de una vez, en un bucle
// síncrono. Con muchos elementos bloquea el hilo: en el navegador, la página
// se congelaría; aquí, ningún temporizador puede ejecutarse mientras dura.
//
// 1. Escribe procesarPorTrozos(items, fn, tamano = 1000), que hace lo mismo
//    pero de tamano en tamano elementos, y entre trozo y trozo cede el hilo
//    con un setTimeout de 0 ms, para que el bucle de eventos pueda atender
//    otras tareas (en el navegador: clics y repintados).
//    Devuelve una promesa que se cumple con el array de resultados, en el
//    mismo orden que items.
// 2. Opcional: acepta un cuarto parámetro alProgresar(hechos, total), al que
//    se llama después de cada trozo.
//
// Pregunta: ¿serviría ceder el hilo con Promise.resolve().then(...) en lugar
// de setTimeout? Pruébalo y explica el resultado del test «otras tareas».

const assert = require('node:assert/strict')

// ---- Referencia ----
function procesarTodo(items, fn) {
    return items.map(fn)
}

// ---- Tu código ----
function procesarPorTrozos(items, fn, tamano = 1000, alProgresar = () => {}) {
}

// ---- Tests (no los modifiques) ----
// cuenta cuántas veces consigue ejecutarse un temporizador mientras se procesa
async function contarOtrasTareas(trabajo) {
    let otras = 0
    let activo = true
    function latido() {
        if (!activo) return
        otras++
        setTimeout(latido, 0)
    }
    setTimeout(latido, 0)
    const resultado = await trabajo()
    activo = false
    return { resultado, otras }
}

async function main() {
    const items = Array.from({ length: 20000 }, (_, i) => i)
    const cuadrado = (n) => n * n

    const bloqueante = await contarOtrasTareas(async () => procesarTodo(items, cuadrado))
    assert.strictEqual(bloqueante.otras, 0, 'la versión síncrona no deja ejecutar nada más')

    const progreso = []
    const porTrozos = await contarOtrasTareas(() =>
        procesarPorTrozos(items, cuadrado, 1000, (hechos, total) => progreso.push(`${hechos}/${total}`)))

    assert.ok(Array.isArray(porTrozos.resultado), 'procesarPorTrozos debe resolver con un array')
    assert.strictEqual(porTrozos.resultado.length, 20000)
    assert.strictEqual(porTrozos.resultado[19999], 19999 * 19999)
    assert.deepStrictEqual(porTrozos.resultado, bloqueante.resultado, 'los resultados deben coincidir y en orden')
    assert.ok(porTrozos.otras >= 10, `otras tareas: sólo se han ejecutado ${porTrozos.otras}; ¿cedes el hilo con setTimeout?`)

    if (progreso.length > 0) {
        assert.strictEqual(progreso.length, 20)
        assert.strictEqual(progreso[0], '1000/20000')
        assert.strictEqual(progreso.at(-1), '20000/20000')
    }

    assert.deepStrictEqual(await procesarPorTrozos([], cuadrado), [], 'con una lista vacía, resuelve con []')
    assert.deepStrictEqual(await procesarPorTrozos([1, 2, 3], cuadrado, 2), [1, 4, 9])

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
