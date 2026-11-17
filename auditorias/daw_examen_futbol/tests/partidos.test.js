// Tests de la PARTE 1. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.

const {
  ganador,
  anadirPartido,
  anularUltimaJornada,
  deEquipo,
  primeroQue,
  marcadores,
  totalGoles,
  puntosDe,
} = require('../src/partidos');

const nuevosPartidos = () => [
  { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
  { id: 2, jornada: 1, local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 },
  { id: 3, jornada: 2, local: 'Tigres', visitante: 'Leones', golesLocal: 3, golesVisitante: 0 },
  { id: 4, jornada: 2, local: 'Lobos', visitante: 'Halcones', golesLocal: 1, golesVisitante: 4 },
];

describe('Parte 1 · Datos', () => {
  test('(0.5) 1.1 ganador devuelve el equipo que gana, o null si empatan', () => {
    const [p1, p2, p3, p4] = nuevosPartidos();
    expect(ganador(p1)).toBe('Leones');
    expect(ganador(p3)).toBe('Tigres');
    expect(ganador(p4)).toBe('Halcones');
    expect(ganador(p2)).toBeNull();
  });

  test('(0.5) 1.2 anadirPartido añade al final sólo si el partido es válido', () => {
    const partidos = nuevosPartidos();
    const nuevo = { id: 9, jornada: 3, local: 'Leones', visitante: 'Lobos', golesLocal: 1, golesVisitante: 0 };
    expect(anadirPartido(partidos, nuevo)).toBe(true);
    expect(partidos).toHaveLength(5);
    expect(partidos[4]).toBe(nuevo);
    expect(partidos[0].id).toBe(1);

    const contraSiMismo = { id: 10, jornada: 3, local: 'Lobos', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 };
    expect(anadirPartido(partidos, contraSiMismo)).toBe(false);
    expect(partidos).toHaveLength(5);

    const idRepetido = { id: 2, jornada: 3, local: 'Tigres', visitante: 'Halcones', golesLocal: 1, golesVisitante: 1 };
    expect(anadirPartido(partidos, idRepetido)).toBe(false);
    expect(partidos).toHaveLength(5);
    expect(partidos[1].local).toBe('Halcones');
  });

  test('(0.5) 1.3 anularUltimaJornada quita del final los partidos de la última jornada', () => {
    const partidos = nuevosPartidos();
    expect(anularUltimaJornada(partidos)).toBe(2);
    expect(partidos.map((p) => p.id)).toEqual([1, 2]);
    expect(anularUltimaJornada(partidos)).toBe(2);
    expect(partidos).toEqual([]);
    expect(anularUltimaJornada(partidos)).toBe(0);

    // Sólo se quitan los del final: el partido 1 es de la jornada 1, pero no está al final.
    const desordenados = [
      { id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 },
      { id: 2, jornada: 2, local: 'Tigres', visitante: 'Leones', golesLocal: 3, golesVisitante: 0 },
      { id: 3, jornada: 1, local: 'Halcones', visitante: 'Lobos', golesLocal: 0, golesVisitante: 0 },
    ];
    expect(anularUltimaJornada(desordenados)).toBe(1);
    expect(desordenados.map((p) => p.id)).toEqual([1, 2]);
  });

  test('(0.5) 1.4 deEquipo filtra como local o visitante, sin distinguir mayúsculas', () => {
    const partidos = nuevosPartidos();
    expect(deEquipo(partidos, 'Leones').map((p) => p.id)).toEqual([1, 3]);
    expect(deEquipo(partidos, 'tigres').map((p) => p.id)).toEqual([1, 3]);
    expect(deEquipo(partidos, 'HALCONES').map((p) => p.id)).toEqual([2, 4]);
    expect(deEquipo(partidos, 'Osos')).toEqual([]);
    expect(partidos).toHaveLength(4);
  });

  test('(0.5) 1.5 primeroQue devuelve el primer partido que cumple el callback, o null', () => {
    const partidos = nuevosPartidos();
    expect(primeroQue(partidos, (p) => p.golesLocal === 0)).toBe(partidos[1]);
    expect(primeroQue(partidos, (p) => p.jornada === 2)).toBe(partidos[2]);
    expect(primeroQue(partidos, (p) => p.golesVisitante > 3)).toBe(partidos[3]);
    expect(primeroQue(partidos, (p) => p.jornada === 99)).toBeNull();
    expect(primeroQue([], () => true)).toBeNull();

    // El callback recibe cada partido.
    const vistos = [];
    primeroQue(partidos, (p) => {
      vistos.push(p.id);
      return false;
    });
    expect(vistos).toEqual([1, 2, 3, 4]);
  });

  test('(0.5) 1.6 marcadores genera "local g-g visitante" para cada partido', () => {
    expect(marcadores(nuevosPartidos())).toEqual([
      'Leones 2-1 Tigres',
      'Halcones 0-0 Lobos',
      'Tigres 3-0 Leones',
      'Lobos 1-4 Halcones',
    ]);
    expect(marcadores([])).toEqual([]);
  });

  test('(0.5) 1.7 totalGoles suma los goles de los dos equipos; 0 si está vacía', () => {
    expect(totalGoles(nuevosPartidos())).toBe(11);
    expect(totalGoles([{ golesLocal: 2, golesVisitante: 1 }, { golesLocal: 0, golesVisitante: 3 }])).toBe(6);
    expect(totalGoles([])).toBe(0);
  });

  test('(0.5) 1.8 puntosDe da 3 por victoria, 1 por empate y 0 por derrota', () => {
    const partidos = nuevosPartidos();
    expect(puntosDe(partidos, 'Leones')).toBe(3);   // gana y pierde
    expect(puntosDe(partidos, 'Tigres')).toBe(3);   // pierde y gana
    expect(puntosDe(partidos, 'Halcones')).toBe(4); // empata y gana
    expect(puntosDe(partidos, 'Lobos')).toBe(1);    // empata y pierde
    expect(puntosDe(partidos, 'Osos')).toBe(0);
    expect(puntosDe([], 'Leones')).toBe(0);
  });
});
