// Unidad: Transformar colecciones con métodos de array
// Ejecuta: node main.js
//
// Completa cada función usando el método de array indicado:
// - iterateSimple: for...of, imprime el nombre de cada piloto
// - iterateForEach: forEach, imprime "nombre (facción)"
// - mapIds: map, devuelve los ids
// - rebels: filter, devuelve los pilotos rebeldes
// - totalFaction: filter, devuelve cuántos pilotos hay de esa facción
// - avgYears: filter + reduce, devuelve la media de años de esa facción

const assert = require('node:assert/strict')

const pilots = [
  { id: 2, name: 'Wedge Antilles', faction: 'Rebels', years: 10 },
  { id: 8, name: 'Ciena Ree', faction: 'Empire', years: 20 },
  { id: 40, name: 'Iden Versio', faction: 'Empire', years: 30 },
  { id: 66, name: 'Thane Kyrell', faction: 'Rebels', years: 35 },
]

function iterateSimple() {
  for (const pilot of pilots) console.log(pilot.name)
}
function iterateForEach() {
  return pilots.forEach(p => console.log(p.faction))
}
function mapIds() {
  const result = pilots.map(p => p.id)
  return result
}
function rebels() {
  return pilots.filter(p => p.faction === 'Rebels')
}
function totalFaction(faction) {
  return pilots.filter(p => p.faction === faction).length;
}
function avgYears(faction) {
  let filteredPilots = pilots.filter(pilot => pilot.faction === faction).map(pilot => pilot.years)
  let totalYears = filteredPilots.reduce((pv, cv) => pv + cv.years, 0)
  let result = totalYears / filteredPilots.length
  return result
}

iterateSimple()
iterateForEach()

assert.deepStrictEqual(mapIds(), [2, 8, 40, 66])
assert.deepStrictEqual(rebels(), [pilots[0], pilots[3]])
assert.strictEqual(totalFaction('Rebels'), 2)
assert.strictEqual(avgYears('Rebels'), 22.5)
assert.strictEqual(avgYears('Empire'), 25)

console.log('Test OK')
