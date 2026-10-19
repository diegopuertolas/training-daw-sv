// Unidad: Clases y el valor de this
// Ejecuta: node main.js
//
// Cuatro fragmentos en los que this no vale lo que su autor esperaba. Cada
// uno funciona «casi»: arregla cada fallo cambiando lo MÍNIMO, sin cambiar
// lo que hace cada método. Antes de arreglarlo, escribe en un comentario qué
// vale this en la línea que falla y por qué.
//
// Nota: EventTarget existe en Node igual que en el navegador; aquí hace de
// botón. Un listener normal se llama con this igual al EventTarget.

'use strict'
const assert = require('node:assert/strict')

// ---- 1. Un método pasado como listener ----
class Contador {
    valor = 0

    constructor(boton) {
        boton.addEventListener('click', this.incrementar)
    }

    incrementar() {
        this.valor++
    }
}

// ---- 2. Un callback con function dentro de un método ----
class Temporizador {
    ticks = 0

    contar(veces) {
        return new Promise((resolve) => {
            let hechas = 0
            const id = setInterval(function () {
                this.ticks++
                hechas++
                if (hechas === veces) {
                    clearInterval(id)
                    resolve(this.ticks)
                }
            }, 1)
        })
    }
}

// ---- 3. Un método pasado a map ----
class Escala {
    constructor(factor) {
        this.factor = factor
    }

    aplicar(numero) {
        return numero * this.factor
    }

    aplicarATodos(numeros) {
        return numeros.map(this.aplicar)
    }
}

// ---- 4. Una flecha como método de un objeto literal ----
const tienda = {
    nombre: 'La Esquina',
    saludo: () => `Bienvenido a ${this.nombre}`,
}

// ---- Tests (no los modifiques) ----
async function main() {
    const boton = new EventTarget()
    const contador = new Contador(boton)
    boton.dispatchEvent(new Event('click'))
    boton.dispatchEvent(new Event('click'))
    assert.strictEqual(contador.valor, 2, '1. el contador debería ir por 2')

    const temporizador = new Temporizador()
    assert.strictEqual(await temporizador.contar(3), 3, '2. contar(3) debería resolver con 3')
    assert.strictEqual(temporizador.ticks, 3)

    assert.deepStrictEqual(new Escala(10).aplicarATodos([1, 2, 3]), [10, 20, 30], '3. aplicarATodos falla')

    assert.strictEqual(tienda.saludo(), 'Bienvenido a La Esquina', '4. el saludo falla')

    console.log('Test OK')
}

main().catch((error) => {
    console.error(error.message)
    process.exitCode = 1
})
