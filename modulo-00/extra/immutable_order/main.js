// Unidad: Objetos, arrays y referencias
// Ejecuta: node main.js
//
// Una tienda guarda cada pedido como un objeto con un array de líneas. La
// aplicación muestra el pedido original en una parte de la pantalla mientras
// se edita en otra, así que NINGUNA función puede modificar el pedido que
// recibe: todas devuelven un pedido nuevo.
//
// 1. ship(order): devuelve el pedido con status 'enviado'.
// 2. addLine(order, line): devuelve el pedido con una línea más al final.
//    Ojo: con un solo spread, el array de líneas sigue compartido.
// 3. duplicate(order): devuelve una copia profunda e independiente en todos
//    sus niveles, incluidos los objetos de cada línea. Pista: structuredClone.
// 4. Explica en un comentario por qué en addLine basta con copiar el array de
//    líneas y no hace falta copiar cada línea.

const assert = require('node:assert/strict')

function ship(order) {
}

function addLine(order, line) {
}

function duplicate(order) {
}

const order = {
    id: 7,
    status: 'pendiente',
    lines: [{ product: 'Cable', units: 2 }],
}

const shipped = ship(order)
assert.strictEqual(shipped.status, 'enviado')
assert.strictEqual(shipped.id, 7)
assert.strictEqual(order.status, 'pendiente', 'ship() no debe modificar el pedido original')

const bigger = addLine(order, { product: 'Funda', units: 1 })
assert.strictEqual(bigger.lines.length, 2)
assert.strictEqual(order.lines.length, 1, 'addLine() no debe modificar las líneas del original')
assert.notStrictEqual(bigger.lines, order.lines, 'el pedido nuevo necesita su propio array de líneas')

const copy = duplicate(order)
copy.lines[0].units = 50
assert.strictEqual(order.lines[0].units, 2, 'duplicate() debe copiar también cada línea')

// mismo contenido no significa mismo objeto
assert.deepStrictEqual(duplicate(order), order)
assert.notStrictEqual(duplicate(order), order)

console.log('Test OK')
