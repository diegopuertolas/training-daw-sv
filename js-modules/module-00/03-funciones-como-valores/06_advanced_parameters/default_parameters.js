// Unidad: Funciones como valores
// Ejecuta: node default_parameters.js
//
// Antes de ejecutarlo, escribe en un comentario qué imprimirá cada llamada.
// Después comprueba tu predicción. ¿Por qué a vale undefined en la llamada sin argumentos?

function defaultParameters(a, b = 3, c = 4) {
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
}

defaultParameters(1, 2, 3);
// a = 1
// b = 2
// c = 3

defaultParameters(1, 2);
// a = 1
// b = 2
// c = 4

defaultParameters(1);
// a = 1
// b = 3
// c = 4

defaultParameters();
// a = undefined --> Al no pasar ningún argumento y no tener ningun parámetro por defecto en a, el valor de a será undefined.
// b = 3
// c = 4

defaultParameters(1, undefined, 5);
// a = 1
// b = 3 --> Ya que al pasar undefined como argumento, el motor de JS comprueba si 
// tenemos algun parámetro por defecto para b, como lo hay, asigna ese valor a b.
// c = 5