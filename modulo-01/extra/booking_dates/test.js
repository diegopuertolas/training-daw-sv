// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

function escribir(campo, valor) {
    campo.value = valor
    campo.dispatchEvent(new Event('input', { bubbles: true }))
}

try {
    escribir(entrada, '2026-11-10')
    escribir(salida, '2026-11-08')
    comprobar(salida.validity.customError, 'una salida anterior a la entrada debería ser inválida')
    comprobar(salida.validationMessage === 'La salida debe ser posterior a la entrada', 'el mensaje no coincide')
    comprobar(!formulario.checkValidity(), 'el formulario no debería ser válido')

    escribir(salida, '2026-11-10')
    comprobar(salida.validity.customError, 'la salida el mismo día que la entrada debería ser inválida')

    escribir(salida, '2026-11-13')
    comprobar(salida.validity.valid, 'una salida posterior debería ser válida')

    escribir(entrada, '2026-11-20')
    comprobar(salida.validity.customError, 'al cambiar la ENTRADA también hay que volver a comprobar')
    escribir(entrada, '2026-11-10')
    comprobar(salida.validity.valid, 'al corregir la entrada, la salida debería volver a ser válida')

    personas.value = '2'
    formulario.requestSubmit()
    comprobar(resumen.textContent === '3 noches para 2 personas',
        `#resumen debería decir «3 noches para 2 personas» y dice «${resumen.textContent}»`)

    escribir(salida, '2026-11-11')
    personas.value = '1'
    formulario.requestSubmit()
    comprobar(resumen.textContent === '1 noche para 1 persona', '#resumen debería decir «1 noche para 1 persona»')

    personas.value = '9'
    resumen.textContent = ''
    formulario.requestSubmit()
    comprobar(resumen.textContent === '', 'con 9 personas el navegador no debería disparar submit')
    personas.value = '2'

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
