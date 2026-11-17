// =============================================================================
// PARTE 2 · Hablar con la federación: promesas (2 puntos)
//
// El "servidor" está en api.js (no lo modifiques). Sus dos funciones devuelven
// PROMESAS y tardan un poco en contestar:
//
//   pedirPartidos()      -> promesa con el array de todos los partidos
//   pedirEquipo(nombre)  -> promesa con la ficha del equipo; se RECHAZA si no existe
//
// Puedes usar .then()/.catch() o async/await, lo que prefieras.
//
// Comprueba sólo esta parte con:  npm run test:federacion
// =============================================================================

const { pedirPartidos, pedirEquipo } = require('./api');

/**
 * 2.1 · Devuelve una promesa que se cumple pasados `ms` milisegundos.
 * Constrúyela tú con new Promise y setTimeout.
 *
 *   esperar(1000).then(() => console.log('ha pasado un segundo'));
 */
const esperar = (ms) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms)
  });
};

/**
 * 2.2 · Pide todos los partidos al servidor y devuelve una promesa que se
 * cumple con SÓLO los partidos de la jornada indicada, en el mismo orden.
 * Si no hay ninguno, con un array vacío.
 *
 *   cargarJornada(2).then((p) => console.log(p));
 *      [ { id: 3, jornada: 2, ... }, { id: 4, jornada: 2, ... } ]
 */
const cargarJornada = (jornada) => {
  return pedirPartidos()
    .then(partidos => {
      return partidos.filter(p => p.jornada === jornada);
    });
};

/**
 * 2.3 · Pide la ficha de un equipo al servidor y devuelve una promesa que se
 * cumple con ella. Si el servidor la rechaza (no existe), la promesa NO debe
 * rechazarse: se cumple con null.
 *
 *   cargarEquipo('Lobos') -> promesa que se cumple con { nombre: 'Lobos', ciudad: 'Calatayud', fundado: 2011 }
 *   cargarEquipo('Osos')  -> promesa que se cumple con null
 */
const cargarEquipo = (nombre) => {
  return pedirEquipo(nombre)
    .then(equipo => equipo)
    .catch(() => null);
};

module.exports = { esperar, cargarJornada, cargarEquipo };
