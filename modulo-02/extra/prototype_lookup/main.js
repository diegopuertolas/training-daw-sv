// Unidad: Clases y el valor de this
// Ejecuta: node main.js
//
// No escribas código: PREDICE. Lee el fragmento de abajo y rellena el objeto
// prediccion con el valor que crees que tendrá cada expresión. Después
// ejecuta el fichero: los tests comparan tu predicción con el valor real y
// te dicen en cuáles has fallado. Para cada fallo, explica en un comentario
// qué parte de la cadena de prototipos no habías tenido en cuenta.

const assert = require('node:assert/strict')

class Persona {
    constructor(nombre) {
        this.nombre = nombre
    }

    presentarse() {
        return `Soy ${this.nombre}`
    }
}

class Alumno extends Persona {
    curso = '2DAW'
}

const ana = new Alumno('Ana')
const luis = new Alumno('Luis')

const resultados = {}

resultados.a = Object.hasOwn(ana, 'nombre')
resultados.b = Object.hasOwn(ana, 'presentarse')
resultados.c = Object.hasOwn(ana, 'curso')
resultados.d = Object.getPrototypeOf(ana) === Alumno.prototype
resultados.e = Object.getPrototypeOf(Alumno.prototype) === Persona.prototype
resultados.f = ana.presentarse === luis.presentarse
resultados.g = typeof Alumno

// se añade un método a Persona DESPUÉS de crear los objetos
Persona.prototype.despedirse = function () {
    return `Adiós, soy ${this.nombre}`
}
resultados.h = ana.despedirse()

// ana recibe un método propio con el mismo nombre que uno del prototipo
ana.presentarse = () => 'Prefiero no decirlo'
resultados.i = ana.presentarse()
resultados.j = luis.presentarse()

// se borra el método propio
delete ana.presentarse
resultados.k = ana.presentarse()

// un objeto que no es un Alumno, pero toma prestado el método
const robot = { nombre: 'R2' }
resultados.l = Persona.prototype.presentarse.call(robot)

// ---- Tu predicción: sustituye cada null ----
const prediccion = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
    h: null,
    i: null,
    j: null,
    k: null,
    l: null,
}

// ---- Tests (no los modifiques) ----
const fallos = Object.keys(resultados).filter(clave => !Object.is(prediccion[clave], resultados[clave]))
for (const clave of fallos) {
    console.log(`${clave}: predijiste ${JSON.stringify(prediccion[clave])} y es ${JSON.stringify(resultados[clave])}`)
}
assert.strictEqual(fallos.length, 0, `Has fallado ${fallos.length} de ${Object.keys(resultados).length}`)

console.log('Test OK')
