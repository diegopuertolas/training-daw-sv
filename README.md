# Código del curso · Desarrollo Web en Entorno Cliente

Ejercicios y proyectos de apoyo ordenados según el temario del curso. Cada
carpeta de unidad tiene el mismo nombre que su página en el sitio
(`/modulo-NN/<unidad>.html`), y cada unidad enlaza sus ejercicios desde la
sección «Para practicar» con la directiva `::codigo`.

Cada ejercicio trae el enunciado en los comentarios de su código. La columna
«Origen» indica si viene del repositorio anterior (`code/`) o es nuevo.

## Cómo se ejecutan

- **Carpetas con `index.html`**: se abren en el navegador, preferiblemente
  servidas con un servidor local (extensión *Live Server* o similar). Los
  scripts se cargan con `defer`, así que no hace falta `window.onload`.
- **Ficheros `.js` y `.mjs` sin HTML**: se ejecutan con Node, `node main.js`.
  Los que usan `node:assert` hacen de tests: si el ejercicio está bien
  resuelto, el script termina imprimiendo `Test OK`.
- **Proyectos Vue** (`modulo-04`, `modulo-05`): `npm install` y `npm run dev`.
  Los que consumen datos esperan una API en `http://localhost:3000`, que se
  levanta con `npx json-server db.json` desde la carpeta que contiene el
  `db.json`.

## Módulo 00 · JavaScript: el lenguaje

| Unidad | Ejercicio | Origen |
|---|---|---|
| 01 · El navegador como entorno | `01_including_script` · enlazar un script con `defer` | `UD1/01_including_script` |
| | `02_strict` · variable sin declarar y modo estricto | `UD1/02_strict` |
| 02 · Tipos dinámicos y coerción | `01_template_strings` · construir textos con template literals | `UD1/03_template_strings` |
| | `02_calculator` · operaciones y coerción de tipos | `UD1/04_calculator` |
| | `03_seconds_converter` · segundos a `h:m:s` | `UD1/10_seconds_converter` |
| 03 · Funciones como valores | `01_abs` · valor absoluto | `UD1/08_abs` |
| | `02_next_pairs` · pares anterior y siguiente | `UD1/09_next_pairs` |
| | `03_even_numbers` · números pares hasta 98 | `UD1/11_even_numbers` |
| | `04_ping_pong` · múltiplos de 5 y de 10 | `UD1/12_ping_pong` |
| | `05_multiplications` · tablas de multiplicar | `UD1/13_multiplications` |
| | `06_advanced_parameters` · parámetros por defecto y rest | `UD3/16_advanced` |
| | `07_custom_filter` · función que recibe una condición | `UD3/02_custom_filter` |
| | `08_arrow_custom_filter` · lo mismo con funciones flecha | `UD3/03_arrow_custom_filter` |
| 04 · Ámbito y closures | `01_scopes` · sombreado de variables y `var` frente a `let` | `UD3/01_scopes` |
| 05 · Objetos, arrays y referencias | `01_person` · crear un objeto y copiarlo con spread | `UD1/05_person` |
| | `02_destructuring_spread` · desestructuración y spread | `UD3/16_advanced` |
| 06 · Métodos de array | `01_math_array` · suma, máximo, mínimo y media | `UD1/06_math_array` |
| | `02_insert_if_not_exists` · insertar sin duplicar ni modificar | `UD1/07_insert_if_not_exists` |
| | `03_iterators` · `forEach`, `map`, `filter` y `reduce` con pilotos | `UD3/04_iterators` |

### Repaso del módulo 00

Ejercicios adicionales, enlazados desde `/modulo-00/ejercicios.html`. Viven en
`modulo-00/extra/`, agrupados por la unidad que repasan. Los ficheros `.js` con `node:assert`
necesitan Node 20 o posterior (usan `toSorted`).

| Unidad que repasa | Ejercicio |
|---|---|
| 01 · El navegador como entorno | `script_order` · predecir el orden de scripts normales, en línea y con `defer` |
| | `strict_errors` · tres errores silenciosos que destapa `'use strict'` |
| 02 · Tipos dinámicos y coerción | `predict_coercion` · predecir coerciones, `typeof`, igualdades y `\|\|` frente a `??` |
| | `parse_quantity` · convertir el texto de un campo en una cantidad válida |
| | `nullish_defaults` · elegir entre `\|\|` y `??` para cada valor por defecto |
| 03 · Funciones como valores | `arrow_bugs` · cuatro funciones flecha con un fallo cada una |
| | `price_formatters` · callbacks y funciones que devuelven funciones |
| | `no_overloading` · sustituir dos «sobrecargas» por una función con valores por defecto |
| 04 · Ámbito y closures | `counter` · contador con estado privado |
| | `once` · función que sólo se ejecuta una vez |
| | `loop_timeouts` · el bucle de `setTimeout` con `var`, arreglado de dos formas |
| 05 · Objetos, arrays y referencias | `immutable_order` · copias superficiales, por niveles y profundas de un pedido |
| | `destructuring_params` · desestructuración en parámetros, `?.` y rest |
| 06 · Métodos de array | `find_some_every` · `find`, `findIndex`, `some` y `every` |
| | `sort_without_surprises` · `sort` numérico, `localeCompare` y `toSorted` |
| | `shop_report` · cadenas de `filter`, `map`, `reduce` y `toSorted` |
| | `gradebook` · reto: closures, copias y métodos de array juntos |

## Módulo 01 · JavaScript en el navegador: el DOM

| Unidad | Ejercicio | Origen |
|---|---|---|
| 01 · El árbol DOM | `01_dom` · página de blog para practicar selectores | `UD3/05_dom` |
| | `02_count_links` · contar y filtrar enlaces de la página | `UD3/06_modify_dom/exercise02` |
| 02 · Modificar el documento | `01_modify_dom` · cambiar textos, clases y crear elementos | `UD3/06_modify_dom/exercise01` |
| | `02_table` · añadir filas a una tabla desde datos | `UD3/06_modify_dom/table` |
| 03 · Eventos | `01_hide_contents` · botones que ocultan párrafos y contador en vivo | `UD3/07_events` |
| 04 · Propagación y delegación | `01_event_phases` · captura, burbuja, `target` y `currentTarget` | nuevo |
| | `02_task_delegation` · lista de tareas con un único listener | nuevo |
| 05 · Formularios y validación | `01_forms` · `FormData` y validación propia | `UD3/08_forms` |
| 06 · Almacenamiento en el navegador | `01_theme_preference` · preferencias y visitas en `localStorage` | nuevo |
| | `02_persistent_tasks` · lista de tareas que sobrevive a recargas | nuevo |

### Repaso del módulo 01

Ejercicios adicionales, enlazados desde `/modulo-01/ejercicios.html`. Viven en
`modulo-01/extra/`, agrupados por la unidad que repasan. Los que tienen
`index.html` traen un `test.js` que comprueba tu código al cargar la página:
si está bien resuelto, la consola muestra `Test OK`. Los `.js` sin HTML se
ejecutan con Node, como los del módulo 00.

| Unidad que repasa | Ejercicio |
|---|---|
| 01 · El árbol DOM | `menu_selectors` · selectores de atributo, `NodeList` a array, `closest` y hermanos |
| | `product_table` · subir con `closest` y bajar con `querySelector` en una tabla |
| 02 · Modificar el documento | `render_cards` · tarjetas con `createElement`, clases condicionales y `replaceChildren` |
| | `fix_innerhtml` · reescribir sin `innerHTML` una lista de comentarios vulnerable a XSS |
| 03 · Eventos | `keyboard_shortcuts` · atajos con `keydown`, `preventDefault` y `e.target` |
| | `limited_clicks` · `removeEventListener` con una función con nombre y `{ once: true }` |
| 04 · Propagación y delegación | `predict_propagation` · predecir captura, burbuja y `stopPropagation` (con `notas.txt`) |
| | `dropdown_menu` · cerrar un menú al hacer clic fuera, sin `stopPropagation` |
| 05 · Formularios y validación | `validate_registration` · la validación que repetiría el servidor (Node) |
| | `booking_dates` · `setCustomValidity` entre dos campos, `valueAsDate` y `valueAsNumber` |
| 06 · Almacenamiento en el navegador | `safe_storage` · un envoltorio de `localStorage` con JSON y valor por defecto (Node) |
| | `form_draft` · borrador de un formulario que sobrevive a recargas |
| | `shopping_cart` · reto: carrito con delegación, validación y `localStorage` |

## Módulo 02 · JavaScript asíncrono y modular

| Unidad | Ejercicio | Origen |
|---|---|---|
| 01 · Clases y el valor de this | `01_rectangle` · clase con área y solapamiento | `UD3/13_poo_rectangulo` |
| | `02_figures` · herencia, `super` y campos privados | `UD3/14_poo_dibujos` |
| | `03_this` · `this` en un método y en un callback | `UD3/15_this` |
| | `04_lost_this` · función que pierde su `this` | `UD3/tmp/main.js` |
| 02 · El bucle de eventos | `01_predict_order` · predecir el orden de tareas y microtareas | nuevo |
| | `02_blocking_ui` · bloquear el hilo y procesar por trozos | nuevo |
| 03 · Promesas | `01_wait` · crear promesas con `setTimeout` y encadenarlas | nuevo |
| | `02_promise_all` · en serie, `Promise.all` y `Promise.allSettled` | nuevo |
| 04 · async y await | `01_refactor_then` · reescribir una cadena de `then` | nuevo |
| | `02_serial_vs_parallel` · en serie, en paralelo y por grupos | nuevo |
| 05 · Peticiones HTTP con fetch | `01_fetch` · lista de usuarios con estados de carga y error | `UD3/10_fetch` |
| 06 · Módulos ES | `01_split_modules` · dividir una aplicación en módulos | nuevo |
| | `02_module_once` · un módulo compartido se ejecuta una vez | nuevo |

### Repaso del módulo 02

Ejercicios adicionales, enlazados desde `/modulo-02/ejercicios.html`. Viven en
`modulo-02/extra/` y casi todos se ejecutan con Node (`node main.js` o
`node main.mjs`) e imprimen `Test OK` si están bien resueltos. Los de `fetch`
sustituyen `fetch` por uno simulado: no necesitan red, pero sí Node 18 o
posterior.

| Unidad que repasa | Ejercicio |
|---|---|
| 01 · Clases y el valor de this | `bank_account` · campos privados, getter, `static`, herencia y `super` |
| | `fix_this` · cuatro fragmentos que pierden su `this` |
| | `prototype_lookup` · predecir la búsqueda por la cadena de prototipos |
| 02 · El bucle de eventos | `predict_order_advanced` · cinco escenarios de tareas, microtareas y `await` |
| | `chunked_work` · procesar por trozos cediendo el hilo con `setTimeout` |
| 03 · Promesas | `promisify` · convertir una API de callbacks en promesas |
| | `timeout_race` · `Promise.race`, `Promise.any` y `Promise.allSettled` |
| | `fix_chains` · cuatro cadenas de `then` con un fallo cada una |
| 04 · async y await | `retry` · reintentos con espera creciente y `try/catch` |
| | `concurrency_pool` · reto: como mucho N operaciones a la vez |
| 05 · Peticiones HTTP con fetch | `fetch_json_helper` · `response.ok`, una clase `HttpError`, POST y DELETE |
| | `search_abort` · cancelar búsquedas obsoletas con `AbortController` |
| 06 · Módulos ES | `fix_imports` · cinco `import` rotos que hay que arreglar uno a uno |
| | `shared_state` · un módulo que comparte estado y los enlaces vivos de `export let` |
| | `library_app` · reto: aplicación con módulos, clases y `fetch` contra `json-server` |
