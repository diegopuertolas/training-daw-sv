// Unidad: El árbol DOM
// Abre index.html con la consola abierta (F12).
//
// Cada fila de la tabla es un producto. Escribe estas funciones combinando
// closest (para subir) y querySelector (para bajar). Al cargar la página,
// test.js las comprueba y, si todo está bien, la consola muestra «Test OK».
//
// 1. filaDe(elemento): recibe cualquier elemento de dentro de una fila (un
//    botón, el icono de dentro de un botón, una celda) y devuelve su <tr>.
//    No uses parentElement encadenado: el botón está a varios niveles y el
//    icono, a uno más.
// 2. datosDeFila(fila): devuelve un objeto { id, nombre, stock } con id y
//    stock como NÚMEROS. id sale del atributo data-id.
// 3. filasSinStock(): devuelve un array con los <tr> del cuerpo de la tabla
//    cuyo stock es 0.
// 4. totalUnidades(): suma el stock de todas las filas, reutilizando
//    datosDeFila.
//
// Pregunta: ¿qué devolvería filaDe si la tabla se rediseñara y el botón
// quedara dentro de dos <div> en lugar de uno? ¿Y la versión con
// parentElement.parentElement.parentElement?

function filaDe(elemento) {
}

function datosDeFila(fila) {
}

function filasSinStock() {
}

function totalUnidades() {
}
