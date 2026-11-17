// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

try {
    const filas = document.querySelectorAll('#inventario tbody tr')
    const icono = document.querySelector('.icono')

    comprobar(filaDe(icono) === filas[1], 'filaDe(icono) debería devolver la fila del ratón')
    comprobar(filaDe(filas[2].querySelector('button')) === filas[2], 'filaDe(botón) debería devolver su fila')
    comprobar(filaDe(filas[0].querySelector('.stock')) === filas[0], 'filaDe(celda) debería devolver su fila')

    const monitor = datosDeFila(filas[2])
    comprobar(monitor.id === 103, 'datosDeFila: id debería ser el número 103')
    comprobar(monitor.nombre === 'Monitor 27"', 'datosDeFila: el nombre no coincide')
    comprobar(monitor.stock === 3, 'datosDeFila: stock debería ser el número 3')

    const sinStock = filasSinStock()
    comprobar(Array.isArray(sinStock), 'filasSinStock() debería devolver un array')
    comprobar(sinStock.length === 2 && sinStock[0] === filas[1] && sinStock[1] === filas[3],
        'filasSinStock() debería devolver las filas del ratón y la alfombrilla')

    comprobar(totalUnidades() === 15, 'totalUnidades() debería dar 15')

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
