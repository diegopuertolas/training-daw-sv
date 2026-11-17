// Reto de repaso del módulo: selección, creación de nodos, eventos,
// delegación, validación y localStorage.
// Abre index.html con la consola abierta (F12).
//
// Los datos son la fuente de verdad: el array productos (fijo) y el objeto
// carrito, que relaciona el id de cada producto con las unidades elegidas:
//     { 1: 2, 3: 1 }   ->  2 teclados y 1 auricular
// Cada cambio modifica carrito, lo guarda y llama a pintar(). Nunca se toca
// el DOM del carrito a mano.
//
// 1. pintarCatalogo(): una tarjeta por producto en #catalogo, con
//    data-id, nombre, precio con dos decimales y un botón .anadir. Los
//    productos con stock 0, con la clase agotado y el botón deshabilitado.
// 2. anadir(id) suma una unidad, sin pasar del stock del producto.
//    quitar(id) resta una; si llega a 0, el producto desaparece del carrito.
// 3. total(): suma de precio × unidades, con el descuento aplicado si lo hay
//    (un 10 % con el código DAW10). Devuelve un número sin redondear.
// 4. pintar(): rehace la lista #carrito con un <li data-id="…"> por producto,
//    con .nombre, .unidades (el número), y botones .mas y .menos; muestra u
//    oculta #vacio (hidden); y escribe el total en #total con dos decimales y
//    « €».
// 5. Delegación: UN listener de click en #catalogo para los botones .anadir y
//    UN listener de click en #carrito para .mas y .menos.
// 6. El formulario #form-descuento: si el código no es DAW10 (sin distinguir
//    mayúsculas ni espacios alrededor), marca el campo con setCustomValidity
//    ('Código no válido') y muéstralo con reportValidity(); si lo es, guarda
//    descuentoAplicado = true y repinta. El error debe desaparecer en cuanto
//    el usuario vuelva a escribir.
// 7. #vaciar deja el carrito vacío.
// 8. El carrito se guarda en localStorage (clave CLAVE) en cada cambio y se
//    lee al cargar la página. Si lo guardado está roto, se empieza vacío.
//    Recuerda que, al pasar por JSON, las claves de un objeto son textos.
//
// test.js comprueba las funciones y simula clics; si todo está bien, la
// consola muestra «Test OK». Ojo: test.js vacía tu carrito al ejecutarse.

const CLAVE = 'carrito:v1'

const productos = [
    { id: 1, nombre: 'Teclado mecánico', precio: 59.9, stock: 3 },
    { id: 2, nombre: 'Ratón inalámbrico', precio: 24, stock: 0 },
    { id: 3, nombre: 'Auriculares', precio: 35.5, stock: 10 },
    { id: 4, nombre: 'Alfombrilla XL', precio: 12.95, stock: 5 },
]

let carrito = {}
let descuentoAplicado = false

const catalogo = document.querySelector('#catalogo')
const listaCarrito = document.querySelector('#carrito')
const vacio = document.querySelector('#vacio')
const totalEl = document.querySelector('#total')
const formDescuento = document.querySelector('#form-descuento')
const campoDescuento = document.querySelector('#descuento')

function buscarProducto(id) {
    return productos.find(p => p.id === id)
}
