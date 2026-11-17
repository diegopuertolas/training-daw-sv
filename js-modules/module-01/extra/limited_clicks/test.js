// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

try {
    const [eventos, delegacion] = botones

    eventos.click()
    comprobar(votos.eventos === 1, 'el primer voto debería sumarse a eventos')
    comprobar(restantes.textContent === 'Te quedan 2 votos', '#restantes debería decir «Te quedan 2 votos»')

    delegacion.click()
    eventos.click()
    comprobar(votos.eventos === 2 && votos.delegacion === 1, 'los votos deberían ser { eventos: 2, delegacion: 1 }')
    comprobar(restantes.textContent === 'No te quedan votos', '#restantes debería decir «No te quedan votos»')
    comprobar(eventos.disabled && delegacion.disabled, 'los botones deberían quedar deshabilitados')

    // un botón deshabilitado no recibe clics; lo rehabilitamos para ver si el listener sigue ahí
    eventos.disabled = false
    eventos.click()
    eventos.disabled = true
    comprobar(votos.eventos === 2, 'el listener sigue registrado: quítalo con removeEventListener')

    aceptar.click()
    aceptar.click()
    comprobar(document.querySelector('#aviso-cookies').hidden, '«Entendido» debería ocultar el aviso')
    comprobar(document.querySelector('#registro').textContent === 'Aviso aceptado',
        'el listener de «Entendido» debería ejecutarse una sola vez')

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
