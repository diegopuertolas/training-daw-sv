// Unidad: Propagación y delegación de eventos
// Abre index.html con la consola abierta (F12).
//
// El menú se abre y se cierra con la clase abierto en #menu. Implementa:
//
// 1. Un clic en #abrir-menu alterna el menú (abierto / cerrado) y actualiza
//    el atributo aria-expanded del botón a 'true' o 'false'.
// 2. Un clic en cualquier sitio FUERA de .desplegable cierra el menú.
// 3. Un clic DENTRO del menú (por ejemplo, en una casilla) NO lo cierra...
//    salvo que sea en el enlace «Ver perfil», que sí lo cierra.
// 4. La tecla Escape cierra el menú.
//
// Restricción: no puedes usar stopPropagation(). La página tiene (o podría
// tener) otros listeners en document, como una analítica que cuenta clics, y
// deben seguir recibiendo todos los clics. Usa un listener en document y
// e.target.closest(...) para saber dónde ha caído el clic.
//
// Pista: el clic en #abrir-menu también sube hasta document. Asegúrate de que
// el listener de document no deshace lo que acaba de hacer el del botón.
//
// test.js simula los clics; si todo está bien, la consola muestra «Test OK».

const boton = document.querySelector('#abrir-menu')
const menu = document.querySelector('#menu')

function abrir() {
    menu.classList.add('abierto')
    boton.setAttribute('aria-expanded', 'true')
}

function cerrar() {
    menu.classList.remove('abierto')
    boton.setAttribute('aria-expanded', 'false')
}
