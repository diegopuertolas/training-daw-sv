# Examen · Liga de barrio

Vas a programar la lógica de una pequeña aplicación de fútbol: los datos de
los partidos de una liga, la conversación con el servidor de la federación y
la página que muestra los resultados. Cada parte tiene sus tests, así que
**sabrás tu nota de tests antes de entregar**.

- **Duración:** 1 hora.
- **Sin conexión a internet.** Puedes usar los apuntes que tengas en papel o
  en tu equipo si el profesor lo permite.
- **Material:** este proyecto. Sólo se tocan los tres ficheros de `src/` que
  tienen `// TODO`.

---

## 0 · Antes de empezar (con internet)

Instala las dependencias **mientras todavía tienes conexión**:

```
npm install
npm test
```

Tiene que aparecer la tabla de puntuación con todo a 0. Si es así, el
proyecto está listo y ya puedes trabajar sin internet. Si `npm install`
falla, avisa al profesor **antes** de que se corte la conexión.

---

## 1 · Qué hay en el proyecto

```
src/
  partidos.js    PARTE 1 · la escribes tú (y el extra, al final)
  federacion.js  PARTE 2 · la escribes tú
  interfaz.js    PARTE 3 · la escribes tú
  api.js         servidor simulado        (no se toca)
index.html       estructura de la página  (no se toca)
NOTAS.md         chuleta de JavaScript para consultar
tests/           tests y cálculo de nota  (no se tocan)
```

Cada función de `src/` ya tiene escrito su nombre y sus parámetros, un
comentario que explica qué debe hacer con ejemplos, y un `// TODO` donde va
tu código. **No cambies los nombres de las funciones ni los `module.exports`
del final**: los tests los usan.

Cada partido es un objeto como este:

```js
{ id: 1, jornada: 1, local: 'Leones', visitante: 'Tigres', golesLocal: 2, golesVisitante: 1 }
```

---

## 2 · Cómo comprobar tu trabajo

| Orden | Qué ejecuta |
|---|---|
| `npm test` | todos los tests y la nota total |
| `npm run test:partidos` | sólo la parte 1 |
| `npm run test:federacion` | sólo la parte 2 |
| `npm run test:interfaz` | sólo la parte 3 |
| `npm run test:extra` | sólo el extra (no puntúa; ver el final) |

Al final de la salida verás algo así:

```
  PUNTUACIÓN (tests)
  ────────────────────────────────────
  Parte 1 · Datos           2,5 / 4
  Parte 2 · Promesas          1 / 2
  Parte 3 · DOM             1,5 / 3,5
  ────────────────────────────────────
  Total tests                 5 / 9,5
  Revisión del profesor       ? / 0,5
```

Cuando un test falla, Jest te dice qué esperaba (`Expected`) y qué ha
recibido (`Received`). Léelo: suele decir exactamente qué falta.

> Si una parte sale con «el fichero no carga», tienes un error de sintaxis
> (un paréntesis o una llave sin cerrar…). Mientras no lo arregles, esa
> parte vale 0.

---

## 3 · Enunciado

Las partes son **independientes en lo posible**: si te atascas en una
función, pasa a la siguiente. La única dependencia es que la parte 3 usa
`totalGoles` y `anularUltimaJornada` de la parte 1. Hazlas antes de
empezar la parte 3.

Orden recomendado: parte 1 → parte 2 → parte 3. El tiempo es orientativo.

### Parte 1 · Datos — `src/partidos.js` (4 puntos, ~20 min)

Funciones sobre un array de partidos. **Todas se escriben como funciones
flecha**, cada una con el método que se indica.

| # | Función | Qué hace | Con |
|---|---|---|---|
| 1.1 | `ganador(partido)` | nombre del equipo que gana; `null` si empatan | `if` o ternario |
| 1.2 | `anadirPartido(partidos, partido)` | añade al final **sólo si es válido** (local ≠ visitante y el id no existe ya); devuelve `true` o `false` | `push`, `some` |
| 1.3 | `anularUltimaJornada(partidos)` | quita del final todos los partidos seguidos de la jornada del último; devuelve cuántos ha quitado | `pop` en un `while` |
| 1.4 | `deEquipo(partidos, equipo)` | partidos en los que juega, como local o visitante, sin distinguir mayúsculas | `filter` |
| 1.5 | `primeroQue(partidos, condicion)` | **recibe un callback** y devuelve el primer partido que lo cumple; `null` si ninguno | `for...of`, **sin** `find` |
| 1.6 | `marcadores(partidos)` | `['Leones 2-1 Tigres', ...]` | `map` |
| 1.7 | `totalGoles(partidos)` | suma de los goles de los dos equipos (0 si está vacía) | `reduce` |
| 1.8 | `puntosDe(partidos, equipo)` | 3 por victoria, 1 por empate, 0 por derrota | `for...of` o `forEach` |

### Parte 2 · Promesas — `src/federacion.js` (2 puntos, ~15 min)

`src/api.js` imita el servidor de la federación, que tarda en contestar. Sus
funciones **devuelven promesas**:

- `pedirPartidos()` se cumple con el array de todos los partidos.
- `pedirEquipo(nombre)` se cumple con la ficha del equipo
  (`{ nombre, ciudad, fundado }`), o **se rechaza** con un `Error` si ese
  equipo no existe.

| # | Función | Qué hace |
|---|---|---|
| 2.1 | `esperar(ms)` | devuelve una promesa que se cumple pasados `ms` milisegundos: constrúyela con `new Promise` y `setTimeout` |
| 2.2 | `cargarJornada(jornada)` | promesa con **sólo los partidos de esa jornada** (array vacío si no hay) |
| 2.3 | `cargarEquipo(nombre)` | promesa con la ficha del equipo pedido… |
| 2.4 | | …y si el servidor la rechaza, se cumple con `null` en vez de fallar |

Puedes usar `.then()`/`.catch()` o `async`/`await`.

### Parte 3 · DOM — `src/interfaz.js` (3,5 puntos, ~25 min)

Abre `index.html` para ver los elementos de la página y sus `id`. Los tests
cargan ese mismo HTML en un navegador simulado (jsdom), así que `document`
funciona igual que en Chrome.

| # | Función | Qué hace |
|---|---|---|
| 3.1 | `crearFila(partido)` | crea y devuelve `<tr data-id="1">` con cinco `<td>`: jornada, local, resultado (`2-1`), visitante y un `<button class="anular">Anular</button>` |
| 3.2 | `pintarPartidos(partidos, tbody)` | vacía el `<tbody>` y añade una fila por partido |
| 3.3 | `actualizarResumen(partidos, elemento)` | escribe `3 partidos · 6 goles` en el elemento |
| 3.4 | `iniciar(partidos)` | pone la página en marcha (ver abajo) |

`iniciar(partidos)` tiene cuatro piezas, y **cada una puntúa por separado**:

- **a)** Al llamarla, pinta los partidos en `#partidos` y el resumen en
  `#resumen`.
- **b)** El botón `#anular-jornada` quita los partidos de la última jornada
  (`anularUltimaJornada`) y actualiza la página.
- **c)** Cada botón «Anular» quita **su** partido (búscalo por el id del
  `<tr>`) y actualiza la página.
- **d)** Al enviar `#form-partido`, **sin recargar la página**, se añade al
  final un partido con los valores del formulario. La jornada y los goles se
  guardan como números, y el id es uno más que el mayor existente (1 si la
  lista está vacía). Después se actualiza la página.

`iniciar` **modifica el array que recibe** (`push`, `pop`, `splice`…): no
crees uno nuevo, porque los tests miran ese mismo array.

---

## 4 · Puntuación

| Parte | Puntos |
|---|---|
| Parte 1 · Datos (8 tests × 0,5) | 4 |
| Parte 2 · Promesas (4 tests × 0,5) | 2 |
| Parte 3 · DOM (7 tests × 0,5) | 3,5 |
| Revisión del profesor | 0,5 |
| **Total** | **10** |

Cada test vale lo que indica su título entre paréntesis y se aprueba entero
o no se aprueba.

La **revisión del profesor** comprueba lo que un test no puede ver:

- las funciones de la parte 1 son funciones flecha y usan el método pedido
  (`filter`, `map`, `reduce`…), no un `for` que haga lo mismo, y `primeroQue`
  no usa `find`;
- no hay `var`: se usa `const`, y `let` sólo cuando hace falta;
- el código está ordenado y sin restos (`console.log` de pruebas, código
  comentado).

> **Importante:** el profesor corrige con **sus propios tests originales**.
> Modificar los ficheros de `tests/` no cambia tu nota: sólo te engaña a ti.

---

## 5 · Notas de referencia

Como no tienes internet, en [`NOTAS.md`](NOTAS.md) tienes una chuleta con lo
que vas a necesitar: funciones flecha, métodos de array y sus parámetros,
temporizadores, cómo se crea y se consume una promesa, el DOM, las tablas y
los eventos. Los ejemplos no son la solución de ningún ejercicio.

---

## 6 · Entrega

1. Ejecuta `npm test` una última vez y apunta tu nota de tests.
2. Entrega **sólo la carpeta `src/`** (comprimida como
   `apellido-nombre.zip`), o lo que te indique el profesor. **No incluyas
   `node_modules/`.**

---

## Extra · La clasificación (no puntúa)

Sólo si has terminado todo lo anterior y te sobra tiempo. **No suma ni resta
nota**: es para que compruebes hasta dónde llegas.

Ya sabes calcular los puntos de un equipo con `puntosDe`. ¿Sabrías hacer que
`clasificacion(partidos)`, al final de `src/partidos.js`, devolviera la tabla
completa de la liga, **ordenada**, con este formato?

```js
clasificacion(partidos) ->
  [
    { equipo: 'Halcones', puntos: 4 },
    { equipo: 'Leones', puntos: 3 },
    { equipo: 'Tigres', puntos: 3 },
    { equipo: 'Lobos', puntos: 1 },
  ]
```

Reglas:

- Aparecen **todos** los equipos que han jugado algún partido, una sola vez,
  aunque tengan 0 puntos.
- De más a menos puntos. Si dos equipos empatan a puntos, van por **orden
  alfabético**.
- Sin partidos, la clasificación es un array vacío. La lista de partidos no
  se modifica.

Pistas: primero saca la lista de equipos sin repetir (`includes`), después
conviértela en objetos `{ equipo, puntos }` (`map` y `puntosDe`), y por último
ordénala (`sort`; mira el apartado 2 de `NOTAS.md`).

Compruébalo con `npm run test:extra`. Este test no aparece en `npm test` ni
en la tabla de puntuación.
