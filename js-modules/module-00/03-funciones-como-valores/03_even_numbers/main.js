// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// evenNumbers() imprime por consola, en una sola línea y separados por comas, todos los números pares entre 2 y 98.
// Ampliación: añade los parámetros desde y hasta, con valores por defecto 2 y 98.

function evenNumbers(from = 2, to = 98) {
  const numbers = [];
  for (let i = from; i <= to; i++) {
    if (i % 2 === 0) {
      numbers.push(i);
    } 
  }
  console.log(numbers.join(','));
}

evenNumbers();
// salida esperada: 2,4,6,8,10,...,98

evenNumbers(10, 200);

evenNumbers(3, 100);