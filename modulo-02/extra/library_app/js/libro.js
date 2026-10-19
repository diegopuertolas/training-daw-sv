// Clase Libro. Exportación por defecto.
//
// - constructor({ id, titulo, autor, anio, leido = false }): guarda todo.
// - get descripcion: 'Eloquent JavaScript · Marijn Haverbeke (2018)'.
// - coincide(texto): true si texto (sin distinguir mayúsculas) aparece en el
//   título o en el autor. Con texto vacío, true.
// - static desdeFormulario(datos): recibe Object.fromEntries(new FormData(form))
//   (todo textos) y devuelve un Libro SIN id, con titulo y autor sin espacios
//   sobrantes y anio convertido a número.
// - toJSON(): devuelve { titulo, autor, anio, leido } (sin id). JSON.stringify
//   lo llama solo: así un Libro se puede enviar tal cual en el body.

export default class Libro {
}
