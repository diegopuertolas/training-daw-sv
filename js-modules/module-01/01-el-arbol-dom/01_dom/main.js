// Unidad: El árbol DOM
// Abre index.html y muestra cada resultado con console.log.
// Usa sólo querySelector, querySelectorAll y las propiedades de navegación
// (parentElement, children, closest...). No modifiques nada todavía: sólo leer.

// 1. El texto del <h1>.
console.log(document.querySelector('h1').textContent)
console.log(document.querySelector('#title').textContent);

// 2. Cuántos <article> hay en la página.
console.log(document.querySelectorAll('article').length)

// 3. El título (<h2>) de la segunda entrada, buscando SÓLO dentro de #segunda-entrada.
console.log(document.querySelector('#segunda-entrada').firstElementChild.textContent)
console.log(document.querySelector('#segunda-entrada').querySelector('h2').textContent)
console.log(document.querySelector('#segunda-entrada > h2').textContent)

// 4. Un array con el texto de todos los .item del menú.
//    Recuerda: una NodeList no tiene map; conviértela con Array.from o [...lista].
document.querySelectorAll('.item').forEach(item => console.log(item.textContent))
console.log([...document.querySelectorAll('.item')])
console.log([...document.querySelectorAll('.item')].map(item => item.textContent))

// 5. A partir del primer botón .like, llega a su <article> con closest()
//    y muestra su atributo data-id con dataset.
console.log(document.querySelector('.like').closest('article').attributes['data-id'])
console.log(document.querySelector('.like').closest('article').dataset.id)

// 6. El número de hijos elemento de <main> y el nombre de etiqueta del primero.
console.log(document.querySelector('main').children.length)
console.log(document.querySelector('main').firstElementChild.tagName)

// 7. ¿Qué devuelve document.querySelector('.no-existe')? ¿Y querySelectorAll?
console.log(document.querySelector('.no-existe')) // null
console.log(document.querySelectorAll('.no-existe')) // NodeList[]