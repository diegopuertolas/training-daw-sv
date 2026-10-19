// Comprobaciones automáticas: no modifiques este fichero.
// Si todo está bien, la consola muestra «Test OK».

function comprobar(condicion, mensaje) {
    if (!condicion) throw new Error(mensaje)
}

try {
    const contenedor = document.querySelector('#comentarios')
    comprobar(contenedor.querySelector('img') === null, 'Hay una <img> en los comentarios: el texto se ha interpretado como HTML')

    const nodo = crearComentario(comentarios[2])
    comprobar(nodo instanceof HTMLElement, 'crearComentario() debería devolver un elemento, no un texto')
    comprobar(nodo.matches('article.comentario'), 'crearComentario() debería devolver un <article class="comentario">')
    comprobar(nodo.querySelector('.autor')?.textContent === 'Mallory', 'el autor no coincide')
    comprobar(nodo.querySelector('.fecha')?.textContent === '2026-10-03', 'la fecha no coincide')
    comprobar(nodo.querySelector('p.texto')?.textContent === comentarios[2].texto,
        'el texto debería aparecer literal, con sus < y >')
    comprobar(nodo.querySelector('img') === null, 'el texto no debe crear elementos')

    comprobar(contenedor.querySelectorAll('article.comentario').length === 3, 'deberían verse los tres comentarios')
    comprobar(contenedor.querySelectorAll('.texto')[1].textContent.includes('<table>'),
        'el comentario de Luis debería mostrar «<table>» como texto')

    console.log('Test OK')
} catch (error) {
    console.error('Test fallido:', error.message)
}
