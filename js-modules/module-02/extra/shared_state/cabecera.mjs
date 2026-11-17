// Parte de la aplicación que muestra el total. No la modifiques.
import { total, contenido } from './carrito.mjs'

export function textoTotal() {
    return `Total: ${total.toFixed(2)} €`
}

export function numeroDeProductos() {
    return contenido().length
}
