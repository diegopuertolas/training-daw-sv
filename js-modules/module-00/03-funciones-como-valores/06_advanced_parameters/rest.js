// Unidad: Funciones como valores
// Ejecuta: node rest.js
//
// El parámetro rest (...resto) agrupa en un array todos los argumentos que
// sobran. Explica por qué la llamada de abajo devuelve 9.
// Ampliación: escribe media(...notas), que devuelva la media de cualquier
// cantidad de números.

function f(x, y, ...resto) {
  return (x + y) * resto.length;
}

console.log(`¿es 9? ${f(1, 2, 'hola', true, 7) === 9}`);
//                      x  y  ['hola', true, 7]
// Nos devuelve true ya que (1 + 2) * 3 === 9;

function media(...notas) {
  let sum = 0;
  for (nota of notas) {
    sum += nota;
  }
  /*
  notas.forEach(nota => {
    sum += nota;
  });
  */
  return sum / notas.length;
}

console.log(`La media es: ${media(8, 9, 10)}.`);