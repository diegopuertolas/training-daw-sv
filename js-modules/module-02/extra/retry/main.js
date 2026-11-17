// Unidad: async y await
// Ejecuta: node main.js
//
// Las peticiones de red fallan a veces por motivos pasajeros. Escribe con
// async/await y try/catch:
//
// 1. reintentar(fn, { intentos = 3, espera = 100 } = {}): llama a fn (una
//    función que devuelve una promesa). Si se cumple, devuelve su valor. Si
//    falla, espera y vuelve a intentarlo, hasta un máximo de intentos
//    llamadas en total. La espera se DUPLICA en cada reintento: 100, 200,
//    400... Si fallan todas, lanza el error del ÚLTIMO intento.
// 2. Opcional: un tercer parámetro de las opciones, debeReintentar(error),
//    que decide si un error merece reintento. Si devuelve false, se lanza el
//    error al momento. Por defecto, todos los errores se reintentan.
//    Ejemplo: un 404 no se arregla reintentando; un 503, quizá sí.
//
// No uses then: sólo async, await, try, catch y un bucle.
//
// Pregunta: ¿por qué es mala idea reintentar inmediatamente, sin esperar, o
// esperar siempre lo mismo, si el fallo es porque el servidor está saturado?

const assert = require('node:assert/strict')

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function reintentar(fn, { intentos = 3, espera = 100, debeReintentar = () => true } = {}) {
}

// ---- Tests (no los modifiques) ----
// crea una función que falla las primeras n veces
function fallaVeces(n, valor = 'ok') {
    const llamada = { veces: 0, momentos: [] }
    const inicio = Date.now()
    const fn = async () => {
        llamada.veces++
        llamada.momentos.push(Date.now() - inicio)
        if (llamada.veces <= n) {
            const error = new Error(`fallo ${llamada.veces}`)
            error.status = 503
            throw error
        }
        return valor
    }
    return { fn, llamada }
}

async function main() {
    const bien = fallaVeces(0)
    assert.strictEqual(await reintentar(bien.fn), 'ok')
    assert.strictEqual(bien.llamada.veces, 1, 'si funciona a la primera, no se reintenta')

    const dos = fallaVeces(2, 'por fin')
    assert.strictEqual(await reintentar(dos.fn, { espera: 20 }), 'por fin')
    assert.strictEqual(dos.llamada.veces, 3)
    const [t1, t2, t3] = dos.llamada.momentos
    assert.ok(t2 - t1 >= 18 && t2 - t1 < 35, `la primera espera debería ser de unos 20 ms y ha sido de ${t2 - t1}`)
    assert.ok(t3 - t2 >= 38 && t3 - t2 < 60, `la segunda espera debería ser de unos 40 ms y ha sido de ${t3 - t2}`)

    const siempre = fallaVeces(10)
    await assert.rejects(reintentar(siempre.fn, { intentos: 4, espera: 1 }), { message: 'fallo 4' },
        'si fallan todos, se lanza el error del último intento')
    assert.strictEqual(siempre.llamada.veces, 4)

    const defecto = fallaVeces(10)
    const inicio = Date.now()
    await assert.rejects(reintentar(defecto.fn))
    assert.strictEqual(defecto.llamada.veces, 3, 'por defecto, 3 intentos')
    assert.ok(Date.now() - inicio >= 290, 'por defecto, esperas de 100 y 200 ms')

    // opcional: debeReintentar. Si no lo has hecho, se reintentará 3 veces y no pasa nada
    const noEncontrado = fallaVeces(10)
    const fn404 = () => noEncontrado.fn().catch((error) => {
        error.status = 404
        throw error
    })
    await assert.rejects(reintentar(fn404, { espera: 1, debeReintentar: (e) => e.status !== 404 }))
    assert.ok([1, 3].includes(noEncontrado.llamada.veces))
    if (noEncontrado.llamada.veces === 1) console.log('Opcional: debeReintentar funciona')

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
