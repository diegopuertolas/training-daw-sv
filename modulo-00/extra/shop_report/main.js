// Unidad: Transformar colecciones con métodos de array
// Ejecuta: node main.js
//
// Un informe de la tienda. Cada función se escribe como UNA cadena de métodos
// de array (filter, map, reduce, toSorted...), sin bucles ni variables
// intermedias.
// 1. availableNames(): nombres de los productos con stock, en el orden de la
//    lista.
// 2. stockValue(): valor del almacén, la suma de precio * stock de cada
//    producto, como texto con dos decimales. Pista: toFixed(2) al final.
// 3. cheapestFirst(category): nombres de los productos de esa categoría,
//    del más barato al más caro.
// 4. countByCategory(): un objeto con cuántos productos hay de cada
//    categoría. Pista: reduce con un objeto vacío como valor inicial.

const assert = require('node:assert/strict')

const products = [
    { name: 'Cable', category: 'accesorios', price: 9.99, stock: 3 },
    { name: 'Ratón', category: 'periféricos', price: 25, stock: 0 },
    { name: 'Funda', category: 'accesorios', price: 4.5, stock: 12 },
    { name: 'Teclado', category: 'periféricos', price: 40, stock: 1 },
    { name: 'Monitor', category: 'pantallas', price: 179.9, stock: 2 },
    { name: 'Hub USB', category: 'accesorios', price: 19.95, stock: 0 },
]

function availableNames() {
}

function stockValue() {
}

function cheapestFirst(category) {
}

function countByCategory() {
}

assert.deepStrictEqual(availableNames(), ['Cable', 'Funda', 'Teclado', 'Monitor'])
assert.strictEqual(stockValue(), '483.77')
assert.deepStrictEqual(cheapestFirst('accesorios'), ['Funda', 'Cable', 'Hub USB'])
assert.deepStrictEqual(countByCategory(), { accesorios: 3, periféricos: 2, pantallas: 1 })

// ninguna función ha tocado la lista
assert.strictEqual(products.length, 6)
assert.strictEqual(products[0].name, 'Cable')

console.log('Test OK')
