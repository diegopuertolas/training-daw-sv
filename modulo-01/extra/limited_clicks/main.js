// Unidad: Eventos
// Abre index.html con la consola abierta (F12).
//
// 1. Cada botón .votar suma un voto a su tema (data-tema) en el objeto votos y
//    actualiza #restantes con «Te quedan N votos». Hay 3 votos en total, entre
//    todos los botones.
// 2. Al gastar el tercer voto, QUITA los listeners de todos los botones con
//    removeEventListener y deshabilítalos (disabled). No vale dejar el
//    listener puesto y comprobar un contador dentro: el objetivo es practicar
//    removeEventListener, así que la función tiene que tener nombre (o estar
//    en una constante) para poder quitarla.
//    Cuando no queden votos, #restantes debe decir «No te quedan votos».
// 3. El botón #aceptar oculta el aviso (#aviso-cookies, hidden = true) y añade
//    al párrafo #registro el texto «Aviso aceptado». Debe ejecutarse UNA sola
//    vez aunque se pulse más veces: usa la opción { once: true }.
//
// test.js simula los clics; si todo está bien, la consola muestra «Test OK».
//
// Pregunta: ¿por qué esto no quitaría nada?
//     boton.addEventListener('click', () => votar(boton))
//     boton.removeEventListener('click', () => votar(boton))

const votos = { eventos: 0, delegacion: 0 }
let quedan = 3

const botones = document.querySelectorAll('.votar')
const restantes = document.querySelector('#restantes')
const aceptar = document.querySelector('#aceptar')
