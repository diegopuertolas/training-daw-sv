// Parte de la aplicación que añade productos. No la modifiques.
import { anadir } from './carrito.mjs'

export function comprar(nombre, precio) {
    anadir(nombre, precio)
}
