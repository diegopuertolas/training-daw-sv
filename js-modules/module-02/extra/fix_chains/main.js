// Unidad: Promesas
// Ejecuta: node main.js
//
// Cuatro funciones con cadenas de promesas que tienen un fallo cada una.
// Arréglalas SIN pasar a async/await (eso es para la unidad siguiente):
// sólo then, catch y finally. Antes de arreglar cada una, escribe en un
// comentario qué estaba pasando.
//
// 1. totalDelPedido(id): debería resolver con el total del pedido, pero
//    resuelve con undefined.
// 2. nombreDelCliente(idPedido): funciona, pero es una pirámide de then
//    anidados. Aplánala en una única cadena; si algo falla, debe rechazar.
// 3. resumen(id): si cargarPedido falla, debería resolver con el texto
//    'Pedido no disponible'. Pero el catch está en mal sitio, el siguiente
//    then se ejecuta igualmente y acaba lanzando otro error.
// 4. conIndicador(id): debe dejar indicador.cargando en false TANTO si va
//    bien como si va mal, y seguir resolviendo con el pedido o rechazando
//    con el error. Ahora se queda en true cuando falla.

const assert = require('node:assert/strict')

// ---- API simulada (no la modifiques) ----
const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
const pedidos = { 1: { id: 1, cliente: 7, lineas: [{ precio: 10, unidades: 2 }, { precio: 5, unidades: 1 }] } }
const clientes = { 7: { id: 7, nombre: 'Ana' } }

function cargarPedido(id) {
    return esperar(5).then(() => {
        if (!pedidos[id]) throw new Error(`No existe el pedido ${id}`)
        return pedidos[id]
    })
}

function cargarCliente(id) {
    return esperar(5).then(() => clientes[id])
}

// ---- Funciones con fallos ----
function totalDelPedido(id) {
    return cargarPedido(id)
        .then(pedido => {
            pedido.lineas.reduce((total, l) => total + l.precio * l.unidades, 0)
        })
}

function nombreDelCliente(idPedido) {
    return new Promise((resolve, reject) => {
        cargarPedido(idPedido).then(pedido => {
            cargarCliente(pedido.cliente).then(cliente => {
                resolve(cliente.nombre)
            }).catch(reject)
        }).catch(reject)
    })
}

function resumen(id) {
    return cargarPedido(id)
        .catch(() => console.log('Pedido no disponible'))
        .then(pedido => `Pedido ${pedido.id}: ${pedido.lineas.length} líneas`)
}

const indicador = { cargando: false }

function conIndicador(id) {
    indicador.cargando = true
    return cargarPedido(id)
        .then(pedido => {
            indicador.cargando = false
            return pedido
        })
}

// ---- Tests (no los modifiques) ----
async function main() {
    assert.strictEqual(await totalDelPedido(1), 25, '1. totalDelPedido(1) debería ser 25')

    assert.strictEqual(await nombreDelCliente(1), 'Ana', '2. nombreDelCliente(1) debería ser Ana')
    await assert.rejects(nombreDelCliente(99), { message: 'No existe el pedido 99' })
    const codigo = nombreDelCliente.toString().replace(/\/\/.*$/gm, '')
    assert.ok(!codigo.includes('new Promise'), '2. no hace falta new Promise: aplana la cadena')

    assert.strictEqual(await resumen(1), 'Pedido 1: 2 líneas', '3. resumen(1) falla')
    assert.strictEqual(await resumen(99), 'Pedido no disponible', '3. resumen(99) debería dar «Pedido no disponible»')

    const pedido = await conIndicador(1)
    assert.strictEqual(pedido.id, 1, '4. conIndicador(1) debería resolver con el pedido')
    assert.strictEqual(indicador.cargando, false)
    await assert.rejects(conIndicador(99), { message: 'No existe el pedido 99' }, '4. el error debe seguir llegando')
    assert.strictEqual(indicador.cargando, false, '4. tras un fallo, cargando debería volver a false')

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
