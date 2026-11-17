// =============================================================================
// PARTE 3 · La página: manejo del DOM (3,5 puntos)
//
// La estructura de la página está en index.html. Los elementos que vas a usar:
//
//   #form-partido    formulario con los campos #jornada, #local, #goles-local,
//                    #goles-visitante y #visitante
//   #partidos        <tbody> de la tabla donde se pintan los partidos
//   #resumen         <p> con el número de partidos y de goles
//   #anular-jornada  botón que quita los partidos de la última jornada
//
// Esta parte reutiliza dos funciones de la parte 1: totalGoles y
// anularUltimaJornada. Tienen que funcionar para que pasen algunos tests de aquí.
//
// Comprueba sólo esta parte con:  npm run test:interfaz
// =============================================================================

const { totalGoles, anularUltimaJornada } = require('./partidos');

/**
 * 3.1 · Crea (sin añadirla a la página) la fila <tr> de un partido, con
 * cinco celdas: jornada, local, resultado, visitante y un botón "Anular".
 *
 *   <tr data-id="1">
 *     <td>1</td>
 *     <td>Leones</td>
 *     <td>2-1</td>
 *     <td>Tigres</td>
 *     <td><button class="anular">Anular</button></td>
 *   </tr>
 *
 * Usa document.createElement. Devuelve el <tr>.
 */
const crearFila = (partido) => {
  const tr = document.createElement('tr');
  tr.dataset.id = partido.id;

  const jornada = document.createElement('td');
  jornada.textContent = partido.jornada;

  const local = document.createElement('td');
  local.textContent = partido.local;

  const resultado = document.createElement('td');
  resultado.textContent = `${partido.golesLocal}-${partido.golesVisitante}`;

  const visitante = document.createElement('td');
  visitante.textContent = partido.visitante;

  const celdaBoton = document.createElement('td');
  const button = document.createElement('button');
  button.className = 'anular';
  button.textContent = 'Anular';
  celdaBoton.appendChild(button);

  tr.appendChild(jornada);
  tr.appendChild(local);
  tr.appendChild(resultado);
  tr.appendChild(visitante);
  tr.appendChild(celdaBoton);

  return tr;
};

/**
 * 3.2 · Vacía el <tbody> que recibe y añade una fila (crearFila) por cada
 * partido de la lista. Si se llama dos veces, no se duplican las filas.
 */
const pintarPartidos = (partidos, tbody) => {
  tbody.replaceChildren();

  for (const p of partidos) {
    tbody.appendChild(crearFila(p));
  }
};

/**
 * 3.3 · Escribe en el elemento que recibe cuántos partidos y cuántos goles
 * hay, con este formato exacto (siempre en plural):
 *
 *   actualizarResumen(partidos, document.querySelector('#resumen'));
 *      <p id="resumen">3 partidos · 6 goles</p>
 */
const actualizarResumen = (partidos, elemento) => {
  elemento.textContent = `${partidos.length} partidos · ${totalGoles(partidos)} goles`;
};

/**
 * 3.4 · Pone la página en marcha con la lista recibida. Al llamarla:
 *
 *   a) Pinta los partidos en #partidos y el resumen en #resumen.
 *   b) Botón #anular-jornada: quita de la lista los partidos de la última
 *      jornada (anularUltimaJornada) y actualiza la página.
 *   c) Botones "Anular" de cada fila: quitan ESE partido de la lista
 *      (búscalo por su id) y actualizan la página. Pista: delegación de
 *      eventos sobre #partidos, event.target.closest('tr') y dataset.
 *   d) Formulario #form-partido: al enviarlo, sin recargar la página, añade
 *      al final de la lista un partido nuevo con los valores de los campos
 *      (jornada y goles como números; como id, uno mayor que el mayor
 *      existente, o 1 si la lista está vacía) y actualiza la página.
 *
 * Importante: la lista recibida se MODIFICA (push, pop, splice...); no crees
 * una nueva, porque los tests miran ese mismo array.
 */
const iniciar = (partidos) => {
  const tbody = document.getElementById('partidos');
  const resumen = document.getElementById('resumen');

  // a
  const actualizarPagina = () => {
    pintarPartidos(partidos, tbody);
    actualizarResumen(partidos, resumen);
  }

  actualizarPagina();
};

module.exports = { crearFila, pintarPartidos, actualizarResumen, iniciar };
