// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

function cerca(a, b) {
    return Math.abs(a - b) < 0.001
}

try {
    document.querySelector('#vaciar').click()
    descuentoAplicado = false
    comprobar(Object.keys(carrito).length === 0, '#vaciar debería dejar el carrito vacío')
    comprobar(vacio.hidden === false, 'con el carrito vacío debería verse #vacio')
    comprobar(totalEl.textContent === '0.00 €', 'con el carrito vacío el total debería ser «0.00 €»')

    const tarjetas = catalogo.querySelectorAll('.tarjeta')
    comprobar(tarjetas.length === 4, 'el catálogo debería tener cuatro tarjetas')
    comprobar(tarjetas[1].classList.contains('agotado') && tarjetas[1].querySelector('.anadir').disabled,
        'el ratón (sin stock) debería estar agotado y con el botón deshabilitado')

    // añadir con clics en el catálogo (delegación)
    tarjetas[0].querySelector('.anadir').click()
    tarjetas[0].querySelector('.anadir').click()
    tarjetas[2].querySelector('.anadir').click()
    comprobar(carrito[1] === 2 && carrito[3] === 1, 'tras los clics, el carrito debería ser { 1: 2, 3: 1 }')
    comprobar(cerca(total(), 59.9 * 2 + 35.5), 'total() no cuadra')
    comprobar(totalEl.textContent === '155.30 €', `#total debería decir «155.30 €» y dice «${totalEl.textContent}»`)
    comprobar(vacio.hidden === true, 'con productos, #vacio debería ocultarse')

    // stock máximo
    anadir(1); anadir(1); anadir(1)
    comprobar(carrito[1] === 3, 'no se pueden añadir más teclados que su stock (3)')

    // botones del carrito (delegación sobre la lista, que se repinta entera)
    const liAuriculares = () => listaCarrito.querySelector('li[data-id="3"]')
    comprobar(liAuriculares()?.querySelector('.unidades')?.textContent === '1', 'el carrito debería mostrar 1 auricular')
    liAuriculares().querySelector('.mas').click()
    comprobar(carrito[3] === 2, '«+» debería sumar una unidad')
    liAuriculares().querySelector('.menos').click()
    liAuriculares().querySelector('.menos').click()
    comprobar(!(3 in carrito) && liAuriculares() === null, 'al llegar a 0, el producto debería desaparecer del carrito')

    // persistencia
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    comprobar(guardado && guardado[1] === 3, 'el carrito debería estar guardado en localStorage')

    // descuento
    const campo = document.querySelector('#descuento')
    const form = document.querySelector('#form-descuento')
    campo.value = 'GRATIS'
    form.requestSubmit()
    comprobar(campo.validity.customError && !descuentoAplicado, 'un código incorrecto debería marcar el campo como inválido')
    campo.value = ' daw10 '
    campo.dispatchEvent(new Event('input', { bubbles: true }))
    comprobar(campo.validity.valid, 'al volver a escribir, el error debería desaparecer')
    form.requestSubmit()
    comprobar(descuentoAplicado && cerca(total(), 59.9 * 3 * 0.9), 'el código DAW10 debería aplicar un 10 %')
    comprobar(totalEl.textContent === '161.73 €', `#total debería decir «161.73 €» y dice «${totalEl.textContent}»`)

    document.querySelector('#vaciar').click()
    descuentoAplicado = false
    campo.value = ''
    pintar()

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
