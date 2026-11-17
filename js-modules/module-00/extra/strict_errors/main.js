// Unidad: El navegador como entorno de ejecución
// Ejecuta: node main.js
//
// Este script tiene tres errores que, sin modo estricto, pasan en silencio:
// se ejecuta de principio a fin, pero los resultados no son los esperados.
// 1. Ejecútalo tal cual y fíjate en qué resultados son incorrectos.
// 2. Añade 'use strict' en la primera línea y vuelve a ejecutarlo. Cada
//    ejecución se detiene en el primer error: léelo, corrígelo y repite hasta
//    que el script llegue al final con los tres resultados correctos.
// 3. Al final del fichero hay una función comentada. Descoméntala con el modo
//    estricto activo: ¿por qué falla antes de ejecutar ninguna línea?

// Error 1: una errata en el nombre de una variable
function totalConIva(precio) {
    let total = precio
    totl = precio * 1.21
    return total
}

console.log('total con IVA de 100:', totalConIva(100), '(debería ser 121)')

// Error 2: modificar un objeto congelado con Object.freeze
const config = Object.freeze({ moneda: 'EUR' })
config.moneda = 'USD'
console.log('moneda:', config.moneda, '(debería ser USD)')

// Error 3: this en una función suelta. Este no lanza ningún error: el modo
// estricto cambia el valor de this, y con eso basta para corregirlo.
function quienSoy() {
    return this
}

const yo = quienSoy() === undefined ? 'undefined' : 'el objeto global'
console.log('this en una función suelta:', yo, '(debería ser undefined)')

// function suma(a, a) {
//     return a + a
// }
