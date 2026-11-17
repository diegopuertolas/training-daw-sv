/**
 * @jest-environment jsdom
 */

// Tests de la PARTE 3. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.
// Se ejecutan en jsdom, un navegador simulado: document existe como en Chrome.

const fs = require('node:fs');
const path = require('node:path');
const { crearFila, pintarPartidos, actualizarResumen, iniciar } = require('../src/interfaz');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const cuerpo = html.match(/<body>([\s\S]*)<\/body>/)[1];

const nuevosPartidos = () => [
  { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
  { id: 2, jornada: 1, local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 },
  { id: 3, jornada: 2, local: 'Tigres', visitante: 'Leones', golesLocal: 3, golesVisitante: 0 },
];

const $ = (selector) => document.querySelector(selector);
const idsPintados = () => [...document.querySelectorAll('#partidos tr')].map((tr) => tr.dataset.id);
const textoCeldas = (tr) => [...tr.querySelectorAll('td')].map((td) => td.textContent.trim());

beforeEach(() => {
  // Página limpia en cada test: se pierden también los listeners anteriores.
  document.body.innerHTML = cuerpo;
});

describe('Parte 3 · DOM', () => {
  test('(0.5) 3.1 crearFila crea el <tr> con data-id, cinco celdas y botón Anular', () => {
    const tr = crearFila(nuevosPartidos()[0]);
    expect(tr?.tagName).toBe('TR');
    expect(tr.dataset.id).toBe('1');
    expect(tr.querySelectorAll('td')).toHaveLength(5);
    expect(textoCeldas(tr).slice(0, 4)).toEqual(['1', 'Leones', '2-1', 'Tigres']);
    const boton = tr.querySelectorAll('td')[4].querySelector('button.anular');
    expect(boton).not.toBeNull();
    expect(boton.textContent.trim()).toBe('Anular');
    // Sólo se crea, no se añade a la página.
    expect($('#partidos').children).toHaveLength(0);
  });

  test('(0.5) 3.2 pintarPartidos pinta una fila por partido y no duplica al repetir', () => {
    const tbody = $('#partidos');
    pintarPartidos(nuevosPartidos(), tbody);
    expect(idsPintados()).toEqual(['1', '2', '3']);
    expect(textoCeldas(tbody.children[2]).slice(0, 4)).toEqual(['2', 'Tigres', '3-0', 'Leones']);
    pintarPartidos(nuevosPartidos().slice(0, 2), tbody);
    expect(idsPintados()).toEqual(['1', '2']);
    pintarPartidos([], tbody);
    expect(tbody.children).toHaveLength(0);
  });

  test('(0.5) 3.3 actualizarResumen escribe "N partidos · M goles"', () => {
    const p = $('#resumen');
    actualizarResumen(nuevosPartidos(), p);
    expect(p.textContent.trim()).toBe('3 partidos · 6 goles');
    actualizarResumen([], p);
    expect(p.textContent.trim()).toBe('0 partidos · 0 goles');
  });

  test('(0.5) 3.4a iniciar pinta los partidos y el resumen al arrancar', () => {
    iniciar(nuevosPartidos());
    expect(idsPintados()).toEqual(['1', '2', '3']);
    expect($('#resumen').textContent.trim()).toBe('3 partidos · 6 goles');
  });

  test('(0.5) 3.4b el botón Anular la última jornada quita sus partidos', () => {
    const partidos = nuevosPartidos();
    iniciar(partidos);
    $('#anular-jornada').click();
    expect(partidos.map((p) => p.id)).toEqual([1, 2]);
    expect(idsPintados()).toEqual(['1', '2']);
    expect($('#resumen').textContent.trim()).toBe('2 partidos · 3 goles');
    // La jornada 1 tiene dos partidos: se van los dos de una vez.
    $('#anular-jornada').click();
    expect(partidos).toEqual([]);
    expect(idsPintados()).toEqual([]);
    expect($('#resumen').textContent.trim()).toBe('0 partidos · 0 goles');
  });

  test('(0.5) 3.4c cada botón Anular quita su partido', () => {
    const partidos = nuevosPartidos();
    iniciar(partidos);
    $('#partidos tr[data-id="2"] button.anular').click();
    expect(partidos.map((p) => p.id)).toEqual([1, 3]);
    expect(idsPintados()).toEqual(['1', '3']);
    expect($('#resumen').textContent.trim()).toBe('2 partidos · 6 goles');
    // Y sigue funcionando después de repintar.
    $('#partidos tr[data-id="1"] button.anular').click();
    expect(partidos.map((p) => p.id)).toEqual([3]);
    expect(idsPintados()).toEqual(['3']);
  });

  test('(0.5) 3.4d el formulario añade un partido al final sin recargar', () => {
    const partidos = nuevosPartidos();
    iniciar(partidos);
    $('#jornada').value = '2';
    $('#local').value = 'Lobos';
    $('#goles-local').value = '1';
    $('#goles-visitante').value = '4';
    $('#visitante').value = 'Halcones';

    const envio = new Event('submit', { bubbles: true, cancelable: true });
    $('#form-partido').dispatchEvent(envio);

    expect(envio.defaultPrevented).toBe(true);
    expect(partidos).toHaveLength(4);
    expect(partidos[3]).toEqual({
      id: 4,
      jornada: 2,
      local: 'Lobos',
      visitante: 'Halcones',
      golesLocal: 1,
      golesVisitante: 4,
    });
    expect(idsPintados()).toEqual(['1', '2', '3', '4']);
    expect($('#resumen').textContent.trim()).toBe('4 partidos · 11 goles');
  });
});
