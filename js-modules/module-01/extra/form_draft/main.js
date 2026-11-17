// Unidad: Almacenamiento en el navegador
// Abre index.html con la consola abierta (F12).
//
// Si el usuario recarga la página a mitad de un mensaje largo, lo pierde. Haz
// que el formulario guarde un borrador en localStorage mientras se escribe.
//
// 1. guardarBorrador(): guarda en localStorage, con la clave CLAVE, un objeto
//    con los valores de nombre, asunto y mensaje, y copia (true/false, de
//    checked). Pista: Object.fromEntries(new FormData(formulario)) sirve para
//    los textos, pero ¿qué hace FormData con una casilla sin marcar?
//    Escribe en #estado «Borrador guardado».
// 2. restaurarBorrador(): si hay un borrador guardado y es JSON válido,
//    rellena los campos con él. Si no hay nada o está roto, no hace nada (y
//    no lanza ningún error).
// 3. Un ÚNICO listener de input en el formulario (no uno por campo) que llame
//    a guardarBorrador. El evento input sube por burbuja desde cada campo.
//    ¿Por qué no hace falta escuchar también change en la casilla?
// 4. Al enviar (submit): cancela el envío, borra el borrador de localStorage,
//    vacía el formulario con formulario.reset() y escribe en #estado
//    «Mensaje enviado».
// 5. Llama a restaurarBorrador() al cargar la página.
//
// test.js comprueba las funciones; si todo está bien, la consola muestra
// «Test OK». Después escribe algo, recarga y comprueba que sigue ahí.
//
// Pregunta: ¿qué cambiaría si usaras sessionStorage? ¿Qué te parece más
// adecuado para un borrador?

const CLAVE = 'contacto:borrador:v1'
const formulario = document.querySelector('#contacto')
const estado = document.querySelector('#estado')

function guardarBorrador() {
}

function restaurarBorrador() {
}
