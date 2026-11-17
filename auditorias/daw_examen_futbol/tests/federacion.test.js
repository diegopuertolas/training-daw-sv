// Tests de la PARTE 2. NO MODIFIQUES ESTE FICHERO.
// El número entre paréntesis de cada test es lo que vale.

const { esperar, cargarJornada, cargarEquipo } = require('../src/federacion');

describe('Parte 2 · Promesas', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('(0.5) 2.1 esperar devuelve una promesa que se cumple pasado ese tiempo', async () => {
    // Relojes falsos: el test controla el tiempo y no tiene que esperar de verdad.
    jest.useFakeTimers();
    let cumplida = false;
    const promesa = esperar(1000);
    expect(typeof promesa?.then).toBe('function');
    promesa.then(() => {
      cumplida = true;
    });

    await jest.advanceTimersByTimeAsync(999);
    expect(cumplida).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    expect(cumplida).toBe(true);
  });

  test('(0.5) 2.2 cargarJornada devuelve una promesa con los partidos de esa jornada', async () => {
    const promesa = cargarJornada(2);
    expect(typeof promesa?.then).toBe('function');
    expect(await promesa).toEqual([
      { id: 3, jornada: 2, local: 'Leones', visitante: 'Halcones', golesLocal: 1, golesVisitante: 1 },
      { id: 4, jornada: 2, local: 'Tigres', visitante: 'Lobos', golesLocal: 3, golesVisitante: 0 },
    ]);
    expect(await cargarJornada(9)).toEqual([]);
  });

  test('(0.5) 2.3 cargarEquipo devuelve una promesa con la ficha del equipo', async () => {
    const promesa = cargarEquipo('Lobos');
    expect(typeof promesa?.then).toBe('function');
    expect(await promesa).toEqual({ nombre: 'Lobos', ciudad: 'Calatayud', fundado: 2011 });
  });

  test('(0.5) 2.4 cargarEquipo se cumple con null si el equipo no existe', async () => {
    const promesa = cargarEquipo('Osos');
    expect(typeof promesa?.then).toBe('function');
    await expect(promesa).resolves.toBeNull();
  });
});
