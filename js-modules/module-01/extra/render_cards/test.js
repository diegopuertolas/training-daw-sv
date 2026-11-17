// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

try {
    const teclado = crearTarjeta(productos[0])
    comprobar(teclado instanceof HTMLElement && teclado.tagName === 'ARTICLE',
        'crearTarjeta() debería devolver un <article>')
    comprobar(!teclado.isConnected, 'crearTarjeta() no debe insertar la tarjeta en la página')
    comprobar(teclado.classList.contains('tarjeta'), 'falta la clase tarjeta')
    comprobar(teclado.dataset.id === '1', 'falta el data-id')
    comprobar(teclado.querySelector('.nombre')?.textContent === 'Teclado mecánico', 'el nombre no coincide')
    comprobar(teclado.querySelector('.precio')?.textContent === '59.90 €', 'el precio debería ser «59.90 €»')
    comprobar(teclado.querySelector('button.anadir')?.textContent === 'Añadir', 'falta el botón «Añadir»')
    comprobar(!teclado.classList.contains('agotado') && !teclado.classList.contains('oferta'),
        'el teclado no está agotado ni en oferta')

    const raton = crearTarjeta(productos[1])
    comprobar(raton.classList.contains('agotado'), 'un producto sin stock debería tener la clase agotado')
    comprobar(raton.querySelector('button').disabled, 'el botón de un producto agotado debería estar deshabilitado')
    comprobar(raton.querySelector('button').textContent === 'Agotado', 'el botón debería decir «Agotado»')
    comprobar(crearTarjeta(productos[2]).classList.contains('oferta'), 'falta la clase oferta')

    const sorpresa = crearTarjeta(productos[3])
    comprobar(sorpresa.querySelector('img') === null, '¡El nombre se ha interpretado como HTML! Usa textContent')
    comprobar(sorpresa.querySelector('.nombre').textContent === productos[3].nombre,
        'el nombre con etiquetas debería verse como texto literal')

    pintarCatalogo(productos)
    const catalogo = document.querySelector('#catalogo')
    comprobar(catalogo.children.length === 4, 'pintarCatalogo(productos) debería dejar cuatro tarjetas')
    pintarCatalogo(productos.slice(0, 2))
    comprobar(catalogo.children.length === 2, 'pintarCatalogo debe sustituir el contenido, no añadirlo')
    pintarCatalogo(productos)

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
