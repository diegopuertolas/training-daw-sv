// Reto de repaso del módulo: clases, async/await, fetch, Promise y módulos.
//
// Cómo arrancarlo:
//   1. En esta carpeta: npx json-server db.json   (API en http://localhost:3000)
//   2. Sirve la carpeta con un servidor local (Live Server, o npx vite) y abre
//      index.html. Con doble clic NO funciona: los módulos necesitan servidor.
//
// La aplicación está dividida en cinco módulos:
//   config.js  la URL de la API (ya hecho)
//   libro.js   la clase Libro                         -> instrucciones dentro
//   api.js     las peticiones a json-server           -> instrucciones dentro
//   ui.js      todo lo que toca el DOM                -> instrucciones dentro
//   main.js    este fichero: el estado y los eventos
//
// En main.js:
// 1. Al arrancar, muestra «Cargando…» (tipo 'cargando'), carga los libros
//    con listar() y píntalos. Si falla (por ejemplo, porque json-server no
//    está arrancado), muestra «No se pudo conectar con el servidor» (tipo
//    'error'). Usa await a nivel superior: esto es un módulo.
// 2. El formulario #nuevo crea un libro con Libro.desdeFormulario y crear(),
//    lo añade a la lista, vacía el formulario y repinta. Mientras se guarda,
//    deshabilita el botón, y vuelve a habilitarlo pase lo que pase (finally).
// 3. UN listener delegado en #libros:
//    - casilla .leido: actualizar(id, { leido }) y sustituye el libro en el
//      array por el que devuelve el servidor;
//    - botón .borrar: borrar(id) y quítalo del array.
//    Si una operación falla, muestra el error y repinta para deshacer lo que
//    el usuario veía (por ejemplo, la casilla marcada).
// 4. #filtro filtra la lista mientras se escribe, sin pedir nada al servidor
//    (usa libro.coincide). El resumen cuenta sólo los libros visibles.
// 5. Añade un botón «Marcar todos como leídos» que actualice EN PARALELO
//    todos los libros sin leer con Promise.all. ¿Qué pasa con la lista si uno
//    de los PATCH falla? ¿Lo harías con allSettled?
//
// Ojo: json-server 1.x guarda los id como textos ("1"), y dataset.id también
// es un texto. Compara siempre texto con texto.
