// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

function iguales(a, b) {
    return JSON.stringify(a) === JSON.stringify(b)
}

try {
    const destacado = platoDestacado()
    comprobar(destacado instanceof Element, 'platoDestacado() no devuelve un elemento')
    comprobar(destacado.querySelector('.nombre').textContent === 'Merluza a la plancha',
        'platoDestacado() no devuelve el primer plato destacado')

    comprobar(iguales(nombresVegetarianos(),
        ['Ensalada de la huerta', 'Pimientos asados', 'Risotto de setas', 'Tarta de queso']),
        'nombresVegetarianos() no devuelve los cuatro nombres en orden')

    comprobar(iguales(preciosDeSeccion('entrantes'), [6.5, 8, 7.25]),
        'preciosDeSeccion("entrantes") debería dar [6.5, 8, 7.25], como números')
    comprobar(iguales(preciosDeSeccion('postres'), [4.5]), 'preciosDeSeccion("postres") debería dar [4.5]')
    comprobar(iguales(preciosDeSeccion('bebidas'), []), 'preciosDeSeccion de una sección inexistente debería dar []')

    const precioRisotto = document.querySelectorAll('#principales .precio')[1]
    comprobar(seccionDe(precioRisotto) === 'principales', 'seccionDe() no sube hasta la sección')
    comprobar(seccionDe(document.querySelector('#postres .nombre')) === 'postres', 'seccionDe() falla en postres')

    const croquetas = document.querySelectorAll('#entrantes .plato')[1]
    comprobar(siguientePlato(croquetas)?.querySelector('.nombre').textContent === 'Pimientos asados',
        'siguientePlato() no devuelve el plato siguiente')
    comprobar(siguientePlato(document.querySelector('#postres .plato')) === null,
        'siguientePlato() del último plato debería ser null')

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
