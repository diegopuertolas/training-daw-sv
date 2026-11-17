// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

function pulsar(elemento, key) {
    const evento = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true })
    elemento.dispatchEvent(evento)
    return evento
}

try {
    const notas = document.querySelector('#notas')

    const barra = pulsar(document.body, '/')
    comprobar(document.activeElement === buscar, '«/» debería poner el foco en #buscar')
    comprobar(barra.defaultPrevented, '«/» debería llamar a preventDefault()')
    buscar.blur()

    pulsar(document.body, '?')
    comprobar(ayuda.hidden === false, '«?» debería mostrar la ayuda')
    pulsar(document.body, 'Escape')
    comprobar(ayuda.hidden === true, '«Escape» debería ocultar la ayuda')

    pulsar(document.body, '?')
    cerrarAyuda.click()
    comprobar(ayuda.hidden === true, 'el botón «Cerrar» debería ocultar la ayuda')

    notas.focus()
    const enNotas = pulsar(notas, '/')
    comprobar(document.activeElement === notas, 'escribiendo en el textarea, «/» no debe mover el foco')
    comprobar(!enNotas.defaultPrevented, 'escribiendo en el textarea, «/» no debe cancelarse')
    pulsar(notas, '?')
    comprobar(ayuda.hidden === true, 'escribiendo en el textarea, «?» no debe abrir la ayuda')

    ayuda.hidden = false
    pulsar(buscar, 'Escape')
    comprobar(ayuda.hidden === true, '«Escape» debe cerrar la ayuda también desde un campo de texto')
    notas.blur()

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
