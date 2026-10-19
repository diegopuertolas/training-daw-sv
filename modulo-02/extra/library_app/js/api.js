// Comunicación con json-server. Exportaciones con nombre.
// Todas son async y devuelven objetos Libro (no objetos planos) cuando
// devuelven libros. Si la respuesta no es ok, lanzan un Error con el código.
//
// - listar(): GET /libros
// - crear(libro): POST /libros con el libro en JSON. Devuelve el Libro creado
//   (con el id que asigna el servidor).
// - actualizar(id, cambios): PATCH /libros/:id con los cambios en JSON
//   (por ejemplo { leido: true }). Devuelve el Libro actualizado.
// - borrar(id): DELETE /libros/:id. No devuelve nada.

import { API } from './config.js'
import Libro from './libro.js'
