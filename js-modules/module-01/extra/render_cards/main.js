// Unidad: Modificar el documento
// Abre index.html con la consola abierta (F12).
//
// El catálogo se pinta a partir del array productos. Escribe:
//
// 1. crearTarjeta(producto): devuelve (sin insertarlo) un elemento así:
//
//      <article class="tarjeta" data-id="1">
//        <h2 class="nombre">Teclado mecánico</h2>
//        <p class="precio">59.90 €</p>
//        <button class="anadir">Añadir</button>
//      </article>
//
//    - El precio, siempre con dos decimales (toFixed).
//    - Si stock es 0: clase agotado en el article, el botón deshabilitado
//      (disabled) y con el texto «Agotado».
//    - Si oferta es true: clase oferta en el article.
//    - Usa createElement y textContent. Nada de innerHTML: uno de los
//      productos tiene un nombre «con sorpresa».
//
// 2. pintarCatalogo(lista): sustituye todo el contenido de #catalogo por las
//    tarjetas de la lista, en una sola operación.
//
// 3. Al final del fichero, pinta sólo los productos con stock (filter) y,
//    después, comprueba en la consola que puedes volver a pintar con todos:
//    pintarCatalogo(productos).
//
// test.js pinta el catálogo por su cuenta para comprobarlo; si todo está bien,
// la consola muestra «Test OK».

const productos = [
    { id: 1, nombre: 'Teclado mecánico', precio: 59.9, stock: 4, oferta: false },
    { id: 2, nombre: 'Ratón inalámbrico', precio: 24, stock: 0, oferta: false },
    { id: 3, nombre: 'Auriculares', precio: 35.5, stock: 10, oferta: true },
    { id: 4, nombre: '<img src="x" onerror="alert(\'¡Hackeado!\')">', precio: 1, stock: 1, oferta: false },
]

function crearTarjeta(producto) {
}

function pintarCatalogo(lista) {
}
