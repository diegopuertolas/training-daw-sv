// Unidad: Tipos dinámicos y coerción
// Ejecuta: node main.js
//
// Convierte una cantidad de segundos en un texto con el formato "h:m:s".
// Pista: la división entre números no es entera; necesitarás Math.floor() y
// el operador resto (%).

const assert = require('node:assert/strict')

function toHoursMinutesSeconds(value) {
  const horas = value / 60;
  const minutos = horas % 60;
  const segundos = minutos % 60;

  return `${horas}:${minutos}:${segundos}`;
}

assert.strictEqual(toHoursMinutesSeconds(3600), '1:0:0');
assert.strictEqual(toHoursMinutesSeconds(3720), '1:2:0');
assert.strictEqual(toHoursMinutesSeconds(3725), '1:2:5');

console.log('Test OK');