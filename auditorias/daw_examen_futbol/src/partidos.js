// =============================================================================
// PARTE 1 · Datos de la liga (4 puntos)
//
// Cada partido es un objeto como este:
//
//   { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 }
//
// Normas de esta parte:
//   - Todas las funciones se escriben como FUNCIONES FLECHA.
//   - Usa el método de array que se indica en cada una.
//   - No cambies los nombres ni los parámetros: los tests los usan.
//
// Comprueba sólo esta parte con:  npm run test:partidos
// =============================================================================

/**
 * 1.1 · Devuelve el nombre del equipo que ha ganado el partido, o null si
 * han empatado.
 *
 *   ganador({ local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1, ... }) -> 'Leones'
 *   ganador({ local: 'Lobos', visitante: 'Halcones', golesLocal: 1, golesVisitante: 4, ... }) -> 'Halcones'
 *   ganador({ local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0, ... }) -> null
 */
const ganador = (partido) => {
  if (partido.golesLocal > partido.golesVisitante) return partido.local;
  else if (partido.golesLocal < partido.golesVisitante) return partido.visitante;
  else return null;
};

/**
 * 1.2 · Añade un partido AL FINAL de la lista (modifica la lista) con push,
 * pero SÓLO si es válido. Devuelve true si lo ha añadido y false si no.
 *
 * Un partido NO es válido, y no se añade, si:
 *   - el equipo local y el visitante son el mismo, o
 *   - ya hay en la lista un partido con el mismo id.
 *
 *   anadirPartido([p1, p2], p3)                                -> true   (queda [p1, p2, p3])
 *   anadirPartido([p1, p2], { id: 9, local: 'Lobos', visitante: 'Lobos', ... }) -> false
 *   anadirPartido([p1, p2], { id: 1, ... })                    -> false  (el id 1 ya existe)
 */
const anadirPartido = (partidos, partido) => {
  if (partido.local === partido.visitante) return false;
  if (partidos.find(p => p.id === partido.id)) return false;
  partidos.push(partido);
  return true;
};

/**
 * 1.3 · Anula la ÚLTIMA JORNADA: quita del final de la lista (modifica la
 * lista), con pop, todos los partidos SEGUIDOS que sean de la misma jornada
 * que el último. Devuelve cuántos partidos ha quitado (0 si está vacía).
 *
 *   anularUltimaJornada([j1, j1, j2, j2]) -> 2   (queda [j1, j1])
 *   anularUltimaJornada([j1, j2, j1])     -> 1   (queda [j1, j2]: sólo se quitan los del final)
 *   anularUltimaJornada([])               -> 0
 */
const anularUltimaJornada = (partidos) => {
  if (partidos.length === 0) return 0;

  const ultimaJornada = partidos[partidos.length - 1].jornada;
  let eliminados = 0;

  while (partidos.length > 0 && partidos[partidos.length - 1].jornada === ultimaJornada) {
    partidos.pop();
    eliminados++;
  }

  return eliminados;
};

/**
 * 1.4 · Devuelve un array NUEVO con los partidos en los que juega un equipo,
 * como local o como visitante, usando filter.
 * No distingue mayúsculas: 'Leones', 'LEONES' y 'leones' valen lo mismo.
 * La lista original no se modifica.
 *
 *   deEquipo(partidos, 'tigres') -> [ ...los partidos de los Tigres ]
 */
const deEquipo = (partidos, equipo) => {
  const equipoFormateado = equipo.trim().toLowerCase();

  return partidos.filter(p =>
    p.local.trim().toLowerCase() === equipoFormateado || p.visitante.trim().toLowerCase() === equipoFormateado);
};

/**
 * 1.5 · Recibe una lista y una función `condicion` (un callback) y devuelve el
 * PRIMER partido para el que condicion(partido) da true. Si ninguno la
 * cumple, devuelve null. Es escribir tu propio find: NO puedes usar find.
 *
 *   primeroQue(partidos, (p) => p.golesLocal === 0)  -> el primer partido en que el local no marca
 *   primeroQue(partidos, (p) => p.jornada === 2)     -> el primer partido de la jornada 2
 *   primeroQue(partidos, (p) => p.jornada === 99)    -> null
 */
const primeroQue = (partidos, condicion) => {
  for (const p of partidos) {
    if (condicion(p)) return p;
  }
  return null;
};

/**
 * 1.6 · Devuelve un array de textos, uno por partido, usando map.
 * Formato: "<local> <golesLocal>-<golesVisitante> <visitante>".
 *
 *   marcadores([{ local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1, ... }])
 *     -> ['Leones 2-1 Tigres']
 */
const marcadores = (partidos) => {
  return partidos.map(p => `${p.local} ${p.golesLocal}-${p.golesVisitante} ${p.visitante}`)
};

/**
 * 1.7 · Devuelve el total de goles marcados en todos los partidos (de los
 * dos equipos), usando reduce. Una lista vacía tiene 0 goles.
 *
 *   totalGoles([{ golesLocal: 2, golesVisitante: 1 }, { golesLocal: 0, golesVisitante: 3 }]) -> 6
 *   totalGoles([]) -> 0
 */
const totalGoles = (partidos) => {
  const arrGolesLocales = partidos.map(p => p.golesLocal);
  const arrGolesVisitantes = partidos.map(p => p.golesVisitante);

  const golesLocales = arrGolesLocales.reduce((acc, n) => acc + n, 0);
  const golesVisitantes = arrGolesVisitantes.reduce((acc, n) => acc + n, 0);

  return golesLocales + golesVisitantes;
};

/**
 * 1.8 · Calcula los puntos de un equipo: 3 por partido ganado, 1 por partido
 * empatado y 0 por partido perdido. Los partidos en los que no juega no
 * cuentan. Recorre la lista con for...of o con forEach. Te puede venir bien
 * usar ganador().
 *
 *   puntosDe(partidos, 'Leones') -> 3
 *   puntosDe(partidos, 'Osos')   -> 0   (no ha jugado)
 */
const puntosDe = (partidos, equipo) => {
  let puntos = 0;

  for (const p of partidos) {
    if (p.local === equipo || p.visitante === equipo) {
      const ganadorPartido = ganador(p);
      
      if (ganadorPartido === equipo) puntos += 3;
      else if (ganadorPartido === null) puntos += 1;
    }
  }

  return puntos;
};

// =============================================================================
// EXTRA (no puntúa) · Sólo si has terminado todo lo demás. Ver el README.
//
// Devuelve la clasificación: un array con TODOS los equipos que aparecen en
// los partidos y sus puntos, ordenado de más a menos puntos. Si dos equipos
// empatan a puntos, van por orden alfabético.
//
//   clasificacion(partidos) ->
//     [
//       { equipo: 'Halcones', puntos: 4 },
//       { equipo: 'Leones', puntos: 3 },
//       { equipo: 'Tigres', puntos: 3 },
//       { equipo: 'Lobos', puntos: 1 },
//     ]
//
// Comprueba el extra con:  npm run test:extra
// =============================================================================
const clasificacion = (partidos) => {
  // TODO (extra)
};

module.exports = {
  ganador,
  anadirPartido,
  anularUltimaJornada,
  deEquipo,
  primeroQue,
  marcadores,
  totalGoles,
  puntosDe,
  clasificacion,
};
