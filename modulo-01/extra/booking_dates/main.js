// Unidad: Formularios y validación en cliente
// Abre index.html con la consola abierta (F12).
//
// El HTML ya exige las dos fechas y entre 1 y 4 personas. Falta una regla que
// el HTML no puede expresar: la salida tiene que ser POSTERIOR a la entrada.
//
// 1. Escribe comprobarFechas(): si las dos fechas tienen valor y la salida no
//    es posterior a la entrada, marca #salida como inválido con
//    setCustomValidity('La salida debe ser posterior a la entrada').
//    En cualquier otro caso, deja el campo válido con setCustomValidity('').
//    Pista: los valores de un input date son textos 'AAAA-MM-DD', y ese
//    formato se puede comparar directamente como texto. ¿Por qué?
// 2. Llama a comprobarFechas cada vez que cambie CUALQUIERA de las dos fechas
//    (evento input). ¿Qué pasaría si sólo escucharas #salida?
// 3. En el submit (que sólo se dispara si todo es válido), cancela el envío y
//    escribe en #resumen: «3 noches para 2 personas». Calcula las noches con
//    los milisegundos de valueAsDate y las personas con valueAsNumber.
//    Para 1 noche o 1 persona, en singular: «1 noche para 1 persona».
//
// test.js rellena el formulario y lo envía; si todo está bien, la consola
// muestra «Test OK». Después, prueba tú las fechas al revés.

const formulario = document.querySelector('#reserva')
const entrada = document.querySelector('#entrada')
const salida = document.querySelector('#salida')
const personas = document.querySelector('#personas')
const resumen = document.querySelector('#resumen')

const MS_POR_DIA = 24 * 60 * 60 * 1000

function comprobarFechas() {
}
