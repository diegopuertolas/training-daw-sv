// Unidad: El bucle de eventos
// Ejecuta: node main.js
//
// Cinco escenarios. Cada uno anota letras en un array en vez de usar
// console.log. Para cada escenario, rellena su predicción con las letras en
// el orden en que crees que se anotarán. Después ejecuta: los tests te dicen
// en cuáles has fallado.
//
// Reglas que necesitas: primero todo el código síncrono; después TODAS las
// microtareas (then, catch, finally, la continuación tras un await,
// queueMicrotask), incluidas las que se encolen mientras se vacía la cola; y
// después UNA tarea (setTimeout). Y vuelta a empezar.
//
// Para cada fallo, escribe en un comentario qué regla no habías aplicado.

const assert = require('node:assert/strict')

// ---- Escenarios (no los modifiques) ----
function escenario1(anotar) {
    setTimeout(() => anotar('A'), 0)
    Promise.resolve().then(() => {
        anotar('B')
        setTimeout(() => anotar('C'), 0)
    })
    anotar('D')
}

function escenario2(anotar) {
    setTimeout(() => {
        anotar('A')
        Promise.resolve().then(() => anotar('B'))
    }, 0)
    setTimeout(() => anotar('C'), 0)
    anotar('D')
}

function escenario3(anotar) {
    async function tarea() {
        anotar('A')
        await null
        anotar('B')
    }
    anotar('C')
    tarea()
    anotar('D')
}

function escenario4(anotar) {
    Promise.resolve()
        .then(() => anotar('A1'))
        .then(() => anotar('A2'))
    Promise.resolve()
        .then(() => anotar('B1'))
        .then(() => anotar('B2'))
    queueMicrotask(() => anotar('C'))
}

function escenario5(anotar) {
    new Promise((resolve) => {
        anotar('A')
        resolve()
        anotar('B')
    }).then(() => anotar('C'))
    setTimeout(() => anotar('D'), 0)
    anotar('E')
}

// ---- Tu predicción ----
const predicciones = {
    escenario1: [],
    escenario2: [],
    escenario3: [],
    escenario4: [],
    escenario5: [],
}

// ---- Tests (no los modifiques) ----
function ejecutar(escenario) {
    return new Promise((resolve) => {
        const anotaciones = []
        escenario((letra) => anotaciones.push(letra))
        setTimeout(() => setTimeout(() => resolve(anotaciones), 10), 10)
    })
}

async function main() {
    const escenarios = { escenario1, escenario2, escenario3, escenario4, escenario5 }
    let fallos = 0
    for (const [nombre, escenario] of Object.entries(escenarios)) {
        const real = await ejecutar(escenario)
        const acierto = JSON.stringify(real) === JSON.stringify(predicciones[nombre])
        if (!acierto) {
            fallos++
            console.log(`${nombre}: predijiste [${predicciones[nombre]}] y es [${real}]`)
        }
    }
    assert.strictEqual(fallos, 0, `Has fallado ${fallos} de 5 escenarios`)
    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
