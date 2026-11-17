// Unidad: async y await
// Ejecuta: node main.js
//
// Reto. En la unidad viste dos extremos: en serie (lento) y todo en paralelo
// con Promise.all (rápido, pero con 500 peticiones a la vez saturarías el
// servidor). Lo habitual es un punto intermedio: como mucho N a la vez.
//
// ejecutarConLimite(tareas, limite) recibe un array de FUNCIONES (no de
// promesas: cada una, al llamarla, lanza su operación y devuelve una
// promesa) y las ejecuta de forma que nunca haya más de limite en marcha a
// la vez. En cuanto una termina, empieza la siguiente pendiente.
// Devuelve una promesa que se cumple con los resultados en el MISMO orden
// que tareas. Si alguna falla, se rechaza con ese error.
//
// Pista: lanza limite «trabajadores», funciones async que, en un bucle, toman
// el índice de la siguiente tarea pendiente, la esperan y guardan su
// resultado. Después, espera a todos los trabajadores con Promise.all.
// Como hay un solo hilo, dos trabajadores nunca toman el mismo índice a la
// vez: ¿por qué?
//
// Pregunta: ¿por qué recibe funciones y no promesas? ¿Qué pasaría con el
// límite si recibiera promesas ya creadas?

const assert = require('node:assert/strict')

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function ejecutarConLimite(tareas, limite) {
}

// ---- Tests (no los modifiques) ----
function crearTareas(duraciones, { fallaEn = -1 } = {}) {
    const estado = { enCurso: 0, maximo: 0, iniciadas: [] }
    const tareas = duraciones.map((ms, i) => async () => {
        estado.enCurso++
        estado.iniciadas.push(i)
        estado.maximo = Math.max(estado.maximo, estado.enCurso)
        await esperar(ms)
        estado.enCurso--
        if (i === fallaEn) throw new Error(`falla la tarea ${i}`)
        return `resultado ${i}`
    })
    return { tareas, estado }
}

async function main() {
    const duraciones = [50, 10, 10, 10, 30, 10, 10, 10]
    const { tareas, estado } = crearTareas(duraciones)

    const inicio = Date.now()
    const resultados = await ejecutarConLimite(tareas, 3)
    const tiempo = Date.now() - inicio

    assert.deepStrictEqual(resultados, duraciones.map((_, i) => `resultado ${i}`), 'resultados en el orden de las tareas')
    assert.strictEqual(estado.maximo, 3, `nunca más de 3 a la vez, y llegar a 3; el máximo ha sido ${estado.maximo}`)
    assert.strictEqual(estado.iniciadas.length, 8, 'cada tarea se ejecuta una vez')
    assert.ok(tiempo < 100, `con 3 a la vez debería tardar unos 60 ms, y ha tardado ${tiempo}`)

    const serie = crearTareas([5, 5, 5])
    await ejecutarConLimite(serie.tareas, 1)
    assert.strictEqual(serie.estado.maximo, 1, 'con límite 1, en serie')

    const pocas = crearTareas([5, 5])
    assert.deepStrictEqual(await ejecutarConLimite(pocas.tareas, 10), ['resultado 0', 'resultado 1'],
        'con un límite mayor que el número de tareas también funciona')

    assert.deepStrictEqual(await ejecutarConLimite([], 3), [])

    const conFallo = crearTareas([5, 5, 5, 5], { fallaEn: 2 })
    await assert.rejects(ejecutarConLimite(conFallo.tareas, 2), { message: 'falla la tarea 2' })

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
