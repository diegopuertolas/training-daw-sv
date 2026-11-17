// Unidad: Eventos
// Abre index.html con la consola abierta (F12).
//
// Añade atajos de teclado a la página con UN listener de keydown en document:
//
// 1. «/» pone el foco en el campo #buscar (método focus()). Llama a
//    preventDefault() para que la barra no se escriba dentro del campo.
// 2. «?» muestra la ayuda: quita el atributo hidden de #ayuda (propiedad
//    hidden = false).
// 3. «Escape» oculta la ayuda si está visible.
// 4. El botón #cerrar-ayuda también la oculta (aquí, un listener de click).
// 5. Importante: si el usuario está escribiendo en un input o un textarea,
//    «/» y «?» deben escribirse con normalidad, sin activar ningún atajo.
//    Pista: e.target es el elemento que tiene el foco; e.target.closest(...)
//    o e.target.matches(...) te dicen si es un campo de texto.
//    Escape, en cambio, debe cerrar la ayuda siempre.
//
// Pregunta: ¿por qué el listener va en document y no en cada elemento?
//
// test.js simula pulsaciones de teclas; si todo está bien, la consola muestra
// «Test OK». Después pruébalo tú con el teclado.

const buscar = document.querySelector('#buscar')
const ayuda = document.querySelector('#ayuda')
const cerrarAyuda = document.querySelector('#cerrar-ayuda')
