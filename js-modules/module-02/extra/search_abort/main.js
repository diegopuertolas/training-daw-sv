// Unidad: Peticiones HTTP con fetch
// Ejecuta: node main.js
//
// Un buscador que pide resultados mientras el usuario escribe lanza una
// petición por letra: «j», «ja», «jav», «java». Las respuestas pueden llegar
// en otro orden, y si la de «ja» llega la última, la página mostraría
// resultados viejos.
//
// La solución es CANCELAR la petición anterior al lanzar una nueva, con un
// AbortController: se pasa su signal en las opciones de fetch
// (fetch(url, { signal })) y, al llamar a controller.abort(), esa promesa de
// fetch se rechaza con un error cuyo name es 'AbortError'.
//
// crearBuscador(base) devuelve una función async buscar(texto) que:
// - cancela la búsqueda anterior si sigue en marcha;
// - pide `${base}?q=${encodeURIComponent(texto)}` con un signal nuevo;
// - devuelve el array de resultados (el JSON de la respuesta);
// - si ESTA búsqueda ha sido cancelada por otra posterior, devuelve null en
//   lugar de lanzar el error: no es un fallo, sólo una búsqueda obsoleta;
// - cualquier otro error (red, HTTP) sí se propaga. Comprueba response.ok.
// - con un texto vacío (o sólo espacios), no hace ninguna petición, cancela
//   la que hubiera y devuelve [].
//
// Pregunta: en el navegador, ¿dónde llamarías a buscar? ¿Qué harías con el
// null que devuelve una búsqueda cancelada?

const assert = require('node:assert/strict')

function crearBuscador(base) {
}

// ---- Servidor falso (no lo modifiques) ----
// responde más tarde a las búsquedas cortas, para que lleguen desordenadas
const lenguajes = ['java', 'javascript', 'kotlin', 'python', 'typescript']
const peticiones = []

globalThis.fetch = (url, { signal } = {}) => {
    const q = new URL(url).searchParams.get('q')
    peticiones.push({ q, conSignal: signal instanceof AbortSignal })
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            if (q === 'error') resolve(new Response('Fallo', { status: 500 }))
            else resolve(Response.json(lenguajes.filter(l => l.includes(q))))
        }, 80 - q.length * 10)
        signal?.addEventListener('abort', () => {
            clearTimeout(id)
            reject(new DOMException('La petición se ha cancelado', 'AbortError'))
        })
    })
}

// ---- Tests (no los modifiques) ----
async function main() {
    const buscar = crearBuscador('https://api.lenguajes.es/buscar')

    assert.deepStrictEqual(await buscar('script'), ['javascript', 'typescript'])
    assert.ok(peticiones[0].conSignal, 'hay que pasar un signal a fetch')

    // el usuario escribe deprisa: sólo cuenta la última
    const [r1, r2, r3, r4] = await Promise.all([buscar('j'), buscar('ja'), buscar('jav'), buscar('java')])
    assert.strictEqual(r1, null, 'la búsqueda «j» se ha cancelado: debería devolver null')
    assert.strictEqual(r2, null)
    assert.strictEqual(r3, null)
    assert.deepStrictEqual(r4, ['java', 'javascript'])

    // una búsqueda que termina no se cancela con la siguiente
    assert.deepStrictEqual(await buscar('kotlin'), ['kotlin'])
    assert.deepStrictEqual(await buscar('python'), ['python'])

    // texto vacío
    const antes = peticiones.length
    const pendiente = buscar('ty')
    assert.deepStrictEqual(await buscar('   '), [])
    assert.strictEqual(await pendiente, null, 'vaciar el campo cancela la búsqueda en marcha')
    assert.strictEqual(peticiones.length, antes + 1, 'con el texto vacío no se hace ninguna petición')

    // los errores de verdad se propagan
    await assert.rejects(buscar('error'))

    // texto con caracteres especiales
    await buscar('c++ & c#')
    assert.strictEqual(peticiones.at(-1).q, 'c++ & c#', 'usa encodeURIComponent')

    // dos buscadores no se cancelan entre sí
    const otro = crearBuscador('https://api.lenguajes.es/buscar')
    const [a, b] = await Promise.all([buscar('kot'), otro('pyt')])
    assert.deepStrictEqual([a, b], [['kotlin'], ['python']])

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
