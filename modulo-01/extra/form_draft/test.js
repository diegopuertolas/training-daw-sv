// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».
// Ojo: las comprobaciones borran el borrador que tuvieras guardado.

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

try {
    const campos = formulario.elements
    formulario.reset()
    localStorage.removeItem(CLAVE)

    campos.nombre.value = 'Ana'
    campos.asunto.value = 'error'
    campos.mensaje.value = 'En la unidad 3 hay una errata'
    campos.mensaje.dispatchEvent(new Event('input', { bubbles: true }))

    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    comprobar(guardado !== null, 'escribir en un campo debería guardar el borrador')
    comprobar(guardado.nombre === 'Ana' && guardado.asunto === 'error' && guardado.mensaje === 'En la unidad 3 hay una errata',
        'el borrador no tiene los valores de los campos')
    comprobar(guardado.copia === false, 'con la casilla sin marcar, copia debería ser false')
    comprobar(estado.textContent === 'Borrador guardado', '#estado debería decir «Borrador guardado»')

    campos.copia.click()
    comprobar(JSON.parse(localStorage.getItem(CLAVE)).copia === true, 'al marcar la casilla, copia debería ser true')

    formulario.reset()
    restaurarBorrador()
    comprobar(campos.nombre.value === 'Ana' && campos.asunto.value === 'error' && campos.copia.checked,
        'restaurarBorrador() debería rellenar los campos')

    localStorage.setItem(CLAVE, '{roto')
    formulario.reset()
    restaurarBorrador()
    comprobar(campos.nombre.value === '', 'con un borrador roto no debería rellenar nada')

    campos.nombre.value = 'Ana'
    campos.mensaje.value = 'Hola'
    formulario.requestSubmit()
    comprobar(localStorage.getItem(CLAVE) === null, 'al enviar debería borrarse el borrador')
    comprobar(campos.mensaje.value === '', 'al enviar debería vaciarse el formulario')
    comprobar(estado.textContent === 'Mensaje enviado', '#estado debería decir «Mensaje enviado»')

    estado.textContent = ''
    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
