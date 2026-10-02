// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// format(prices, formatter) recorre una lista de precios y devuelve un array
// nuevo con cada precio pasado por formatter. El recorrido se escribe una vez;
// cada formato es una función distinta.
// 1. Implementa format con un bucle for...of (sin map).
// 2. Implementa euros: recibe un precio y devuelve el texto con dos decimales
//    y el símbolo, por ejemplo 4.5 -> '4.50 €'. Pista: toFixed(2).
// 3. Implementa withTax(rate): NO formatea nada, DEVUELVE una función que
//    recibe un precio y lo formatea como euros después de aplicarle el
//    impuesto. withTax(0.21)(10) -> '12.10 €'.
// 4. Implementa inCurrency(symbol), que devuelve un formateador con otro
//    símbolo: inCurrency('$')(3) -> '3.00 $'. Reescribe euros usando inCurrency.

const assert = require('node:assert/strict')

function format(prices, formatter) {
}

const euros = null

function withTax(rate) {
}

function inCurrency(symbol) {
}

const prices = [10, 4.5, 0.99]

assert.deepStrictEqual(format(prices, euros), ['10.00 €', '4.50 €', '0.99 €'])
assert.deepStrictEqual(format(prices, withTax(0.21)), ['12.10 €', '5.45 €', '1.20 €'])
assert.deepStrictEqual(format(prices, withTax(0.04)), ['10.40 €', '4.68 €', '1.03 €'])
assert.deepStrictEqual(format(prices, inCurrency('$')), ['10.00 $', '4.50 $', '0.99 $'])

// format no debe modificar la lista original
assert.deepStrictEqual(prices, [10, 4.5, 0.99])

console.log('Test OK')
