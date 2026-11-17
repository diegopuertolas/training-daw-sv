// Unidad: Tipos dinámicos y coerción

// 1. Declara dos constantes numéricas e imprime por consola su suma, resta, multiplicación y división.
const x = 10;
const y = 5;

console.log('\nPrimer caso:');
console.log(`Suma: ${x + y}`);
console.log(`Resta: ${x - y}`);
console.log(`Multiplicación: ${x * y}`);
console.log(`División: ${x / y}`);

// 2. Repite las cuatro operaciones con a = '10' (texto) y b = 5 (número).
// ¿Qué operación da un resultado distinto? Explica por qué en un comentario.
const a = '10';
const b = 5;

console.log('\nSegundo caso:');
console.log(`Suma: ${a + b}`); 
console.log(`Resta: ${a - b}`); 
console.log(`Multiplicación: ${a * b}`); 
console.log(`División: ${a / b}`); 
// En este segundo caso, al definir a como un string, a la hora de imprimirlo por pantalla el motor de JavaScript 
// entiende que lo estas concatenando, ya que para concatenar usamos también esa sintaxis. Para el restos de casos
// sí que entiede que son operaciones matemáticas ya que son simbolos numericos. Esto se llama coerción.

// 3. Convierte el texto a número de forma explícita con Number() y comprueba
// que las cuatro operaciones vuelven a ser correctas.
const aNumber = Number(a);

console.log('\nTercer caso:');
console.log(`Suma: ${aNumber + b}`); 
console.log(`Resta: ${aNumber - b}`); 
console.log(`Multiplicación: ${aNumber * b}`); 
console.log(`División: ${aNumber / b}`); 