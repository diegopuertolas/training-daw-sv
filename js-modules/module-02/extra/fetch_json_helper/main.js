// Unidad: Peticiones HTTP con fetch
// Ejecuta: node main.js   (Node 18 o posterior, que ya trae fetch y Response)
//
// Los tests sustituyen fetch por uno falso que no sale a internet: apunta qué
// peticiones recibe y responde con objetos Response de verdad. Tu código no
// nota la diferencia.
//
// 1. Completa la clase HttpError, que extiende Error: su constructor recibe
//    (status, url), su mensaje es `Error ${status} en ${url}` y guarda status
//    y url como propiedades.
// 2. pedirJSON(url, opciones): hace la petición; si response.ok es false,
//    lanza un HttpError; si la respuesta es 204 (sin cuerpo), devuelve null;
//    si no, devuelve el cuerpo convertido de JSON.
// 3. Con pedirJSON, escribe las funciones de la API de libros:
//    - listarLibros(): GET a `${BASE}/libros`.
//    - crearLibro(libro): POST a `${BASE}/libros`, con la cabecera
//      Content-Type: application/json y el libro como cuerpo JSON. Devuelve
//      el libro creado que responde el servidor (con su id).
//    - borrarLibro(id): DELETE a `${BASE}/libros/${id}`. Devuelve true si se
//      ha borrado y false si el servidor responde 404 (ese caso no es un
//      error para quien llama). Cualquier otro error se propaga.
//
// Pregunta: si no hubiera conexión, ¿qué tipo de error llegaría al catch de
// quien llama: un HttpError u otro? ¿Cómo los distinguirías?

const assert = require('node:assert/strict')

const BASE = 'https://api.biblioteca.es'

class HttpError extends Error {
    constructor(status, url) {
    }
}

async function pedirJSON(url, opciones) {
}

function listarLibros() {
}

function crearLibro(libro) {
}

async function borrarLibro(id) {
}

// ---- Servidor falso (no lo modifiques) ----
const peticiones = []
let libros = [{ id: 1, titulo: 'Guía de JavaScript' }]

globalThis.fetch = async (url, opciones = {}) => {
    const metodo = opciones.method ?? 'GET'
    peticiones.push({ url, metodo, headers: opciones.headers ?? {}, body: opciones.body })
    const json = (datos, status = 200) =>
        new Response(JSON.stringify(datos), { status, headers: { 'Content-Type': 'application/json' } })

    if (url === `${BASE}/libros` && metodo === 'GET') return json(libros)
    if (url === `${BASE}/libros` && metodo === 'POST') {
        const nuevo = { id: libros.length + 1, ...JSON.parse(opciones.body) }
        libros.push(nuevo)
        return json(nuevo, 201)
    }
    const borrar = url.match(/\/libros\/(\d+)$/)
    if (borrar && metodo === 'DELETE') {
        const id = Number(borrar[1])
        if (id === 500) return new Response('Fallo interno', { status: 500 })
        if (!libros.some(l => l.id === id)) return new Response('No encontrado', { status: 404 })
        libros = libros.filter(l => l.id !== id)
        return new Response(null, { status: 204 })
    }
    if (url.includes('sin-red')) throw new TypeError('fetch failed')
    return new Response('<h1>404</h1>', { status: 404, headers: { 'Content-Type': 'text/html' } })
}

// ---- Tests (no los modifiques) ----
async function main() {
    const error = new HttpError(503, '/x')
    assert.ok(error instanceof Error)
    assert.strictEqual(error.message, 'Error 503 en /x')
    assert.strictEqual(error.status, 503)
    assert.strictEqual(error.url, '/x')

    assert.deepStrictEqual(await listarLibros(), [{ id: 1, titulo: 'Guía de JavaScript' }])

    await assert.rejects(pedirJSON(`${BASE}/no-existe`), (e) => e instanceof HttpError && e.status === 404,
        'un 404 debe convertirse en un HttpError, no intentar leer la página de error como JSON')
    await assert.rejects(pedirJSON(`${BASE}/sin-red`), TypeError, 'un fallo de red llega como TypeError')

    const creado = await crearLibro({ titulo: 'Promesas a fondo', paginas: 210 })
    assert.deepStrictEqual(creado, { id: 2, titulo: 'Promesas a fondo', paginas: 210 })
    const post = peticiones.at(-1)
    assert.strictEqual(post.metodo, 'POST')
    assert.strictEqual(post.headers['Content-Type'], 'application/json')
    assert.strictEqual(typeof post.body, 'string', 'el cuerpo debe ir convertido a texto JSON')

    assert.strictEqual(await borrarLibro(1), true)
    assert.strictEqual(peticiones.at(-1).metodo, 'DELETE')
    assert.strictEqual(await borrarLibro(1), false, 'borrar un libro que ya no existe devuelve false')
    await assert.rejects(borrarLibro(500), (e) => e instanceof HttpError && e.status === 500,
        'un 500 al borrar sí es un error')

    assert.deepStrictEqual((await listarLibros()).map(l => l.id), [2])

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
