// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

let clicsVistosEnDocument = 0
document.addEventListener('click', () => clicsVistosEnDocument++)

try {
    const abierto = () => menu.classList.contains('abierto')

    boton.click()
    comprobar(abierto(), 'un clic en «Opciones» debería abrir el menú')
    comprobar(boton.getAttribute('aria-expanded') === 'true', 'aria-expanded debería ser "true" con el menú abierto')

    document.querySelector('#modo-oscuro').click()
    comprobar(abierto(), 'un clic en una casilla del menú no debería cerrarlo')

    document.querySelector('#contenido').click()
    comprobar(!abierto(), 'un clic fuera del menú debería cerrarlo')
    comprobar(boton.getAttribute('aria-expanded') === 'false', 'aria-expanded debería ser "false" con el menú cerrado')

    boton.click()
    boton.click()
    comprobar(!abierto(), 'un segundo clic en «Opciones» debería cerrar el menú')

    boton.click()
    document.querySelector('#ir-perfil').click()
    comprobar(!abierto(), 'el enlace «Ver perfil» debería cerrar el menú')

    boton.click()
    document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    comprobar(!abierto(), 'Escape debería cerrar el menú')

    comprobar(clicsVistosEnDocument === 8,
        `document debería haber visto los 8 clics y ha visto ${clicsVistosEnDocument}: ¿has usado stopPropagation?`)

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
