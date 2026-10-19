// Unidad: Modificar el documento
// Abre index.html con la consola abierta (F12).
//
// Esta página pinta los comentarios de los lectores con innerHTML. Funciona...
// hasta que un lector escribe HTML en su comentario. Abre la página tal cual:
// verás que el último comentario ejecuta código (y una imagen rota).
//
// 1. Reescribe crearComentario(comentario) para que construya EXACTAMENTE la
//    misma estructura que ahora, pero con createElement y textContent:
//
//      <article class="comentario">
//        <p><span class="autor">…</span><span class="fecha">…</span></p>
//        <p class="texto">…</p>
//      </article>
//
//    y que devuelva el article, sin insertarlo.
// 2. Reescribe pintarComentarios(lista) para que use replaceChildren en lugar
//    de ir sumando texto a innerHTML.
// 3. Comprueba que el comentario malicioso se ve como texto literal, con sus
//    < y >, y que ya no aparece ninguna imagen.
//
// Si todo está bien, la consola muestra «Test OK».
//
// Pregunta: el autor y el texto vienen del usuario, pero la fecha la genera
// el programa. ¿Sería seguro usar innerHTML sólo para la fecha? ¿Merece la
// pena la excepción?

const comentarios = [
    { autor: 'Ana', fecha: '2026-10-01', texto: 'Muy clara la unidad, gracias.' },
    { autor: 'Luis', fecha: '2026-10-02', texto: '¿Habrá más ejercicios de <table>?' },
    { autor: 'Mallory', fecha: '2026-10-03', texto: '<img src="x" onerror="document.body.style.background=\'red\'">' },
]

function crearComentario(comentario) {
    return `
        <article class="comentario">
            <p><span class="autor">${comentario.autor}</span><span class="fecha">${comentario.fecha}</span></p>
            <p class="texto">${comentario.texto}</p>
        </article>`
}

function pintarComentarios(lista) {
    const contenedor = document.querySelector('#comentarios')
    contenedor.innerHTML = ''
    for (const comentario of lista) {
        contenedor.innerHTML += crearComentario(comentario)
    }
}

pintarComentarios(comentarios)
