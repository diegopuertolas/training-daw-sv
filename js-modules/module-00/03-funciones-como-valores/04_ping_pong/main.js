// Unidad: Funciones como valores
// Ejecuta: node main.js
//
// pingPong() imprime los números del 1 al 20. Los múltiplos de 10 llevan detrás
// la palabra PONG y el resto de múltiplos de 5, la palabra PING.
// Ampliación: haz que reciba el límite como parámetro con valor por defecto 20.

function pingPong() {
  const PING = 'PING';
  const PONG = 'PONG';
  for (let i = 1; i <= 20; i++) {
    if (i % 5 === 0 && i % 10 !== 0) console.log(`${i} ${PING}`);
    else if (i % 10 === 0) console.log(`${i} ${PONG}`);
    else console.log(i);
  }
}

pingPong()
// salida esperada:
// 1
// 2
// 3
// 4
// 5 PING
// 6
// 7
// 8
// 9
// 10 PONG
// 11
// ...
// 15 PING
// ...
// 20 PONG
