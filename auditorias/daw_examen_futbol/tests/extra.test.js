// Test del EXTRA. NO PUNTÚA y no se ejecuta con `npm test`.
// Se lanza aparte con:  npm run test:extra

const { clasificacion } = require('../src/partidos');

const nuevosPartidos = () => [
  { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
  { id: 2, jornada: 1, local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 },
  { id: 3, jornada: 2, local: 'Tigres', visitante: 'Leones', golesLocal: 3, golesVisitante: 0 },
  { id: 4, jornada: 2, local: 'Lobos', visitante: 'Halcones', golesLocal: 1, golesVisitante: 4 },
];

describe('Extra · Clasificación', () => {
  test('ordena por puntos y, si empatan, por orden alfabético', () => {
    expect(clasificacion(nuevosPartidos())).toEqual([
      { equipo: 'Halcones', puntos: 4 },
      { equipo: 'Leones', puntos: 3 },
      { equipo: 'Tigres', puntos: 3 },
      { equipo: 'Lobos', puntos: 1 },
    ]);
  });

  test('incluye a los equipos que no han sumado ningún punto', () => {
    const partidos = [
      { id: 1, jornada: 1, local: 'Osos', visitante: 'Lobos', golesLocal: 0, golesVisitante: 1 },
    ];
    expect(clasificacion(partidos)).toEqual([
      { equipo: 'Lobos', puntos: 3 },
      { equipo: 'Osos', puntos: 0 },
    ]);
  });

  test('cada equipo aparece una sola vez y no se modifica la lista', () => {
    const partidos = nuevosPartidos();
    const equipos = clasificacion(partidos).map((fila) => fila.equipo);
    expect(new Set(equipos).size).toBe(equipos.length);
    expect(partidos.map((p) => p.id)).toEqual([1, 2, 3, 4]);
  });

  test('sin partidos, la clasificación está vacía', () => {
    expect(clasificacion([])).toEqual([]);
  });
});
