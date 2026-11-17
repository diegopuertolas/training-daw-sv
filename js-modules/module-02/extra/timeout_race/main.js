// Unidad: Promesas
// Ejecuta: node main.js
//
// 1. Escribe conLimite(promesa, ms): devuelve una promesa que termina igual
//    que promesa (con su valor o con su error) si lo hace antes de ms
//    milisegundos; si no, se rechaza con un Error('Tiempo agotado').
//    Pista: crea una promesa que se rechace con un setTimeout y haz que
//    compita con la original. ¿Qué método estático de Promise elige la
//    primera que termina, bien o mal?
// 2. Escribe primerEspejo(urls): pide el mismo fichero a varios servidores
//    espejo con descargar(url) y se cumple con el contenido del PRIMERO QUE
//    RESPONDA BIEN. Si uno falla rápido, no importa mientras otro funcione.
//    Sólo se rechaza si fallan todos. ¿Qué método necesitas ahora?
// 3. Escribe informeDescargas(urls): espera a que terminen TODAS, bien o mal,
//    y se cumple con { ok: [contenidos], fallidas: [urls] }, conservando el
//    orden de urls.
//
// Pregunta: cuando conLimite rechaza por tiempo, ¿se cancela la operación
// original? ¿Qué sigue pasando con ella?

const assert = require('node:assert/strict')

// ---- Utilidades simuladas (no las modifiques) ----
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

// cada servidor tarda un tiempo y algunos fallan
const servidores = {
    'https://eu.espejo.es/curso.zip': { ms: 60, ok: true },
    'https://us.espejo.es/curso.zip': { ms: 20, ok: true },
    'https://as.espejo.es/curso.zip': { ms: 5, ok: false },
    'https://caido.espejo.es/curso.zip': { ms: 10, ok: false },
}

async function descargar(url) {
    const servidor = servidores[url]
    await esperar(servidor?.ms ?? 1)
    if (!servidor?.ok) throw new Error(`Fallo en ${url}`)
    return `contenido desde ${new URL(url).hostname}`
}

// ---- Tu código ----
function conLimite(promesa, ms) {
}

function primerEspejo(urls) {
}

async function informeDescargas(urls) {
}

// ---- Tests (no los modifiques) ----
async function main() {
    assert.strictEqual(await conLimite(esperar(10).then(() => 'a tiempo'), 100), 'a tiempo')
    await assert.rejects(conLimite(esperar(100), 20), { message: 'Tiempo agotado' })
    await assert.rejects(conLimite(Promise.reject(new Error('Otro fallo')), 50), { message: 'Otro fallo' },
        'si la promesa original falla antes, conLimite debe rechazar con SU error')

    const urls = Object.keys(servidores)
    assert.strictEqual(await primerEspejo(urls), 'contenido desde us.espejo.es',
        'el servidor de Asia falla antes, pero el primero que responde BIEN es el de EE. UU.')
    await assert.rejects(primerEspejo(['https://as.espejo.es/curso.zip', 'https://caido.espejo.es/curso.zip']))

    assert.deepStrictEqual(await informeDescargas(urls), {
        ok: ['contenido desde eu.espejo.es', 'contenido desde us.espejo.es'],
        fallidas: ['https://as.espejo.es/curso.zip', 'https://caido.espejo.es/curso.zip'],
    })

    // las tres juntas: el espejo más rápido, con un límite de 40 ms
    assert.strictEqual(await conLimite(primerEspejo(urls), 40), 'contenido desde us.espejo.es')

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
