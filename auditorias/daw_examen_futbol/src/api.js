// =============================================================================
// Servidor simulado de la federación. NO MODIFIQUES ESTE FICHERO.
//
// Imita un servidor que tarda un poco en contestar. No hace falta conexión:
// las respuestas salen de las constantes de abajo, pero siempre a través de
// una promesa y con retraso, igual que haría fetch.
// =============================================================================

const PARTIDOS = [
  { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
  { id: 2, jornada: 1, local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 },
  { id: 3, jornada: 2, local: 'Leones', visitante: 'Halcones', golesLocal: 1, golesVisitante: 1 },
  { id: 4, jornada: 2, local: 'Tigres', visitante: 'Lobos', golesLocal: 3, golesVisitante: 0 },
  { id: 5, jornada: 3, local: 'Lobos', visitante: 'Leones', golesLocal: 2, golesVisitante: 1 },
  { id: 6, jornada: 3, local: 'Tigres', visitante: 'Halcones', golesLocal: 2, golesVisitante: 2 },
];

const EQUIPOS = [
  { nombre: 'Leones', ciudad: 'Zaragoza', fundado: 1998 },
  { nombre: 'Tigres', ciudad: 'Huesca', fundado: 2004 },
  { nombre: 'Halcones', ciudad: 'Teruel', fundado: 1987 },
  { nombre: 'Lobos', ciudad: 'Calatayud', fundado: 2011 },
];

// Devuelve una copia para que nadie pueda modificar los datos originales.
const copiar = (objeto) => ({ ...objeto });

/**
 * Pide todos los partidos de la liga. Tarda unos 300 ms.
 * @returns {Promise<Array>} promesa que se cumple con el array de partidos
 */
const pedirPartidos = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve(PARTIDOS.map(copiar)), 300);
  });

/**
 * Pide la ficha de un equipo por su nombre exacto. Tarda unos 200 ms.
 * Si el equipo no existe, la promesa se RECHAZA con un Error.
 * @param {string} nombre
 * @returns {Promise<Object>} promesa que se cumple con el equipo
 */
const pedirEquipo = (nombre) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const equipo = EQUIPOS.find((e) => e.nombre === nombre);
      if (equipo) {
        resolve(copiar(equipo));
      } else {
        reject(new Error(`No existe el equipo ${nombre}`));
      }
    }, 200);
  });

module.exports = { pedirPartidos, pedirEquipo };
